import { jest, describe, it, beforeEach, expect } from "@jest/globals";
import request from "supertest";
import app from "../../src/app";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const JWT_SECRET = process.env.JWT_SECRET || "testJWTSECRET";
import { AuthenticationRequest } from "../../src/utils/verifyToken";
import { verifyToken } from "../../src/utils/verifyToken";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));
dotenv.config();

app.get("/test", verifyToken, (req: AuthenticationRequest, res) => {
  res.status(200).json({ message: "token verificado", user: req.user });
});

const ENDPOINT = "/test";

describe("verifyToken", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = JWT_SECRET;
    jest.clearAllMocks();
  });

  it("Should return status 401 if the token is not sent", async () => {
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Token no recibido o formato incorrecto",
    });
  });

  it("Should return status 401 if the token's format is incorrect", async () => {
    const response = await request(app)
      .get(ENDPOINT)
      .set("Authorization", "Bearer");
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Token no recibido o formato incorrecto",
    });
  });

  it("Should return status 403 if the token is not valid", async () => {
    // Simular que jwt.verify lanza un error para un token inválido
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Token inválido");
    });

    const response = await request(app)
      .get(ENDPOINT)
      .set("Authorization", "Bearer invalid_token");
    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Fallo al autenticar el token" });
  });

  it("Should pass the middleware if the token is valid", async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => ({
      id: 1,
      role: "user",
    }));

    const validToken = jwt.sign({ id: 1, role: "user" }, JWT_SECRET);

    const response = await request(app)
      .get(ENDPOINT)
      .set("Authorization", `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("token verificado");
    expect(response.body.user).toEqual({ id: 1, role: "user" });
  });
});
