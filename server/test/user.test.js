const request = require("supertest");
const app = require("../app");

describe("user test", () => {
  test("201 sucess register", async (done) => {
    try {
      const newUser = {
        userName: "budi",
      };
      const response = await request(app).post("/users").send(newUser);
      const { body, status } = response;
      expect(status).toBe(201);
      expect(body).toHaveProperty("username", "budi");
      done();
    } catch (err) {
      done(err);
    }
  });
  test("400 failed register - empty username", async (done) => {
    try {
      const newUser = {
        userName: "",
      };
      const response = await request(app).post("/users").send(newUser);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "username cannot empty");
      done();
    } catch (err) {
      done(err);
    }
  });
  test("400 failed register - duplicate username", async (done) => {
    try {
      const newUser = {
        userName: "budi",
      };
      const response = await request(app).post("/users").send(newUser);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty(
        "message",
        "this username has been registered"
      );
      done();
    } catch (err) {
      done(err);
    }
  });

  test("200 success get", async (done) => {
    try {
      const response = await request(app).get("/users");
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toHaveProperty("users", expect.any(Array));
      done();
    } catch (err) {
      done(err);
    }
  });
});
