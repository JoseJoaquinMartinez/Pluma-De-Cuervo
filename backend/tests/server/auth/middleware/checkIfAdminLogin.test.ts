import {
  expect,
  jest,
  describe,
  it,
  beforeEach,
  afterAll,
} from "@jest/globals";
import { prismaMock } from "../../../../singleton";
import app from "../../../../src/app";
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

const ADMIN_EMAIL = "gps.beniel@gmail.com";
const MOCKFINDFIRST = prismaMock.adminUser.findFirst as jest.Mock;
const MOCKPASSWORD = "password123";
const MOCKEMAIL = "test@email.com";

describe("Middleware checkIfAdminLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await prismaMock.$disconnect();
  });

  it("Should continue to the next function if the email is not the admin's", async () => {
    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: MOCKEMAIL, password: MOCKPASSWORD });

    expect(response.status).toBe(404);
    expect(MOCKFINDFIRST).not.toHaveBeenCalled();
  });

  it("Should return status 404 if admind is not found", async () => {
    MOCKFINDFIRST.mockReturnValue(null);

    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: ADMIN_EMAIL, password: MOCKPASSWORD });

    expect(response.status).toBe(404),
      expect(response.body).toEqual({ message: "Administrador no encontrado" });

    expect(MOCKFINDFIRST).toHaveBeenCalledWith({
      where: {
        email: ADMIN_EMAIL,
      },
    });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it("Shooul return 401 if user inputs wrong password", async () => {
    const mockWrongPassword = "wrongPassword";
    const mockHasedPasswprd = "hashedPassword";
    const mockAdmin = {
      id: 1,
      email: ADMIN_EMAIL,
      password: mockHasedPasswprd,
    };

    MOCKFINDFIRST.mockReturnValue(mockAdmin);
    (bcrypt.compare as jest.Mock).mockReturnValue(false);

    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: ADMIN_EMAIL, password: mockWrongPassword });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Contraseña no válida" });

    expect(MOCKFINDFIRST).toHaveBeenCalledWith({
      where: { email: ADMIN_EMAIL },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      mockWrongPassword,
      mockAdmin.password
    );
  });

  it("Should return status 200 and a token if the admin user is properly logged in", async () => {
    const mockHasedPassword = "hashedPassword";
    const mockAdmin = {
      id: 1,
      emial: ADMIN_EMAIL,
      password: mockHasedPassword,
    };
    const mockToken = "mockToken";

    MOCKFINDFIRST.mockReturnValue(mockAdmin);
    (bcrypt.compare as jest.Mock).mockReturnValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: ADMIN_EMAIL, password: MOCKPASSWORD });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: mockToken,
      message: "Admin logeado",
    });

    expect(MOCKFINDFIRST).toHaveBeenCalledWith({
      where: {
        email: ADMIN_EMAIL,
      },
    });

    expect(bcrypt.compare).toHaveBeenCalledWith(
      MOCKPASSWORD,
      mockAdmin.password
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { adminId: mockAdmin.id },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
  });

  it("Should return status 500 if an unexpected error happens", async () => {
    prismaMock.adminUser.findFirst.mockRejectedValue(
      new Error("Unexpected Error")
    );

    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: ADMIN_EMAIL, password: MOCKPASSWORD });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `error al logear Error: Unexpected Error`,
    });
  });

  it("Should call prisma.$disconnect", async () => {
    const response = await request(app)
      .post(ENDPOINT)
      .send({ email: ADMIN_EMAIL, password: MOCKPASSWORD });

    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
