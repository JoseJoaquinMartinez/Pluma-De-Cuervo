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

const ENDPOINT = "/blog/delete-blog-post/1";
const MOCKDELETEDBLOG = {
  id: 5,
  title: "Test blog 1",
  imagen: "IMAGE.jpg",
  blogText: "Very fancy and interesting blog post",
  createdAt: "2024-10-05T09:56:18.099Z",
};

describe("DELETE deleteBlogPost", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });
  it("Should return status 200 when the blog is deleted", async () => {
    (prismaMock.blog.delete as jest.Mock).mockReturnValue(MOCKDELETEDBLOG);
    const response = await request(app).delete(ENDPOINT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Entrada de blog eliminada" });

    expect(prismaMock.blog.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
  it("Should return status 404 when the blog post is not found", async () => {
    const mockError = new PrismaClientKnownRequestError(
      "Record to delete does not exist",
      { code: "P2025", clientVersion: "client" }
    );

    prismaMock.blog.delete.mockRejectedValue(mockError);
    const response = await request(app).delete(ENDPOINT);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Entrada de blog no encontrada" });
    expect(prismaMock.blog.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
  it("Should return status 500 when an unexpected error happens", async () => {
    prismaMock.blog.delete.mockRejectedValue(new Error("Unexpected error"));
    const response = await request(app).delete(ENDPOINT);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperando eliminando la entrada de blog Unexpected error`,
    });

    expect(prismaMock.blog.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("Should return status 400 if the blogId is not valid", async () => {
    const response = await request(app).delete(
      "/blog/delete-blog-post/invalidID"
    );
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Id del blog no recibido" });
  });
  it("Should call prisma.$disconnect after processing", async () => {
    (prismaMock.blog.delete as jest.Mock).mockReturnValue(MOCKDELETEDBLOG);
    const response = await request(app).delete(ENDPOINT);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
