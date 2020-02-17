const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../../server/index");
const db = require("../../server/db");
const agent = supertest.agent(app);
const User = db.model("user");

describe("Routes", () => {
  let userObj1 = {
    email: "cody@email.com",
    password: "abc123ABC!*",
    firstName: "Cody",
    lastName: "Sun",
    balance: 13000
  };
  let userObj2 = {
    firstName: "Murphy",
    lastName: "Moon",
    email: "murphyEmail@email.com",
    password: "AbC123*!"
  };
  beforeEach(async () => {
    await db.sync({ force: true });
    await User.create(userObj1);
  });

  describe("/auth", () => {
    describe("GET /me", () => {
      it("needs a logged in user to be accessed", async () => {
        await agent.get("/auth/me").expect(401);
      });
      it("sends back the logged in user when logged in with password hidden", async () => {
        await agent.post("/auth/login").send(userObj1);
        await agent
          .get("/auth/me")
          .expect(200)
          .then(res => {
            expect(res.body.email).to.be.equal(userObj1.email);
            expect(res.body.firstName).to.be.equal(userObj1.firstName);
            expect(res.body.lastName).to.be.equal(userObj1.lastName);
            expect(res.body.password).to.be.equal();
          });
      });
    }); // end of describe("GET /me")

    describe("POST /login", () => {
      it(`logs in succesfully and password is hidden`, async () => {
        await agent
          .post("/auth/login")
          .send({
            email: userObj1.email,
            password: userObj1.password
          })
          .expect(200)
          .then(res => {
            expect(res.body.email).to.be.equal(userObj1.email);
            expect(res.body.firstName).to.be.equal(userObj1.firstName);
            expect(res.body.lastName).to.be.equal(userObj1.lastName);
            expect(res.body.password).to.be.equal();
          });
      });
    }); // end of describe("POST /login")

    describe("POST /signup", () => {
      it(`successfully signs a new user up and password is hidden`, async () => {
        await agent
          .post("/auth/signup")
          .send(userObj2)
          .expect(200)
          .then(res => {
            expect(res.body.email).to.be.equal(userObj2.email);
            expect(res.body.firstName).to.be.equal(userObj2.firstName);
            expect(res.body.lastName).to.be.equal(userObj2.lastName);
            expect(res.body.password).to.be.equal();
          });
      });
    }); // end of describe('POST /signup')

    describe("POST /logout", () => {
      it(`successfully logs a user out`, async () => {
        await agent.post("/auth/login").send({
          email: userObj1.email,
          password: userObj1.password
        });
        await agent
          .post("/auth/logout")
          .expect(302)
          .then(res => {
            expect(res.body.email).to.be.equal();
            expect(res.body.email).to.be.equal();
            expect(res.body.firstName).to.be.equal();
            expect(res.body.lastName).to.be.equal();
          });
      });
    });
  }); // end of describe("/user")
}); // end of describe("Routes")
