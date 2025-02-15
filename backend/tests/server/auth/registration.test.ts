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

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

const JWT_SECRET = process.env.JWT_SECRET as string;

const ENDPOINT = "/auth/registration";

describe("GET registration of regular user from token", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await prismaMock.$disconnect();
  });

  it("should return a token and status 200 when user is created", async () => {
    const mockEmail = "test@email.com";
    const mockPassword = "pasword123";
    const emailToken = "token from email";
    const newToken = "token";
    const newUser = { id: 1, email: mockEmail };

    (jwt.verify as jest.Mock).mockReturnValue({
      email: mockEmail,
      password: mockPassword,
    });

    (jwt.sign as jest.Mock).mockReturnValue(newToken);

    (prismaMock.regularUser.create as jest.Mock).mockReturnValue(newUser);

    const response = await request(app)
      .get(ENDPOINT)
      .query({ token: emailToken });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: newToken,
      message: "Usuario creado correctamente",
    });

    expect(prismaMock.regularUser.create).toHaveBeenCalledWith({
      data: {
        email: mockEmail,
        password: mockPassword,
        regularUserData: {
          create: {},
        },
      },
    });

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        userId: newUser.id,
        email: newUser.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  });

  it("Should return status 400 if token not provided", async () => {
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Token necesario" });
  });

  it("Should return status 400 if token is expired or invalid", async () => {
    const invalidToken = "invalid Token";

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid Token");
    });

    const response = await request(app)
      .get(ENDPOINT)
      .query({ token: invalidToken });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Token no válido o caducado" });
  });

  it("Sould return status 500 if user creating fails", async () => {
    const validToken = "validToken";
    const mockEmail = "test@test.com";
    const mockPassword = "password123";

    (jwt.verify as jest.Mock).mockReturnValue({
      email: mockEmail,
      password: mockPassword,
    });

    (prismaMock.regularUser.create as jest.Mock).mockReturnValue(null);

    const response = await request(app)
      .get(ENDPOINT)
      .query({ token: validToken });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error creando el usuario" });

    expect(jwt.verify).toHaveBeenCalledWith(validToken, JWT_SECRET);
    expect(prismaMock.regularUser.create).toHaveBeenCalledWith({
      data: {
        email: mockEmail,
        password: mockPassword,
        regularUserData: {
          create: {},
        },
      },
    });
  });
  it("Should call primsa.$disconnec after processing", async () => {
    const validToken = "token";
    const mockEmail = "test@test.com";
    const mockPassword = "password123";
    (jwt.verify as jest.Mock).mockReturnValue({
      emial: mockEmail,
      password: mockPassword,
    });

    await request(app).get(ENDPOINT).query({ token: validToken });

    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
