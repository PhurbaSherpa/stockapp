const { expect } = require("chai");
const db = require("../server/db/index");
const Transaction = db.model("transaction");

describe("Transaction Model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("Transactions Test", () => {
    let transaction;
    beforeEach(async () => {
      transaction = await Transaction.create({
        action: "BUY",
        symbol: "MSFT",
        price: 1000,
        shares: 2
      });
    });

    it(`has a shares value that is at least 1`, () => {
      expect(transaction.dataValues.shares >= 1).to.be.equal(true);
    });

    it("has a price that is set with two decimal places", () => {
      expect(transaction.dataValues.price).to.be.equal((1000).toFixed(2));
    });
  }); //end of describe("Shares Test")
}); // end of describe("Transaction Model")
