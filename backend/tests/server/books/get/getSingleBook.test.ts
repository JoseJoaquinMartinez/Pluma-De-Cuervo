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

const ENDPOINT = "/book/get-single-book/1";

const MOCKBOOK = {
  id: 1,
  title: "Tumormante",
  imagen: "",
  Synopsis:
    "María, que lleva una década luchando contra su enfermedad, aún está digiriendo las noticias del doctor cuando, de repente, un mensaje aparece ante sus ojos:\r\n\r\n[Clase obtenida: «Tumormante», nivel 1.]\r\n\r\nEn cuestión de segundos, su vida cambia para siempre, pues este extraño Sistema ha activado habilidades en todos los seres vivos, desde humanos hasta insectos.\r\n\r\nEn Tumormante: Semana 1, seguimos a María mientras intenta llegar a Málaga para reunirse con su familia durante la primera semana tras la activación del Sistema. En su camino, enfrentará amenazas inimaginables: avispas gigantes, no-muertos, palomas láser... y la insaciable sed de poder de la humanidad.\r\n\r\nCon la ayuda de un elenco diverso de personajes, como Croqueta o Pepe, el ‘Parásito’, María deberá aprender a dominar su nueva y siniestra habilidad: manipular los tumores que la consumen por dentro.\r\n\r\n¿Podrá sobrevivir a su poder antes de que la destruya?",
};
describe("GET SingleBook ", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });
  it("Should return the book with the id that comes from the params", async () => {
    (prismaMock.book.findUnique as jest.Mock).mockReturnValue(MOCKBOOK);
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(MOCKBOOK);
  });
  it("Should return status 404 if the book does not exist", async () => {
    (prismaMock.book.findUnique as jest.Mock).mockReturnValue(null);

    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Libro no encontrado" });
  });
  it("Should return status 500 if an unexpected errors happens", async () => {
    prismaMock.book.findUnique.mockRejectedValue(new Error("Unexpected error"));
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperado Unexpected error`,
    });
  });
  it("Should call prisma.$disconnect after processing", async () => {
    const response = await request(app).get(ENDPOINT);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
