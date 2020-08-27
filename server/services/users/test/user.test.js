const request = require("supertest");
const db = require("../config/mongo");
const { hashPassword, decodePassword } = require("../helpers/bcrypt");
const { jwtSignIn } = require("../helpers/jsonwebtoken");
var server;

beforeEach(function () {
  server = require("../app");
});

afterEach(function () {
  server.close();
});

beforeAll(async (done) => {
  try {
    const newUser = {
      username: "tono1234",
      password: hashPassword("tono1234"),
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
      const response = await request(server).get("/users");
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Array));
      done();
    } catch (err) {
      done(err);
    }
  });
  test("200 sucess read data user by username", async (done) => {
    try {
      const username = "tono1234";
      const response = await request(server).get(`/users/${username}`);
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("score");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("200 sucess update data user", async (done) => {
    try {
      const updateUser = {
        username: "tono1234",
        score: 30,
      };
      const response = await request(server).put("/users").send(updateUser);
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("score");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("400 failed read data user by username", async (done) => {
    try {
      const username = "tono12342222";
      const response = await request(server).get(`/users/${username}`);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message");
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
      const response = await request(server).put("/users").send(updateUser);
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
        username: "tono1234",
        score: "",
      };
      const response = await request(server).put("/users").send(updateUser);
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
      const response = await request(server).put("/users").send(updateUser);
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
        username: "budi1234",
        password: "budi1343",
        score: 0,
      };
      const response = await request(server).post("/register").send(newUser);
      const { body, status } = response;
      expect(status).toBe(201);
      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("score");
      done();
    } catch (err) {
      done(err);
    }
  });
  test("400 failed register - empty username", async (done) => {
    try {
      const newUser = {
        username: "",
        password: "budi134",
        score: 0,
      };
      const response = await request(server).post("/register").send(newUser);
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
        username: "budi1234",
        password: "",
        score: 0,
      };
      const response = await request(server).post("/register").send(newUser);
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
        username: "budi1234",
        password: "tono1342",
        score: 0,
      };
      const response = await request(server).post("/register").send(newUser);
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
  test("400 failed register - username at least 6 characters", async (done) => {
    try {
      const newUser = {
        username: "budi",
        password: "tono134",
        score: 0,
      };
      const response = await request(server).post("/register").send(newUser);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "username at least 6 characters");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("400 failed register - password at least 8 characters", async (done) => {
    try {
      const newUser = {
        username: "budi1234",
        password: "tono",
        score: 0,
      };
      const response = await request(server).post("/register").send(newUser);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "password at least 8 characters");
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
        username: "tono1234",
        password: "tono1234",
      };
      const response = await request(server).post("/login").send(loginUser);
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
        password: "tono1234",
      };
      const response = await request(server).post("/login").send(loginUser);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Wrong username/password");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("404 failed login - wrong password", async (done) => {
    try {
      const loginUser = {
        username: "tono1234",
        password: "joko",
      };
      const response = await request(server).post("/login").send(loginUser);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Wrong username/password");
      done();
    } catch (err) {
      done(err);
    }
  });
});
