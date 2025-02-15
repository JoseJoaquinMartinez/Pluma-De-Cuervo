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

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

const ID = 1;
const ENDPOINT = `/book/put-existing-book/${ID}`;

const DATATOUPDATE = {
  title: "New Title",
  imagen: "newimagen.jpg",
  Synopsis: "New Synopsis",
};
const MOCKTITLE = "New Title";
const MOCKimagen = "newimagen.jpg";
const MOCKSYNOPSIS = "New Synopsis";

const MOCKUPDATEDBOOK = {
  id: ID,
  title: MOCKTITLE,
  imagen: MOCKimagen,
  Synopsis: MOCKSYNOPSIS,
};

describe("PUT putExistingBook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    prismaMock.$disconnect();
  });
  it("Should return status 200 and the updated book", async () => {
    (prismaMock.book.update as jest.Mock).mockReturnValue(MOCKUPDATEDBOOK);

    const response = await request(app).put(ENDPOINT).send(DATATOUPDATE);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      updatedBook: MOCKUPDATEDBOOK,
      message: "Libro actualizado",
    });

    expect(prismaMock.book.update).toHaveBeenCalledWith({
      where: {
        id: ID,
      },
      data: DATATOUPDATE,
    });
  });
  it("Should return status 404 if the book is not found", async () => {
    (prismaMock.book.update as jest.Mock).mockReturnValue(null);

    const response = await request(app).put(ENDPOINT).send(DATATOUPDATE);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Libro no encontrado" });
    expect(prismaMock.book.update).toHaveBeenCalledWith({
      where: {
        id: ID,
      },
      data: DATATOUPDATE,
    });
  });
  it("Should return status 500 when an unexpected error happens", async () => {
    prismaMock.book.update.mockRejectedValue(new Error("Unexpected error"));
    const response = await request(app).put(ENDPOINT).send(DATATOUPDATE);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperado modificando la información del capítulo Unexpected error`,
    });

    expect(prismaMock.book.update).toHaveBeenCalledWith({
      where: {
        id: ID,
      },
      data: DATATOUPDATE,
    });
  });
  it("Shoul call prisma.$disconnect after processing", async () => {
    (prismaMock.book.update as jest.Mock).mockReturnValue(MOCKUPDATEDBOOK);

    const response = await request(app).put(ENDPOINT).send(DATATOUPDATE);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
