import { expect, jest, describe, it, beforeEach } from "@jest/globals";
import { prismaMock } from "../../../singleton";
import { transporter } from "../../../src/utils/emailService";
import app from "../../../src/app";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import request from "supertest";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));
jest.mock("bcrypt");
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));
jest.mock("../../../src/utils/emailService");

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

describe("POST /verify-email endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = JWT_SECRET;
    process.env.EMAIL_URL = "http://localhost:3000";
    process.env.MAILER_EMAIL = "test@example.com";
  });

  it("should recieve user's info and create a token with it and include it in the email's URL", async () => {
    const mockEmail = "test@email.com";
    const mockPassword = "password123";
    const hashedPassword = "hashpass123";
    const token = `el email: ${mockEmail} & the password: ${hashedPassword}`;
    const emailVerificationUrl = `http://localhost:3000/auth/registration?token=${token}`;

    prismaMock.regularUser.findFirst.mockResolvedValue(null);
    (jest.mocked(jwt.sign) as jest.Mock).mockReturnValue(token);
    (bcrypt.hash as jest.Mock).mockReturnValue(hashedPassword);
    (transporter.sendMail as jest.Mock).mockReturnValue(true);

    const response = await request(app)
      .post("/auth/verify-email")
      .send({ email: mockEmail, password: mockPassword });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Email enviado" });

    expect(prismaMock.regularUser.findFirst).toHaveBeenCalledWith({
      where: { email: mockEmail },
    });

    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, saltRounds);

    expect(jwt.sign).toHaveBeenCalledWith(
      { email: mockEmail, password: hashedPassword },
      JWT_SECRET,
      { expiresIn: 120 }
    );

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: "test@example.com",
      to: mockEmail,
      subject: "Verificación de email",
      html: expect.stringContaining(emailVerificationUrl),
    });
  });
});
