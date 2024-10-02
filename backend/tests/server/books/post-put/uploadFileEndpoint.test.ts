import { expect, jest, describe, it, beforeEach } from "@jest/globals";
import { prismaMock } from "../../../../singleton";
import app from "../../../../src/app";
import request from "supertest";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

const ENDPOINT = "/book/upload-chapter";
