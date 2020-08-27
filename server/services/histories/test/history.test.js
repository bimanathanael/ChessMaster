const request = require("supertest");

const { sequelize } = require("../models");
const { queryInterface } = sequelize;
var server;

beforeEach(function () {
  server = require("../app");
});

afterEach(function () {
  server.close();
});
beforeAll(async (done) => {
  try {
    await queryInterface.bulkInsert("Histories", [
      {
        player: "budianton",
        opponent: "budibudibudi",
        status: "win",
        score: "+50",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    done();
  } catch (err) {
    done(err);
  }
});

afterAll(async (done) => {
  try {
    await queryInterface.bulkDelete("Histories", {});
    done();
  } catch (err) {
    done(err);
  }
});

describe("history route = (/histories)", () => {
  test("201 sucess add history", async (done) => {
    try {
      const newHistory = {
        player: "budianton",
        opponent: "budibudibudi",
        status: "win",
        score: "+50",
      };
      const response = await request(server)
        .post("/histories")
        .send(newHistory);
      const { body, status } = response;
      expect(status).toBe(201);
      expect(body).toHaveProperty("player");
      expect(body).toHaveProperty("opponent");
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("score");
      done();
    } catch (err) {
      done(err);
    }
  });
  test("400 failed add history - empty player", async (done) => {
    try {
      const newHistory = {
        player: "",
        opponent: "budibudibudi",
        status: "win",
        score: "+50",
      };
      const response = await request(server)
        .post("/histories")
        .send(newHistory);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "player cannot empty");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("400 failed add history - empty opponent", async (done) => {
    try {
      const newHistory = {
        player: "budibudibudi",
        opponent: "",
        status: "win",
        score: "+50",
      };
      const response = await request(server)
        .post("/histories")
        .send(newHistory);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "opponent cannot empty");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("400 failed add history - empty status", async (done) => {
    try {
      const newHistory = {
        player: "budibudibudi",
        opponent: "budianton",
        status: "",
        score: "+50",
      };
      const response = await request(server)
        .post("/histories")
        .send(newHistory);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "status cannot empty");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("400 failed add history - empty score", async (done) => {
    try {
      const newHistory = {
        player: "budibudibudi",
        opponent: "budianton",
        status: "win",
        score: "",
      };
      const response = await request(server)
        .post("/histories")
        .send(newHistory);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "score cannot empty");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("200 success read by username", async (done) => {
    try {
      const params = "budianton";
      const response = await request(server).get(`/histories/${params}`);
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Array));
      done();
    } catch (err) {
      done(err);
    }
  });

  test("200 failed read by username", async (done) => {
    try {
      const params = "budiganteng";
      const response = await request(server).get(`/histories/${params}`);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "player not found");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("200 failed read by username", (done) => {
    try {
      const response = process.env.NODE_ENV;
      expect(response).toEqual("test");
      done();
    } catch (err) {
      done(err);
    }
  });
});
