const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../../server/index");
const agent = supertest.agent(app);
const seed = require("./test-seed");

describe("Routes", () => {
  let cody = {
    email: "cody@email.com",
    password: "abc123ABC!*",
    firstName: "Cody",
    lastName: "Sun",
    balance: 13000
  };

  beforeEach(async () => {
    await seed();
  });

  describe("/transaction", () => {
    describe("GET /api/transaction", () => {
      it("needs a user to be accessed - NOT LOGGED IN", async () => {
        await agent.get("/api/transaction").expect(401);
      });
      it("gets all transactions of user - LOGGED IN", async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .get("/api/transaction")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.be.equal(2);
            expect(
              res.body.some(
                singleTranasaction => singleTranasaction.userId === 1
              )
            ).to.be.equal(true);
          });
      });
    }); // end of describe("GET /api/transaction")

    describe("POST /api/transaction/sell", () => {
      it("needs a user to be accessed - NOT LOGGED IN", async () => {
        await agent
          .post("/api/transaction/sell")
          .send({
            stock: {
              userId: 1,
              symbol: "AAPL",
              totalShares: 2,
              totalValue: 650.38,
              status: "POSITIVE"
            },
            quantity: 1
          })
          .expect(401);
      });
      it("creates new sell transaction - LOGGED IN", async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .post("/api/transaction/sell")
          .send({
            stock: {
              userId: 1,
              symbol: "AAPL",
              totalShares: 2,
              totalValue: 650.38,
              status: "POSITIVE"
            },
            quantity: 1
          })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("object");
            expect(res.body.userId).to.be.equal(1);
            expect(res.body.action).to.be.equal("SELL");
            expect(res.body.symbol).to.be.equal("AAPL");
            expect(res.body.price).to.be.equal((650.38 / 2).toFixed(2));
            expect(res.body.shares).to.be.equal(1);
          });
      });
      it(`doesn't create a new sell transaction if not enough stocks owned`, async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .post("/api/transaction/sell")
          .send({
            stock: {
              userId: 1,
              symbol: "AAPL",
              totalShares: 2,
              totalValue: 650.38,
              status: "POSITIVE"
            },
            quantity: 100
          })
          .expect(400);
      });
    }); // end of describe("POST /api/transaction/sell")

    describe("POST /api/transaction/buy", () => {
      it("needs a user to be accessed - NOT LOGGED IN", async () => {
        await agent
          .post("/api/transaction/buy")
          .send({
            stock: {
              userId: 1,
              symbol: "AAPL",
              totalShares: 2,
              totalValue: 650.38,
              status: "POSITIVE"
            },
            quantity: 1
          })
          .expect(401);
      });
      it("creates new buy transaction - LOGGED IN", async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .post("/api/transaction/buy")
          .send({
            stock: {
              symbol: "AAPL",
              latestPrice: 325.1,
              openPrice: 323.55
            },
            quantity: 1
          })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("object");
            expect(res.body.userId).to.be.equal(1);
            expect(res.body.action).to.be.equal("BUY");
            expect(res.body.symbol).to.be.equal("AAPL");
            expect(res.body.price).to.be.equal((325.1).toFixed(2));
            expect(res.body.shares).to.be.equal(1);
          });
      });
      it(`doesn't create buy transaction if balance to low`, async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .post("/api/transaction/buy")
          .send({
            stock: {
              symbol: "AAPL",
              latestPrice: 325.1,
              openPrice: 323.55
            },
            quantity: 100
          })
          .expect(400);
      });
    }); // end of describe("POST /api/transaction/sell")
  }); //end of describe("/transaction")
}); // end of describe("Routes")
