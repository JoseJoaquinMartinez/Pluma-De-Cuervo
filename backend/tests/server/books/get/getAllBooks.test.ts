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

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

const ENDPOINT = "/book/get-all-books";

const MOCKBOOK = [
  { id: 1, title: "Tumormante", image: "image1.jpg" },
  { id: 2, title: "Dreadful", image: "image2.jpg" },
];

describe("GET getAllBooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });

  it("Should return status 200 and all existing books with id, image and title", async () => {
    prismaMock.book.findMany.mockResolvedValue(MOCKBOOK);
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(MOCKBOOK);
  });
  it("Should return status 404 if no books are found", async () => {
    (prismaMock.book.findMany as jest.Mock).mockReturnValue(null);
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "No se han encontrado libros" });
  });

  it("Should return status 500 if an unexpected Error happens", async () => {
    prismaMock.book.findMany.mockRejectedValue(new Error("Unexpected Error"));
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperado Unexpected Error`,
    });
  });
  it("Should call prisma.$disconnect after", async () => {
    const response = await request(app).get(ENDPOINT);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
