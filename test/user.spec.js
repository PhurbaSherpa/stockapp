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
    let passwords = [
      "AbC123*!",
      "Abc123*",
      "abc123*!abc123*!abc123*!abc123*!",
      "abc123*!",
      "ABC123*!",
      "abcABC*!",
      "abc123A1"
    ];
    let firstNames = [
      "Cody",
      "phurba",
      "jay-z",
      "D'lilah",
      "john smith",
      "tyler1",
      "Love<3:)"
    ];

    describe("Signup tests with passwords", () => {
      for (let i = 0; i < passwords.length; i++) {
        let passwordTestUser;
        let currentTestPassword = passwords[i];

        describe(`Tests with password ${currentTestPassword}`, () => {
          describe(`signup outcome`, () => {
            it(`is a successful signup`, async () => {
              passwordTestUser = await User.create({
                firstName: "Cody",
                lastName: "Sun",
                email: "cody@email.com",
                password: currentTestPassword
              });
              expect(
                passwordTestUser.correctPassword(currentTestPassword)
              ).to.be.equal(true);
            });
          }); // end of describe("signup outcome")

          describe(`valid password test`, () => {
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
              expect(/[^a-zA-Z0-9\s]/.test(currentTestPassword)).to.be.equal(
                true
              );
            });
          }); // end of describe(`valid password test)
        });
      }
    }); // end of ('Signup tests with passwords')

    describe("Signup tests with firstnames", () => {
      for (let i = 0; i < firstNames.length; i++) {
        let firstNameTestUser;
        let currentTestFirstName = firstNames[i];

        describe(`Tests with firstName ${currentTestFirstName}`, () => {
          describe(`Signup outcome with ${firstNames[i]}`, () => {
            it(`is a successful signup`, async () => {
              firstNameTestUser = await User.create({
                firstName: currentTestFirstName,
                lastName: "Sun",
                email: "cody@email.com",
                password: "AbC123*!"
              });
              expect(firstNameTestUser.dataValues.name).to.be.equal(
                currentTestFirstName
              );
            });
          }); // end of describe(`Signup outcome with ${firstNames[i]`)

          describe(`valid firstName tests`, () => {
            it(`must contain no numbers`, () => {
              expect(/[0-9]/.test(currentTestFirstName)).to.be.equal(false);
            });
            it(`must contain a letter`, () => {
              expect(/[a-zA-Z]/.test(currentTestFirstName)).to.be.equal(true);
            });
            it(`must contain no special characters except ' and -`, () => {
              expect(/[^a-zA-Z0-9-']/.test(currentTestFirstName)).to.be.equal(
                false
              );
            });
            it(`must start with a letter`, () => {
              expect(/^[a-zA-z]/.test(currentTestFirstName)).to.be.equal(true);
            });
          });
        }); //end of describe (`Tests with fristName ${currentTestFirstName} `)
      }
    }); //end of ("Signup tests with firstnames")
  }); // end of describe("Signup Tests")
}); // end of describe("User Model")
