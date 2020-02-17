const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../server/index");
const db = require("../server/db");
const agent = supertest.agent(app);
const User = db.model("user");

describe("Routes", () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    let userObj = {
      firstName: "Cody",
      lastName: "Sun",
      email: "cody@email.com",
      password: "AbC123*!"
    };
    await User.create(userObj);
    await agent.post("/auth/login").send(userObj);
    //default balance is 5000 at creation
    //need access to req.user it is set on login using passport
  });

  describe("/balance", () => {
    describe("PUT /balance/increase", () => {
      it("increases the users balance correctly", async () => {
        await agent
          .put("/api/balance/increase")
          .send({ price: 1234.55, quantity: 2 })
          .expect(200)
          .then(res => {
            expect(res.body.balance).to.be.equal(5000 + 1234.55 * 2);
          });
      });
    }); // end of describe("PUT /balance/increase")

    describe("PUT /balance/increase", () => {
      it("decreases the users balance correctly", async () => {
        await agent
          .put("/api/balance/decrease")
          .send({ price: 1234.55, quantity: 2 })
          .expect(200)
          .then(res => {
            expect(res.body.balance).to.be.equal(5000 - 1234.55 * 2);
          });
      });
    }); // end of describe("PUT /balance/increase")
  }); // end of describe("/balance")
});
