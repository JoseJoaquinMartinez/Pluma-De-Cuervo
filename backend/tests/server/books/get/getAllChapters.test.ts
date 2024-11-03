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
const ENDPOINT = "/book/get-all-chapters/1";
const ALLCHAPTERSRESPONSE = {
  id: 1,
  title: "Tumormante",
  imagen: "",
  chapter: [
    {
      id: 1,
      title: "Chapter Try 12 table docx",
      imagen: "null",
      chapterNumber: 12,
      bookId: 1,
    },
    {
      id: 2,
      title: "Chapter Try 13 table docx",
      imagen: "null",
      chapterNumber: 13,
      bookId: 1,
    },
  ],
};
describe("GET getAllChapters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });
  it("Should return status 200 and all the chapters from the existing book", async () => {
    (prismaMock.book.findFirst as jest.Mock).mockReturnValue(
      ALLCHAPTERSRESPONSE
    );

    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(ALLCHAPTERSRESPONSE);
  });
  it("Should return status 404 if the book is not found", async () => {
    (prismaMock.book.findFirst as jest.Mock).mockReturnValue(null);
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Libro no encontrado" });
  });
  it("Should return status 500 if there is an unexpected error", async () => {
    prismaMock.book.findFirst.mockRejectedValue(new Error("Unexpected Error"));
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperado Unexpected Error`,
    });
  });
  it("Should call prisma.$disconnect after procesisng", async () => {
    const response = await request(app).get(ENDPOINT);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
