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

const ENDPOINT = "/book/upload-chapter";
