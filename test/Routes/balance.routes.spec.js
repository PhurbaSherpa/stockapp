const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../../server/index");
const agent = supertest.agent(app);
const seed = require("../test-seed");

describe("Routes", () => {
  let userObj = {
    email: "cody@email.com",
    password: "abc123ABC!*",
    firstName: "Cody",
    lastName: "Sun",
    balance: 13000
  };
  beforeEach(async () => {
    await seed();
  });

  describe("/balance", () => {
    describe("PUT /balance/increase", () => {
      it("needs a user to be accessed - NOT LOGGED IN", async () => {
        await agent
          .put("/api/balance/increase")
          .send({ price: 1234.55, quantity: 2 })
          .expect(401);
      });
      it("increases the users balance correctly - LOGGED IN", async () => {
        await agent.post("/auth/login").send(userObj);
        await agent
          .put("/api/balance/increase")
          .send({ price: 1234.55, quantity: 2 })
          .expect(200)
          .then(res => {
            expect(res.body.email).to.be.equal(userObj.email);
            expect(res.body.firstName).to.be.equal(userObj.firstName);
            expect(res.body.lastName).to.be.equal(userObj.lastName);
            expect(res.body.balance).to.be.equal(13000 + 1234.55 * 2);
          });
      });
    }); // end of describe("PUT /balance/increase")

    describe("PUT /balance/increase", () => {
      it("needs a user to be accessed - NOT LOGGED IN", async () => {
        await agent
          .put("/api/balance/decrease")
          .send({ price: 1234.55, quantity: 2 })
          .expect(401);
      });
      it("decreases the logged in users balance correctly - LOGGED IN", async () => {
        await agent.post("/auth/login").send(userObj);
        await agent
          .put("/api/balance/decrease")
          .send({ price: 1234.55, quantity: 2 })
          .expect(200)
          .then(res => {
            expect(res.body.email).to.be.equal(userObj.email);
            expect(res.body.firstName).to.be.equal(userObj.firstName);
            expect(res.body.lastName).to.be.equal(userObj.lastName);
            expect(res.body.balance).to.be.equal(13000 - 1234.55 * 2);
          });
      });
    }); // end of describe("PUT /balance/increase")
  }); // end of describe("/balance")
}); // end of describe("Routes")
