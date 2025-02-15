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

const JWT_SECRET = (process.env.JWT_SECRET as string) || "testsecret";

describe("POST /comment/post-comment-regular-user/:paragraphId", () => {
  const validToken = jwt.sign({ userId: 1, role: "user" }, JWT_SECRET, {
    expiresIn: "1h",
  });
  const paragraphId = 1;

  beforeEach(() => {
    jest.spyOn(prisma.comment, "create").mockResolvedValue({
      id: 1,
      createdAt: new Date(),
      commentBody: "Test commentary",
      paragraphId: paragraphId,
      regularUserDataId: 1,
      adminUserDataId: null as unknown as number,
      parentCommentId: null as unknown as number,
    });

    jest.spyOn(prisma.regularUserData, "findFirst").mockResolvedValue({
      id: 1,
      regularUserId: 1,
      userName: "testUser",
      imagen: null as unknown as string,
    });

    jest.spyOn(prisma.paragraph, "findFirst").mockResolvedValue({
      id: paragraphId,
      paragraphNumber: 1,
      paragraphText: "Texto del párrafo",
      paragraphType: "text",
      chapterId: 1,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should create a comment if a valid token is provided", async () => {
    const response = await request(app)
      .post(`/comment/post-comment-regular-user/${paragraphId}`)
      .set("Authorization", `Bearer ${validToken}`)
      .send({ commentBody: "Test commentary" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      newComment: {
        id: 1,
        createdAt: expect.any(String),
        commentBody: "Test commentary",
        paragraphId: paragraphId,
        regularUserDataId: 1,
        adminUserDataId: null,
      },
      message: "Comentario creado con éxito",
    });
  });

  it("Should return status 401 if the token is not provided", async () => {
    const response = await request(app)
      .post(`/comment/post-comment-regular-user/${paragraphId}`)
      .send({ commentBody: "Test comment without token" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Token no recibido o formato incorrecto",
    });
  });

  it("Should return 403 if the token is not valid", async () => {
    const response = await request(app)
      .post(`/comment/post-comment-regular-user/${paragraphId}`)
      .set("Authorization", `Bearer invalid-token`)
      .send({ commentBody: "Invalid token comment" });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Fallo al autenticar el token" });
  });

  it("Should return status 404 if the user does not exist", async () => {
    jest.spyOn(prisma.regularUserData, "findFirst").mockResolvedValue(null);

    const response = await request(app)
      .post(`/comment/post-comment-regular-user/${paragraphId}`)
      .set("Authorization", `Bearer ${validToken}`)
      .send({ commentBody: "Test comment without existing user" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Usuario no encontrado" });
  });

  it("Should return status 404 if the paragraph does not exist", async () => {
    jest.spyOn(prisma.paragraph, "findFirst").mockResolvedValue(null);

    const response = await request(app)
      .post(`/comment/post-comment-regular-user/${paragraphId}`)
      .set("Authorization", `Bearer ${validToken}`)
      .send({ commentBody: "Comentario para párrafo inexistente" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Párrafo no encontrado" });
  });
});
