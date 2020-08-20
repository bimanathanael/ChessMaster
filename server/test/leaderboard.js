const request = require("supertest");
const app = require("../app");

describe("leaderboard test", () => {
  test.only ("201 sucess post", async (done) => {
    try {
      const newData = {
        userName: "budi",
        time: 30,
      };
      const response = await request(app).post("/leaderboards").send(newData);
      const { body, status } = response;
      expect(status).toBe(201);
      expect(body).toHaveProperty("data", expect.any(Object));
      done();
    } catch (err) {
      done(err);
    }
  });
  test("400 failed post - empty username", async (done) => {
    try {
      const newData = {
        userName: "",
        time: 30,
      };
      const response = await request(app).post("/leaderboards").send(newData);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "username cannot empty");
      done();
    } catch (err) {
      done(err);
    }
  });
  test("400 failed post - empty time", async (done) => {
    try {
      const newData = {
        userName: "budi",
        time: null,
      };
      const response = await request(app).post("/leaderboards").send(newData);
      const { body, status } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "time cannot empty");
      done();
    } catch (err) {
      done(err);
    }
  });

  test("200 success get", async (done) => {
    try {
      const response = await request(app).get("/leaderboards");
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toHaveProperty("leaderboard", expect.any(Array));
      done();
    } catch (err) {
      done(err);
    }
  });
});
