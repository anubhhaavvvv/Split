const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 15000); // <-- Increase timeout for DB connection

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  }, 10000); // <-- Increase timeout for this test
});
