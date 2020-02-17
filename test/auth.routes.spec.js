const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../server/index");
const db = require("../server/db");
const agent = supertest.agent(app);
const User = db.model("user");

describe("Routes", () => {
  let user;
  let userObj = {
    firstName: "Cody",
    lastName: "Sun",
    email: "cody@email.com",
    password: "AbC123*!"
  };
  let userObj2 = {
    firstName: "Murphy",
    lastName: "Moon",
    email: "murphy@email.com",
    password: "AbC123*!"
  };
  beforeEach(async () => {
    await db.sync({ force: true });
    user = await User.create(userObj);
  });

  describe("POST /login", () => {
    it(`logs in succesfully`, async () => {
      await agent
        .post("/auth/login")
        .send({
          email: userObj.email,
          password: userObj.password
        })
        .expect(200)
        .then(res => {
          expect(res.body.email).to.be.equal(userObj.email);
          expect(res.body.firstName).to.be.equal(userObj.firstName);
          expect(res.body.lastName).to.be.equal(userObj.lastName);
          expect(user.correctPassword(userObj.password)).to.be.equal(true);
        });
    });
  }); // end of describe("POST /login")

  describe("/auth", () => {
    describe("GET /me", () => {
      it("sends back the logged in user", async () => {
        await agent.post("/auth/login").send({
          email: userObj.email,
          password: userObj.password
        });
        await agent
          .get("/auth/me")
          .expect(200)
          .then(res => {
            expect(res.body.email).to.be.equal(userObj.email);
            expect(res.body.firstName).to.be.equal(userObj.firstName);
            expect(res.body.lastName).to.be.equal(userObj.lastName);
            expect(user.correctPassword(userObj.password)).to.be.equal(true);
          });
      });
    }); // end of describe("GET /me")

    describe("POST /signup", () => {
      it(`successfully signs a new user up`, async () => {
        await agent
          .post("/auth/signup")
          .send(userObj2)
          .expect(200)
          .then(res => {
            expect(res.body.email).to.be.equal(userObj2.email);
            expect(res.body.firstName).to.be.equal(userObj2.firstName);
            expect(res.body.lastName).to.be.equal(userObj2.lastName);
            expect(user.correctPassword(userObj2.password)).to.be.equal(true);
          });
      });
    }); // end of describe('POST /signup')

    describe("POST /logout", () => {
      it(`successfully logs a user out`, async () => {
        await agent.post("/auth/login").send({
          email: userObj.email,
          password: userObj.password
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
});
