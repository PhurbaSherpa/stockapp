const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: 'Must enter a First Name'
    },

    validate: {
      notEmpty: {
        args: true,
        msg: 'Must enter a First Name'
      },
      is: {
        args: /^[a-z]+(['-][a-z]*)*$/i,
        msg:
          "First name can contain only letters and special characters(' and -)"
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: {
      args: false,
      msg: 'Must enter a Last Name'
    },
    validate: {
      notEmpty: {
        args: true,
        msg: 'Must enter a Last Name'
      },
      is: {
        args: /^[a-z]+(['-][a-z]*)*$/i,
        msg:
          "Last name can contain only letters and special characters(' and -)"
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      msg: 'Email is already in use'
    },
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Must enter a email'
      },
      isEmail: {
        args: [true],
        msg: 'Must be a valid email'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue('password')
    },
    validate: {
      notEmpty: {
        args: true,
        msg: 'Must enter a Password'
      },
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$/,
        msg:
          'Must contain at least a number, uppercase, lowercase, and a special character w/ a length of 8-21'
      }
    }
  },
  balance: {
    type: Sequelize.DECIMAL(13, 2),
    defaultValue: 5000,
    min: 0
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
