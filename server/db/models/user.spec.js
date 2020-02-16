const { expect } = require("chai");
const db = require("../index");
const User = db.model("user");

describe("User Model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  //password instanceMethods test
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
  describe("signUp Tests", () => {
    let passwords = [
      "AbC123*!",
      "Abc123*",
      "abc123*!abc123*!abc123*!abc123*!",
      "abc123*!",
      "ABC123*!",
      "abcABC*!",
      "abc123A1"
    ];
    //password tests
    for (let i = 0; i < passwords.length; i++) {
      describe(`valid password test for ${passwords[i]}`, () => {
        let passwordTestUser;

        it(`is a valid password and successful signup`, async () => {
          passwordTestUser = await User.create({
            firstName: "Cody",
            lastName: "Sun",
            email: "cody@email.com",
            password: passwords[i]
          });
          expect(passwordTestUser.correctPassword(passwords[i])).to.be.equal(
            true
          );
        });
        it(`must be at least 8 charcaters long`, () => {
          expect(passwords[i].length >= 8).to.be.equal(true);
        });
        it(`must be less than 21 characters long`, () => {
          expect(passwords[i].length <= 21).to.be.equal(true);
        });
        it(`must contains at least one uppercase letter`, () => {
          expect(/[A-Z]/.test(passwords[i])).to.be.equal(true);
        });
        it(`must contain at least one lowercase letter`, () => {
          expect(/[a-z]/.test(passwords[i])).to.be.equal(true);
        });
        it(`must contain at least one number`, () => {
          expect(/[0-9]/.test(passwords[i])).to.be.equal(true);
        });
        it(`must contains at least one special character`, () => {
          expect(/[^a-zA-Z0-9\s]/.test(passwords[i])).to.be.equal(true);
        });
      });
    }
  });
});
