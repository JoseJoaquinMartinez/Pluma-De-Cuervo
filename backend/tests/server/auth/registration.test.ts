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

import jwt from "jsonwebtoken";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

const JWT_SECRET = process.env.JWT_SECRET;

describe("POST registration of regular user from token", () => {
  it("should return a token and status 200 when user is created", async () => {
    const mockEmail = "test@email.com";
    const mockPassword = "pasword123";
    const emailToken = "token from email";
    const newToken = "token";

    (jwt.verify as jest.Mock).mockReturnValue({
      email: mockEmail,
      password: mockPassword,
    });
    (jwt.sign as jest.Mock).mockReturnValue(newToken);
  });
});
