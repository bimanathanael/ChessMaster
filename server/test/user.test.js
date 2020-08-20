const request = require("supertest");
const app = require("../app");
const db = require("../config/mongo");
const { hashPassword, decodePassword } = require("../helpers/bcrypt");
const { jwtSignIn } = require("../helpers/jsonwebtoken");

beforeAll(async (done) => {
  try {
    const newUser = {
      username: "tono",
      password: hashPassword("tono"),
    };
    await db.collection("Users").insertOne(newUser);
    done();
  } catch (err) {
    done(err);
  }
});

afterAll(async (done) => {
  try {
    await db.collection("Users").drop();
    done();
  } catch (error) {
    done(error);
  }
});

describe("register user", () => {
  test("201 sucess register", async (done) => {
    try {
      const newUser = {
        username: "budi",
        password: hashPassword("budi"),
      };
      const response = await request(app).post("/register").send(newUser);
      const { body, status } = response;
      expect(status).toBe(201);
      expect(body).toHaveProperty("message", "success register");
      done();
    } catch (err) {
      done(err);
    }
  });
  test("400 failed register - empty username", async (done) => {
    try {
      const newUser = {
        username: "",
        password: hashPassword("budi"),
      };
      const response = await request(app).post("/register").send(newUser);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "username cannot empty");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("400 failed register - empty password", async (done) => {
    try {
      const newUser = {
        username: "budi",
        password: "",
      };
      const response = await request(app).post("/register").send(newUser);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "password cannot empty");
      done();
    } catch (err) {
      done(err);
    }
  });
  test("400 failed register - duplicate username", async (done) => {
    try {
      const newUser = {
        username: "budi",
        password: hashPassword("tono"),
      };
      const response = await request(app).post("/register").send(newUser);
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
});

describe("login user", () => {
  test("200 sucess login", async (done) => {
    try {
      const loginUser = {
        username: "tono",
        password: "tono",
      };
      const response = await request(app).post("/login").send(loginUser);
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toHaveProperty("access_token");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("404 failed login - username not found", async (done) => {
    try {
      const loginUser = {
        username: "jokondokondo",
        password: "tono",
      };
      const response = await request(app).post("/login").send(loginUser);
      const { body, status } = response;
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "user not found");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("404 failed login - wrong password", async (done) => {
    try {
      const loginUser = {
        username: "tono",
        password: "joko",
      };
      const response = await request(app).post("/login").send(loginUser);
      const { body, status } = response;
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "wrong password");
      done();
    } catch (err) {
      done(err);
    }
  });
});
