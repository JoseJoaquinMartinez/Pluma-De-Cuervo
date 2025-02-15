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

      req.user = { id: 1, role: "admin" };
      next();
    }
  );
  return { verifyToken: verifyTokenMock };
});
const MCOKCOMMENTID = 1;
const JWT_SECRET = process.env.JWT_SECRET || "testsecret";
const ENDPOINT = `/comment/post-comment-response-by-admin/${MCOKCOMMENTID}`;
const MOCKREPLYCOMMENT = {
  commentBody: "Test reply",
  paragraphId: 294,
  regularUserDataId: null as unknown as number,
  adminUserDataId: 1,
};
describe("POST postCommentResponseByAdmin", () => {
  const validToken = jwt.sign({ userId: 1, role: "admin" }, JWT_SECRET, {
    expiresIn: "1h",
  });
  const paragraphId = 1;

  beforeEach(() => {
    jest.spyOn(prisma.comment, "create").mockResolvedValue({
      id: 4,
      createdAt: new Date(),
      commentBody: "Test reply",
      paragraphId: 294,
      regularUserDataId: null as unknown as number,
      adminUserDataId: 1,
      parentCommentId: 1,
    });

    jest.spyOn(prisma.adminUserData, "findFirst").mockResolvedValue({
      id: 1,
      adminUserId: 1,
    });

    jest.spyOn(prisma.comment, "findFirst").mockResolvedValue({
      id: 1,
      createdAt: new Date(),
      commentBody: "Test commentary",
      paragraphId: 1,
      regularUserDataId: 1,
      adminUserDataId: null as unknown as number,
      parentCommentId: null as unknown as number,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should return status 404 if the admin ID does not exist", async () => {
    jest.spyOn(prisma.adminUserData, "findFirst").mockResolvedValue(null);
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

  it("Should create a reply comment if the admin exists and the comment exists", async () => {
    const response = await request(app)
      .post(ENDPOINT)
      .set("Authorization", `Bearer ${validToken}`)
      .send({ commentBody: "Test reply" });

    // Asegurarse de que se devuelva 201, no 200
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      adminReplyComment: {
        id: 4,
        commentBody: "Test reply",
        paragraphId: 294,
        regularUserDataId: null,
        adminUserDataId: 1,
      },
      message: "Respuesta del administrador creada con éxito",
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

  it("Should return status 403 if the token is invalid", async () => {
    const response = await request(app)
      .post(ENDPOINT)
      .set("Authorization", `Bearer invalid-token`)
      .send({ commentBody: "Invalid token comment" });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Fallo al autenticar el token" });
  });
});
