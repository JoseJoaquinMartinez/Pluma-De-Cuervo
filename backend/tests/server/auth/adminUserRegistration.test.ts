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
  verify: jest.fn(),
}));

jest.mock("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

const ENDPOINT = "/auth/adminUserGabriel";

describe("POST /adminUserRegistraon", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await prismaMock.$disconnect();
  });

  it("Should create a new admin", async () => {
    const mockPassword = "password123";
    const hashedPassword = "hashedpass123";
    const mockUser = { id: 1 };
    const mockToken = "Token";
    const email = "gps.beniel@gmail.com";

    (bcrypt.hash as jest.Mock).mockReturnValue(hashedPassword);
    prismaMock.adminUser.findFirst.mockResolvedValue(null);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    (prismaMock.adminUser.create as jest.Mock).mockReturnValue(mockUser);

    const response = await request(app)
      .post(ENDPOINT)
      .send({ password: mockPassword });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: mockToken,
      message: "administrador creado",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser.id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    expect(prismaMock.adminUser.findFirst).toHaveBeenCalledWith({
      where: { email: email },
    });
    expect(prismaMock.adminUser.create).toHaveBeenCalledWith({
      data: {
        email: email,
        password: hashedPassword,
        adminUserData: {
          create: {},
        },
      },
    });
  });
});
