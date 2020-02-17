const { expect } = require("chai");
const db = require("../server/db/index");
const Stock = db.model("stock");

describe("Stock Model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("Stocks Test", () => {
    let stock;
    beforeEach(async () => {
      stock = await Stock.create({
        symbol: "MSFT",
        totalValue: 1300,
        totalShares: 13,
        status: "POSITIVE"
      });
    });

    describe("TotalShares test", () => {
      it(`has totalShares value that is at least 1`, () => {
        expect(stock.dataValues.totalShares >= 1).to.be.equal(true);
      });
    }); // end of describe("TotalShares test")

    describe("TotalValue tests", () => {
      it("has a totalValue that is greater than 0", () => {
        expect(stock.dataValues.totalValue > 0).to.be.equal(true);
      });
      it("has a totalValue that is set with two decimal places", () => {
        expect(stock.dataValues.totalValue).to.be.equal((1300).toFixed(2));
      });
    }); // end of describe("TotalValue tests")

    describe("Status test", () => {
      it("has a status of either POSITIVE, NEGATIVE, or EQUAL", () => {
        expect(stock.dataValues.status).to.be.equal(
          "POSITIVE" || "NEGATIVE" || "EQUAL"
        );
      });
    }); // end of describe("Status test")
  }); //end of describe("Stocks Test")
}); // end of describe("Stock Model")
