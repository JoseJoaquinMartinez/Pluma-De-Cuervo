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
const ENDPOINT = "/book/get-chapter/1/1";
const MOCKCHAPTER = [
  {
    id: 1,
    title: "Chapter Try 12 table docx",
    image: "null",
    chapterNumber: 12,
    bookId: 1,
    paragraph: [
      {
        id: 1,
        paragraphNumber: 0,
        paragraphText:
          "<p>Si no era una pesadilla, al menos María moriría pronto. O eso se decía. Miraba embobada su estado, la «Tumorgénesis severa», y el número de tumores. ¿Era gracioso? No habría sabido decirlo. Estaba atrapada en una pesadilla, una real. Y encima sentía unas ganas de llorar constantes, seguramente gracias a que había visto suficientes imágenes grotescas en las calles para traumatizar a un país entero.</p>",
        paragraphType: "paragraph",
        chapterId: 1,
      },
    ],
  },
];
describe("GET GetChapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });
  it("Should return status 200 and the chapter when params are correct", async () => {
    (prismaMock.chapter.findFirst as jest.Mock).mockReturnValue(MOCKCHAPTER);

    const response = await request(app).get(ENDPOINT);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(MOCKCHAPTER);
  });

  it("Should return status 404 if the chapter is not found", async () => {
    (prismaMock.chapter.findFirst as jest.Mock).mockReturnValue(null);

    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Capítulo no encontrado" });
  });
  it("Should return status 500 if there is an unexpected error", async () => {
    prismaMock.chapter.findFirst.mockRejectedValue(
      new Error("Unexpected Error")
    );

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
