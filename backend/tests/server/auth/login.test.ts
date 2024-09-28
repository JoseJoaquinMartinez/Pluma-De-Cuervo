import {
  expect,
  jest,
  describe,
  it,
  beforeEach,
  afterAll,
} from "@jest/globals";
import { prismaMock } from "../../../singleton";
import app from "../../../src/app";
import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));
jest.mock("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

const ENDPOINT = "/auth/login";

const MOCKFINDFIRST = prismaMock.regularUser.findFirst as jest.Mock;
const MOCKPASSWORD = "password123";
const MOCKEMAIL = "test@email.com";
const MOCKUSER = { id: 1, email: MOCKEMAIL, password: MOCKPASSWORD };

describe("POST Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await prismaMock.$disconnect();
  });

  it("Shoul return status 200 and authToken if user successfull logs in", async () => {
    const mockToken = "token";

    MOCKFINDFIRST.mockReturnValue(MOCKUSER);

    (bcrypt.compare as jest.Mock).mockReturnValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: MOCKEMAIL, password: MOCKPASSWORD });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: mockToken,
      message: "usuario logeado",
    });

    expect(bcrypt.compare).toHaveBeenCalledWith(
      MOCKPASSWORD,
      MOCKUSER.password
    );

    expect(jwt.sign).toHaveBeenCalledWith({ userId: MOCKUSER.id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    expect(MOCKFINDFIRST).toHaveBeenCalledWith({ where: { email: MOCKEMAIL } });
  });

  it("Should return status 404 if the user is not found", async () => {
    MOCKFINDFIRST.mockReturnValue(null);

    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: MOCKEMAIL, password: MOCKPASSWORD });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Usuario no existe" });

    expect(MOCKFINDFIRST).toHaveBeenCalledWith({ where: { email: MOCKEMAIL } });
  });
  it("Should return status 401 is the password is not valid", async () => {
    MOCKFINDFIRST.mockReturnValue(MOCKUSER);
    (bcrypt.compare as jest.Mock).mockReturnValue(false);

    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: MOCKEMAIL, password: MOCKPASSWORD });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "contraseña no válida" });

    expect(MOCKFINDFIRST).toHaveBeenCalledWith({ where: { email: MOCKEMAIL } });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      MOCKPASSWORD,
      MOCKUSER.password
    );
  });

  it("Should return status 500 if an unexpected error happens", async () => {
    prismaMock.regularUser.findFirst.mockRejectedValue(
      new Error("Error inesperado")
    );

    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: MOCKEMAIL, password: MOCKPASSWORD });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error de inicio de session: Error: Error inesperado`,
    });
  });

  it("Should call prisma.$disconnect after processing", async () => {
    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: MOCKEMAIL, password: MOCKPASSWORD });

    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
