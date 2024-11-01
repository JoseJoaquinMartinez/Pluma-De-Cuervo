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

const ENDPOINT = "/blog/get-single-blog-post/1";
const MOCKTITLE = "New Blog Catchy Title";
const MOCKimagen = "FancyIamge.jpg";
const MOCKBLOGTEXT = "VERY CACHY FANCY CLICK BAIT MEGA POST";
const MOCKBLOGPOST = {
  id: 1,
  title: MOCKTITLE,
  imagenn: MOCKimagen,
  blogText: MOCKBLOGTEXT,
  createdAt: "2024-10-03T17:58:03.172Z",
};

describe("GET getSingleBlogPost", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });
  it("Should return the info of the blogpost", async () => {
    (prismaMock.blog.findFirst as jest.Mock).mockReturnValue(MOCKBLOGPOST);
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      existingBlog: MOCKBLOGPOST,
      message: "Blog post necontrado",
    });

    expect(prismaMock.blog.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
  it("Should return status 400 if the id is not provided", async () => {
    const response = await request(app).get(
      "/blog/get-single-blog-post/invalidID"
    );
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Id del blog no recibido" });
  });
  it("Should return status 500 if an unexpected error happends", async () => {
    prismaMock.blog.findFirst.mockRejectedValue(new Error("Unexpected error"));
    const response = await request(app).get(ENDPOINT);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error inesperado buscando el blog post Unexpected error`,
    });
    expect(prismaMock.blog.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
  it("Should call prisma.$disconnect after processing", async () => {
    const response = await request(app).get(ENDPOINT);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
