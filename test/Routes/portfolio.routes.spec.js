const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../../server/index");
const agent = supertest.agent(app);
const seed = require("../test-seed");
const { Stock } = require("../../server/db/models");

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

  describe("/portfolio", () => {
    describe("GET /api/protfolio", () => {
      it("needs a user to be accessed - NOT LOGGED IN", async () => {
        await agent.get("/api/portfolio").expect(401);
      });
      it("gets all users owned stocks - LOGGED IN", async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .get("/api/portfolio")
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.be.equal(2);
            expect(res.body.some(stock => stock.userId === 1)).to.be.equal(
              true
            );
          });
      });
    }); // end of describe("GET /api/portfolio")
    describe("POST /api/portfolio", () => {
      it("needs a user to be accessed - NOT LOGGED IN", async () => {
        await agent
          .post("/api/portfolio")
          .send({
            stock: {
              symbol: "MSFT",
              latestPrice: 185.83,
              openPrice: 183.88
            },
            quantity: 1
          })
          .expect(401);
      });
      it("creates a new stock and adds to portfolio - LOGGED IN", async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .post("/api/portfolio")
          .send({
            stock: {
              symbol: "MSFT",
              latestPrice: 185.83,
              openPrice: 183.88
            },
            quantity: 1
          })
          .expect(200)
          .then(async res => {
            expect(res.body).to.be.a("object");
            expect(res.body.userId).to.be.equal(1);
            expect(res.body.symbol).to.be.equal("MSFT");
            expect(res.body.totalShares).to.be.equal(1);
            expect(res.body.totalValue).to.be.equal((185.83 * 1).toFixed(2));
            expect(res.body.status).to.be.equal("POSITIVE");
            expect(
              (await Stock.findAll({ where: { userId: 1 } })).length
            ).to.be.equal(3);
          });
      });
      it("doesn't create a new stock if owned already", async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .post("/api/portfolio")
          .send({
            stock: {
              symbol: "AAPL",
              latestPrice: 185.83,
              openPrice: 183.88
            },
            quantity: 1
          })
          .expect(400);
      });
    }); // end of describe("POST /api/portfolio")

    describe("DELETE /api/portfolio/:symbol", () => {
      it("needs a user to be accessed - NOT LOGGED IN", async () => {
        await agent.delete(`/api/portfolio/AAPL`).expect(401);
      });
      it(`removes from portfolio once user sells all shares of stock`, async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .delete("/api/portfolio/AAPL")
          .expect(200)
          .then(async res => {
            expect(res.body).to.be.a("object");
            expect(res.body.symbol).to.be.equal("AAPL");
            expect(
              await Stock.findOne({ where: { symbol: "AAPL", userId: 1 } })
            ).to.be.equal(null);
          });
      });
    }); // end of describe("DELETE /api/portfolio/:symbol")

    describe("PUT /api/portfolio/quantity", () => {
      it("needs a user to be accessed - NOT LOGGED IN", async () => {
        await agent
          .put(`/api/portfolio/AAPL`)
          .send({
            stock: {
              symbol: "AAPL",
              latestPrice: 185.83,
              openPrice: 183.88
            },
            quantity: 1
          })
          .expect(401);
      });
      it("updates shares of existing stock when bought - LOGGED IN", async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .put("/api/portfolio/quantity")
          .send({
            stock: {
              symbol: "AAPL",
              latestPrice: 185.83,
              openPrice: 183.88
            },
            quantity: 1
          })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("object");
            expect(res.body.symbol).to.be.equal("AAPL");
            expect(res.body.totalShares).to.be.equal(3);
            expect(res.body.totalValue).to.be.equal(+(3 * 185.83).toFixed(2));
          });
      });
      it("updates shares of existing stock when some are sold", async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .put("/api/portfolio/quantity")
          .send({
            stock: {
              symbol: "AAPL",
              totalValue: 185.83,
              totalShares: 2
            },
            quantity: -1
          })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("object");
            expect(res.body.symbol).to.be.equal("AAPL");
            expect(res.body.totalShares).to.be.equal(1);
            expect(res.body.totalValue).to.be.equal(
              +((1 * 185.83) / 2).toFixed(2)
            );
          });
      });
    }); // end of describe("PUT /api/portfolio/quantity")

    describe("/PUT /api/portfolio/currentvalues", () => {
      it(`needs a user to have access - NOT LOGGED IN`, async () => {
        await agent
          .put(`/api/portfolio/currentValues`)
          .send({
            //info from iex api
            data: {
              AAPL: {
                quote: {
                  latestPrice: 650.5,
                  open: 640.5,
                  previousClose: 643.23
                }
              },
              TSLA: {
                quote: {
                  latestPrice: 500.25,
                  open: 495.5,
                  previousClose: 400.25
                }
              }
            }
          })
          .expect(401);
      });
      it(`updated the totalValues of the stocks owned by a user- LOGGED IN`, async () => {
        await agent.post("/auth/login").send(cody);
        await agent
          .put(`/api/portfolio/currentValues`)
          .send({
            //info from iex api
            data: {
              AAPL: {
                quote: {
                  latestPrice: 650.5,
                  open: 640.5,
                  previousClose: 643.23
                }
              },
              TSLA: {
                quote: {
                  latestPrice: 500.25,
                  open: 495.5,
                  previousClose: 400.25
                }
              }
            }
          })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("array");
            expect(
              res.body.some(stock => {
                if (
                  stock.symbol === "AAPL" &&
                  stock.totalValue === (650.5 * 2).toFixed(2)
                ) {
                  return true;
                } else if (
                  stock.symbol === "TSLA" &&
                  stock.totalValue === (500.25 * 4).toFixed(2)
                ) {
                  return true;
                }
                return false;
              })
            ).to.be.equal(true);
          });
      });
    }); // end of describe("/PUT /api/portfolio/currentvalues")
  }); // end of describe("/portfolio");
}); // end of describe("Routes")
