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
      score: 0,
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

describe("check and update data user, route = /user", () => {
  test("200 sucess read data user", async (done) => {
    try {
      const response = await request(app).get("/users");
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Array));
      done();
    } catch (err) {
      done(err);
    }
  });

  test("400 sucess update data user", async (done) => {
    try {
      const updateUser = {
        username: "tono",
        score: 30,
      };
      const response = await request(app).put("/users").send(updateUser);
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("score");
      done();
    } catch (err) {
      done(err);
    }
  });
  test("400 failed update - empty username", async (done) => {
    try {
      const updateUser = {
        username: "",
        score: 30,
      };
      const response = await request(app).put("/users").send(updateUser);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "username cannot empty");

      done();
    } catch (err) {
      done(err);
    }
  });

  test("400 failed update - empty score", async (done) => {
    try {
      const updateUser = {
        username: "tono",
        score: "",
      };
      const response = await request(app).put("/users").send(updateUser);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "score cannot empty");

      done();
    } catch (err) {
      done(err);
    }
  });

  test("404 failed update - username cannot found", async (done) => {
    try {
      const updateUser = {
        username: "kakakak",
        score: 30,
      };
      const response = await request(app).put("/users").send(updateUser);
      const { body, status } = response;
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "username cannot found");

      done();
    } catch (err) {
      done(err);
    }
  });
});

describe("register user, route = (/register)", () => {
  test("201 sucess register", async (done) => {
    try {
      const newUser = {
        username: "budi",
        password: hashPassword("budi"),
        score: 0,
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
        score: 0,
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
        score: 0,
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
        score: 0,
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

describe("login user, route = /login", () => {
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
