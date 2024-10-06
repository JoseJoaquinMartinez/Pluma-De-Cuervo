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

const ENDPOINT = "/book/delete-chapter/1";
const MOCKDELETEDCHAPTER = {
  id: 1,
  title: "Chapter Try 10",
  image: "null",
  chapterNumber: 10,
  bookId: 3,
};

beforeEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  prismaMock.$disconnect();
});
it("Should return status 200 after succesfully deleting the chapter", async () => {
  (prismaMock.chapter.delete as jest.Mock).mockReturnValue(MOCKDELETEDCHAPTER);
  const response = await request(app).delete(ENDPOINT);
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    message: "Capítulo eliminado correctamente",
  });
  expect(prismaMock.chapter.delete).toHaveBeenCalledWith({ where: { id: 1 } });
});
it("Should return status 404 when the chapter post is not found", async () => {
  const mockError = new PrismaClientKnownRequestError(
    "Record to delete does not exist",
    { code: "P2025", clientVersion: "client" }
  );

  prismaMock.chapter.delete.mockRejectedValue(mockError);
  const response = await request(app).delete(ENDPOINT);

  expect(response.status).toBe(404);
  expect(response.body).toEqual({ message: "Capítulo no encontrado" });
  expect(prismaMock.chapter.delete).toHaveBeenCalledWith({ where: { id: 1 } });
});
it("Should return status 500 when an unexpected error happens", async () => {
  prismaMock.chapter.delete.mockRejectedValue(new Error("Unexpected error"));
  const response = await request(app).delete(ENDPOINT);
  expect(response.status).toBe(500);
  expect(response.body).toEqual({
    error: `Error inesperando eliminando el capítulo Unexpected error`,
  });

  expect(prismaMock.chapter.delete).toHaveBeenCalledWith({ where: { id: 1 } });
});

it("Should return status 400 if the chapterId is not valid", async () => {
  const response = await request(app).delete("/book/delete-chapter/invalidID");
  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    error: "Identificador del capítulo no recibido",
  });
});
it("Should call prisma.$disconnect after processing", async () => {
  (prismaMock.chapter.delete as jest.Mock).mockReturnValue(MOCKDELETEDCHAPTER);
  const response = await request(app).delete(ENDPOINT);
  expect(prismaMock.$disconnect).toHaveBeenCalled();
});
