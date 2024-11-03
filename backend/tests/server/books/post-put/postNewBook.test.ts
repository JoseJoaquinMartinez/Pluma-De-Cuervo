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
const MOCKTITLE = "Omni Cenizas 2";
const MOCKimagen = "imagen.jpg";
const MOCKSYNOPSIS =
  "Hace más de diez milenios que la civilización quedó arrasada al llegar el omni al planeta. Esta exótica sustancia lo cambió todo para siempre; como una enfermedad, se introdujo en toda forma de vida y la transformó radicalmente.'Omni: Cenizas' nos cuenta el auge de un dios. Cómo un hombre normal, Diego, llega a convertirse en un tirano, esclavizando a todo un mundo que resurge de sus cenizas, y a un elenco de personajes que ansían, por encima de todas las cosas, una libertad que jamás han conocido. La historia se va desenvolviendo entre el pasado y el presente, utilizando la ciencia-ficción para justificar los elementos fantásticos de 'Omni: Cenizas' en una aventura que trata temas como la pérdida, la desesperanza, la locura, la tiranía o la libertad. Esta novela busca romper con los elementos más tradicionales de la fantasía y con la aparente infalibilidad de los protagonistas que encontramos en muchas obras; nadie es perfecto y queda a la vista desde el primer momento, la esperanza es un lujo que no todos pueden permitirse, y la alegría es algo que se perdió hace milenios.";
const MOCKNEWBOOKDATA = {
  title: MOCKTITLE,
  imagen: MOCKimagen,
  Synopsis: MOCKSYNOPSIS,
};
const MOCKNEWBOOK = {
  id: 4,
  title: MOCKTITLE,
  imagen: MOCKimagen,
  Synopsis: MOCKSYNOPSIS,
};
const ENDPOINT = "/book/new-book";

describe("POST postNewBook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });
  it("Should return a new book", async () => {
    (prismaMock.book.create as jest.Mock).mockReturnValue(MOCKNEWBOOK);
    const response = await request(app).post(ENDPOINT).send(MOCKNEWBOOKDATA);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      newBook: MOCKNEWBOOK,
      message: "Libro creado",
    });

    expect(prismaMock.book.create).toHaveBeenCalledWith({
      data: {
        title: MOCKTITLE,
        imagen: MOCKimagen,
        Synopsis: MOCKSYNOPSIS,
      },
    });
  });
  it("Should return status 409 if the user is trying to create a book with a title that already exists", async () => {
    const MOCKEXISTINGTITLE = "Existing title";
    const mockDuplicateTitleBookData = {
      title: MOCKEXISTINGTITLE,
      imagen: MOCKimagen,
      Synopsis: MOCKSYNOPSIS,
    };
    prismaMock.book.create.mockRejectedValue({
      code: "P2002",
    });

    const response = await request(app)
      .post(ENDPOINT)
      .send(mockDuplicateTitleBookData);
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Libro con este titulo ya existe.");

    expect(prismaMock.book.create).toHaveBeenCalledWith({
      data: mockDuplicateTitleBookData,
    });
  });

  it("Should return status 500 when an unexpected error happens", async () => {
    prismaMock.book.create.mockRejectedValue(new Error("Unexpected error"));

    const response = await request(app).post(ENDPOINT).send(MOCKNEWBOOKDATA);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperado creando libro Unexpected error`,
    });
    expect(prismaMock.book.create).toHaveBeenCalledWith({
      data: MOCKNEWBOOKDATA,
    });
  });

  it("Should call prisma.$disconnect after processing", async () => {
    (prismaMock.book.create as jest.Mock).mockReturnValue(MOCKNEWBOOK);
    const response = await request(app).post(ENDPOINT).send(MOCKNEWBOOKDATA);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
