import {
  jest,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
} from "@jest/globals";
import request from "supertest";
import app from "../../../../src/app";
import prisma from "../../../../client";
import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthenticationRequest } from "../../../../src/utils/verifyToken";

const JWT_SECRET = process.env.JWT_SECRET || "testsecret";

jest.mock("../../../../src/utils/verifyToken", () => {
  const verifyTokenMock = jest.fn(
    (req: AuthenticationRequest, res: Response, next: NextFunction) => {
      const authHeader = req.headers["authorization"];

      if (!authHeader) {
        return res
          .status(401)
          .json({ error: "Token no recibido o formato incorrecto" });
      }

      const token = authHeader.split(" ")[1];

      if (token === "invalid-token") {
        return res.status(403).json({ error: "Fallo al autenticar el token" });
      }

      req.user = { id: 1, role: "user" };
      next();
    }
  );
  return { verifyToken: verifyTokenMock };
});

const MOCKPARAGRAPHS = [
  {
    id: 294,
    paragraphNumber: 1,
    paragraphText:
      "<p>María estaba en una sala muy blanca. La luz del sol hacía brillar todavía más las paredes recién pintadas, reflejándose en el acero pulido de la bancada. Estaba en una sala de espera. En un hospital. Y ella, María Serrano Molina, esperaba buenas noticias. Se había preparado para la ocasión con un vestido que lucía detalles florales y cuya falda cortaba por encima de las rodillas. Llevaba el pelo bastante corto, recogido en una coleta, y su negro azabache parecía brillar casi tanto como los mismos bancos. Sus labios, finos, estaban pintados de un color rojo intenso que le parecía que iba bien con sus ojos marrones.</p>",
    paragraphType: "paragraph",
    chapterId: 14,
    comment: [
      {
        id: 1,
        createdAt: "2024-10-08T18:30:39.004Z",
        commentBody: "Este es mi comentario de prueba",
        paragraphId: 294,
        regularUserDataId: 1,
        adminUserDataId: null as unknown as number,
        regularUserData: {
          id: 1,
          userName: "Aventurero",
          imagen: null as unknown as string,
          regularUserId: 1,
        },
        adminUserData: null as unknown as number,
      },
      {
        id: 2,
        createdAt: "2024-10-08T18:31:19.478Z",
        commentBody: "first test comment",
        paragraphId: 294,
        regularUserDataId: 1,
        adminUserDataId: null as unknown as number,
        regularUserData: {
          id: 1,
          userName: "Aventurero",
          imagen: null as unknown as number,
          regularUserId: 1,
        },
        adminUserData: null as unknown as number,
      },
    ],
  },
];

describe("GET getCommentsByAdmin", () => {
  const validToken = jwt.sign({ userId: 1, role: "user" }, JWT_SECRET, {
    expiresIn: "1h",
  });
  const chapterId = 1;

  beforeEach(() => {
    jest.spyOn(prisma.chapter, "findFirst").mockResolvedValue({
      id: 14,
      title: "Chapter Try 10",
      image: "null",
      chapterNumber: 10,
      bookId: 3,
    });

    jest.spyOn(prisma.paragraph, "findMany").mockResolvedValue([
      {
        id: 294,
        paragraphNumber: 1,
        paragraphText:
          "<p>María estaba en una sala muy blanca. La luz del sol hacía brillar todavía más las paredes recién pintadas, reflejándose en el acero pulido de la bancada. Estaba en una sala de espera. En un hospital. Y ella, María Serrano Molina, esperaba buenas noticias. Se había preparado para la ocasión con un vestido que lucía detalles florales y cuya falda cortaba por encima de las rodillas. Llevaba el pelo bastante corto, recogido en una coleta, y su negro azabache parecía brillar casi tanto como los mismos bancos. Sus labios, finos, estaban pintados de un color rojo intenso que le parecía que iba bien con sus ojos marrones.</p>",
        paragraphType: "paragraph",
        chapterId: 14,
        comment: [
          {
            id: 1,
            createdAt: "2024-10-08T18:30:39.004Z",
            commentBody: "Este es mi comentario de prueba",
            paragraphId: 294,
            regularUserDataId: 1,
            adminUserDataId: null as unknown as number,
            regularUserData: {
              id: 1,
              userName: "Aventurero",
              imagen: null as unknown as string,
              regularUserId: 1,
            },
            adminUserData: null as unknown as number,
          },
          {
            id: 2,
            createdAt: "2024-10-08T18:31:19.478Z",
            commentBody: "first test comment",
            paragraphId: 294,
            regularUserDataId: 1,
            adminUserDataId: null as unknown as number,
            regularUserData: {
              id: 1,
              userName: "Aventurero",
              imagen: null as unknown as number,
              regularUserId: 1,
            },
            adminUserData: null as unknown as number,
          },
        ],
      },
    ] as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should return status 200 and the comments when a validToken is provided", async () => {
    const response = await request(app)
      .get(`/comment/get-comments-by-admin/${chapterId}`)
      .set("Authorization", `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ paragraphs: MOCKPARAGRAPHS });
  });
  it("Should return status 404 if the chapter is not found", async () => {
    jest.spyOn(prisma.chapter, "findFirst").mockResolvedValue(null);
    const response = await request(app)
      .get(`/comment/get-comments-by-admin/${chapterId}`)
      .set("Authorization", `Bearer ${validToken}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Capítulo no encontrado" });
  });
  it("Should return status 404 if the paragraphs are not found", async () => {
    jest.spyOn(prisma.paragraph, "findMany").mockResolvedValue([]);

    const response = await request(app)
      .get(`/comment/get-comments-by-admin/${chapterId}`)
      .set("Authorization", `Bearer ${validToken}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Párrafos con comentarios no encontrados",
    });
  });
  it("Should return status 500 if an unexpected error happens", async () => {
    jest
      .spyOn(prisma.chapter, "findFirst")
      .mockRejectedValue(new Error("Unexpected error"));

    const response = await request(app)
      .get(`/comment/get-comments-by-admin/${chapterId}`)
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperado recuperando los comentarios Unexpected error`,
    });
  });

  it("Should return status 401 if the token is not provided", async () => {
    const response = await request(app).get(
      `/comment/get-comments-by-admin/${chapterId}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Token no recibido o formato incorrecto",
    });
  });

  it("Should return 403 if the token is not valid", async () => {
    const response = await request(app)
      .get(`/comment/get-comments-by-admin/${chapterId}`)
      .set("Authorization", `Bearer invalid-token`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Fallo al autenticar el token" });
  });
});
