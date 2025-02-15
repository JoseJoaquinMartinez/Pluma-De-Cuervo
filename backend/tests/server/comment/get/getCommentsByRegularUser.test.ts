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

const JWT_SECRET = (process.env.JWT_SECRET as string) || "testsecret";

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
jest.mock("../../../../src/utils/formattedComments", () => ({
  formattedComments: jest.fn((comments) => comments),
}));

const MOCKCOMMENTS = [
  {
    id: 1,
    createdAt: "2024-10-08T18:30:39.004Z",
    commentBody: "Este es mi comentario de prueba",
    hasAdminResponse: false,
    adminResponse: null as unknown as number,
    paragraph: {
      id: 294,
      text: "<p>Texto del párrafo</p>",
      chapter: "Chapter Try 10",
      book: "Libro Ejemplo",
    },
    user: {
      userName: "Aventurero",
      imagen: null as unknown as string,
    },
  },
];

describe("GET get-comment-by-regularUser", () => {
  const validToken = jwt.sign({ userId: 1, role: "user" }, JWT_SECRET, {
    expiresIn: "1h",
  });

  beforeEach(() => {
    jest.spyOn(prisma.regularUserData, "findFirst").mockResolvedValue({
      id: 1,
      userName: "Aventurero",
      imagen: null as unknown as string,
      regularUserId: 1,
    });

    jest
      .spyOn(prisma.comment, "findMany")
      .mockResolvedValue(MOCKCOMMENTS as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should return status 200 and the user's comments when a validToken is provided", async () => {
    const response = await request(app)
      .get(`/comment/get-comment-by-regularUser`)
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(MOCKCOMMENTS);
  });

  it("Should return status 404 if the user is not found", async () => {
    jest.spyOn(prisma.regularUserData, "findFirst").mockResolvedValue(null);

    const response = await request(app)
      .get(`/comment/get-comment-by-regularUser`)
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Usuario no encontrado" });
  });

  it("Should return status 404 if the comments are not found", async () => {
    jest.spyOn(prisma.comment, "findMany").mockResolvedValue([]);

    const response = await request(app)
      .get(`/comment/get-comment-by-regularUser`)
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Comentarios no encontrados" });
  });

  it("Should return status 500 if an unexpected error happens", async () => {
    jest
      .spyOn(prisma.comment, "findMany")
      .mockRejectedValue(new Error("Unexpected error"));

    const response = await request(app)
      .get(`/comment/get-comment-by-regularUser`)
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Error inesperado al obtener los comentarios: Unexpected error",
    });
  });

  it("Should return status 401 if the token is not provided", async () => {
    const response = await request(app).get(
      `/comment/get-comment-by-regularUser`
    );

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Token no recibido o formato incorrecto",
    });
  });

  it("Should return 403 if the token is not valid", async () => {
    const response = await request(app)
      .get(`/comment/get-comment-by-regularUser`)
      .set("Authorization", `Bearer invalid-token`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Fallo al autenticar el token" });
  });
});
