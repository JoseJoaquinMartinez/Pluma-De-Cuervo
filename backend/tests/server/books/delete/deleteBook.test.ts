import {
  jest,
  describe,
  it,
  beforeEach,
  afterAll,
  expect,
} from "@jest/globals";
import request from "supertest";
import { prismaMock } from "../../../../singleton";
import app from "../../../../src/app";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

const ENDPOINT = "/book/delete-book/1";
const MOCKDELETEDBOOK = {
  id: 1,
  title: "Patata caliente",
  image: "image.jpg",
  Synopsis: "Quemaba mucho",
};

describe("DELETE deleteBooK", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });
  it("Should return status 200 after succesfully deleting the book", async () => {
    (prismaMock.book.delete as jest.Mock).mockReturnValue(MOCKDELETEDBOOK);
    const response = await request(app).delete(ENDPOINT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Libro eliminado exitosamente" });
    expect(prismaMock.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
  it("Should return status 404 when the book post is not found", async () => {
    const mockError = new PrismaClientKnownRequestError(
      "Record to delete does not exist",
      { code: "P2025", clientVersion: "client" }
    );

    prismaMock.book.delete.mockRejectedValue(mockError);
    const response = await request(app).delete(ENDPOINT);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Libro no encontrado" });
    expect(prismaMock.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
  it("Should return status 500 when an unexpected error happens", async () => {
    prismaMock.book.delete.mockRejectedValue(new Error("Unexpected error"));
    const response = await request(app).delete(ENDPOINT);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperando eliminando el libro Unexpected error`,
    });

    expect(prismaMock.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("Should return status 400 if the bookId is not valid", async () => {
    const response = await request(app).delete("/book/delete-book/invalidID");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Identificador del libro no recibido",
    });
  });
  it("Should call prisma.$disconnect after processing", async () => {
    (prismaMock.book.delete as jest.Mock).mockReturnValue(MOCKDELETEDBOOK);
    const response = await request(app).delete(ENDPOINT);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
