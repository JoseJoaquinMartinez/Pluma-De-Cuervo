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

jest.mock("../../../../src/utils/verifyToken.ts", () => {
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

const MOCK_COMMENT_ID = 1;
const JWT_SECRET = (process.env.JWT_SECRET as string) || "testsecret";
const ENDPOINT = `/comment/post-reply-to-admin/${MOCK_COMMENT_ID}`;
const MOCK_REPLY_COMMENT = {
  commentBody: "Test reply to admin",
  paragraphId: 294,
  regularUserDataId: 1,
  adminUserDataId: null as unknown as number,
};

describe("POST postReplyToAdmin", () => {
  const validToken = jwt.sign({ userId: 1, role: "user" }, JWT_SECRET, {
    expiresIn: "1h",
  });
  const paragraphId = 1;

  beforeEach(() => {
    jest.spyOn(prisma.comment, "create").mockResolvedValue({
      id: 4,
      createdAt: new Date(),
      commentBody: "Test reply to admin",
      paragraphId: 294,
      regularUserDataId: 1,
      adminUserDataId: null as unknown as number,
      parentCommentId: 1,
    });

    jest.spyOn(prisma.regularUserData, "findFirst").mockResolvedValue({
      id: 1,
      userName: "NombreDeUsuario",
      imagen: null as unknown as string,
      regularUserId: 1,
    });

    jest.spyOn(prisma.comment, "findFirst").mockResolvedValue({
      id: 1,
      createdAt: new Date(),
      commentBody: "Admin's comment",
      paragraphId: paragraphId,
      regularUserDataId: null as unknown as number,
      adminUserDataId: 1,
      parentCommentId: null,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should return status 404 if the regular user ID does not exist", async () => {
    jest.spyOn(prisma.regularUserData, "findFirst").mockResolvedValue(null);
    const response = await request(app)
      .post(ENDPOINT)
      .set("Authorization", `Bearer ${validToken}`)
      .send({ commentBody: "Test comment" });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Usuario no encontrado" });
  });

  it("Should return status 404 if the comment does not exist", async () => {
    jest.spyOn(prisma.comment, "findFirst").mockResolvedValue(null);
    const response = await request(app)
      .post(ENDPOINT)
      .set("Authorization", `Bearer ${validToken}`)
      .send({ commentBody: "Test comment" });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Comentario no encontrado" });
  });

  it("Should create a reply comment if the user exists and the comment exists", async () => {
    const response = await request(app)
      .post(ENDPOINT)
      .set("Authorization", `Bearer ${validToken}`)
      .send({ commentBody: "Test reply to admin" });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      regularUserReply: MOCK_REPLY_COMMENT,
      message: "Respuesta del usuario creada con éxito",
    });
  });

  it("Should return status 401 if the token is not provided", async () => {
    const response = await request(app)
      .post(ENDPOINT)
      .send({ commentBody: "Test comment without token" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Token no recibido o formato incorrecto",
    });
  });

  it("Should return 403 if the token is not valid", async () => {
    const response = await request(app)
      .post(ENDPOINT)
      .set("Authorization", `Bearer invalid-token`)
      .send({ commentBody: "Invalid token comment" });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Fallo al autenticar el token" });
  });
});
