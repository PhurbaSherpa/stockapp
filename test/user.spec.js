const { expect } = require("chai");
const db = require("../server/db/index");
const User = db.model("user");

describe("User Model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("Password instanceMethods Tests", () => {
    describe("check correctPassword method", () => {
      let cody;

      beforeEach(async () => {
        cody = await User.create({
          firstName: "Cody",
          lastName: "Sun",
          email: "cody@email.com",
          password: "AbC123*!"
        });
      });

      it("returns true if the password is correct", () => {
        expect(cody.correctPassword("AbC123*!")).to.be.equal(true);
      });
      it("returns false if the password is incorrect", () => {
        expect(cody.correctPassword("abc123")).to.be.equal(false);
      });
    }); // end describe("check correctPassword method")
  }); // end describe("Password instanceMethods Tests")

  // signup tests
  describe("Signup Tests", () => {
    //**** change user obj to run different tests ****//
    let userObj = {
      firstName: "D'Lilah-Jean",
      lastName: "Smith-Jone's",
      email: "cody@email.com",
      password: "AbC123*!"
    };
    let currentTestPassword = userObj.password;
    let currentTestFirstName = userObj.firstName;
    let currentTestLastName = userObj.lastName;
    let currentTestEmail = userObj.email;

    let user;
    beforeEach(async () => {
      user = await User.create(userObj);
    });

    describe("Sign Up Success", () => {
      it("is a successful Sign Up", () => {
        expect(user.dataValues.id).to.be.a("number");
      });
    });

    describe(`Valid password tests`, () => {
      it(`must be at least 8 charcaters long`, () => {
        expect(currentTestPassword.length >= 8).to.be.equal(true);
      });
      it(`must be shorter than 21 characters long`, () => {
        expect(currentTestPassword.length <= 21).to.be.equal(true);
      });
      it(`must contains at least one uppercase letter`, () => {
        expect(/[A-Z]/.test(currentTestPassword)).to.be.equal(true);
      });
      it(`must contain at least one lowercase letter`, () => {
        expect(/[a-z]/.test(currentTestPassword)).to.be.equal(true);
      });
      it(`must contain at least one number`, () => {
        expect(/[0-9]/.test(currentTestPassword)).to.be.equal(true);
      });
      it(`must contains at least one special character`, () => {
        expect(/[^a-zA-Z0-9\s]/.test(currentTestPassword)).to.be.equal(true);
      });
    }); // end of describe(`valid password tests)

    describe(`Valid firstName tests`, () => {
      it(`must contain no numbers`, () => {
        expect(/[0-9]/.test(currentTestFirstName)).to.be.equal(false);
      });
      it(`must contain a letter`, () => {
        expect(/[a-zA-Z]/.test(currentTestFirstName)).to.be.equal(true);
      });
      it(`must contain no special characters except ' and -`, () => {
        expect(/[^a-zA-Z0-9-']/.test(currentTestFirstName)).to.be.equal(false);
      });
      it(`must start with a letter`, () => {
        expect(/^[a-zA-z]/.test(currentTestFirstName)).to.be.equal(true);
      });
    }); // end of describe("Valid firstName tests")

    describe(`valid lastName tests`, () => {
      it(`must contain no numbers`, () => {
        expect(/[0-9]/.test(currentTestLastName)).to.be.equal(false);
      });
      it(`must contain a letter`, () => {
        expect(/[a-zA-Z]/.test(currentTestLastName)).to.be.equal(true);
      });
      it(`must contain no special characters except ' and -`, () => {
        expect(/[^a-zA-Z0-9-']/.test(currentTestLastName)).to.be.equal(false);
      });
      it(`must start with a letter`, () => {
        expect(/^[a-zA-z]/.test(currentTestLastName)).to.be.equal(true);
      });
    }); // end of describe("Valid lastName tests")

    describe("Valid Email Test", () => {
      it(`must be a valid email`, () => {
        expect(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(currentTestEmail)
        ).to.be.equal(true);
      });
    }); // end of describe("Valid Email")

    describe(`Signup defaults balance to 5000.00`, () => {
      it(`must be an amount of $5000`, () => {
        expect(user.dataValues.balance).to.be.equal((5000).toFixed(2));
      });
    }); // end of describe("Signup defaults balance to 5000.00")
  }); // end of describe("Signup Tests")
}); // end of describe("User Model")
