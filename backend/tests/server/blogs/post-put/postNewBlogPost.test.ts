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

const MOCKTITLE = "New Blog Catchy Title";
const MOCKimage = "FancyIamge.jpg";
const MOCKBLOGTEXT = "VERY CACHY FANCY CLICK BAIT MEGA POST";
const MOCKDATATOSEND = {
  title: MOCKTITLE,
  imagen: MOCKimage,
  blogText: MOCKBLOGTEXT,
};
const MOCKDATATOBECALLEDWITH = {
  title: MOCKTITLE,
  imagen: MOCKimage,
  blogText: MOCKBLOGTEXT,
};
const ENDPOINT = "/blog/post-new-blog";
const MOCKBLOGPOST = {
  id: 1,
  title: MOCKTITLE,
  imagen: MOCKimage,
  blogText: MOCKBLOGTEXT,
  createdAt: "2024-10-03T17:58:03.172Z",
};

describe("POST postNewBlogPost", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    prismaMock.$disconnect();
  });

  it("Should create a new Blog post", async () => {
    (prismaMock.blog.create as jest.Mock).mockReturnValue(MOCKBLOGPOST);
    const response = await request(app).post(ENDPOINT).send(MOCKDATATOSEND);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      newBlogPost: MOCKBLOGPOST,
      message: "Entrada de blog creada con éxito",
    });

    expect(prismaMock.blog.create).toHaveBeenCalledWith({
      data: MOCKDATATOBECALLEDWITH,
    });
  });
  it("Should return status 500 when an error occurs during blog creation", async () => {
    prismaMock.blog.create.mockRejectedValue(new Error("Unexpected Error"));
    const response = await request(app).post(ENDPOINT).send(MOCKDATATOSEND);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: `Error creando la entrada de blog Unexpected Error`,
    });
    expect(prismaMock.blog.create).toHaveBeenCalledWith({
      data: MOCKDATATOBECALLEDWITH,
    });
  });
  it("Should call prisma.$disconnect after processing", async () => {
    (prismaMock.blog.create as jest.Mock).mockReturnValue(MOCKBLOGPOST);
    const response = await request(app).post(ENDPOINT).send(MOCKDATATOSEND);
    expect(prismaMock.$disconnect).toHaveBeenCalled();
  });
});
