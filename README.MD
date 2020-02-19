LIVE LINK : https://ttp-stockapp.herokuapp.com/

# Stock Trader

A web application where users can sign up to join the Sock Market.

<h2>Portfolio Page</h2>
<img src="https://i.imgur.com/T56DNna.png" width='40%'/>
<h2>Transactions Page</h2>
<img src="https://i.imgur.com/dk1BxqP.png" width='40%'/>

## Features

A user is able to create a new account and will be given \$5000 USD upon signup

- first name, last name, email, and password is required
- take note that an email can only be used once

A user can sign in by authentication through email and password

A user can visit their Profile/Deposit page to add more funds through stripe

- currently uses test mode
- test card is 4242 4242 4242 42442
- date is anytime in the future
- cvc is any 3 digit number

A user can buy shares at its current price by looking up the specific ticker symbol

- can only buy whole number shares
- can only buy if user has enough funds
- can only buy if a ticker symbol is valid

A user can sell shares at its latest price on the market

- can only sell whole number shares
- can only sell if user owns shares of stock

A user can view a list of past transactions on their transaction page, if they ever need to preform an audit, Each transaction

- shows date, action, symbol, number of shares sold, and price

A user can view their portfolio, which will show a list of owned stocks

- shows total value of shares based on latest value of one share
- total value changes based on the status of the stock on the market
  - Display red when the current price is less than the day’s open price.
  - Display grey when the current price is equal to the day’s open price.
  - Display green when the current price is greater than the day’s open price.
- symbol, price/share, and number of shares owned
- each stock only shows once

## Getting Started

You will need to get your own api token in order to use the iex api:
go to this link to retrieve one --> https://iexcloud.io/

Fork the repo and then git clone

```
git clone https://github.com/your_github/stockapp
```

then

```
npm install
```

For personal use go to server/api/quote.js to find where I use my api token and insert yours instead, if you do put this up you'll need to protect by creating a sercets.js file and gitignore

you can then finally start it

```
npm run start
```

## Testing

- includes testing for models and routes
- put an x in front of describe to block a test
  **_When running test look at test seed file located in test/test-seed.js_**

run the following code:

```
npm run test
```

## Built With

- [React](https://reactjs.org/) - Frontend Framework
- [React-Redux](https://react-redux.js.org/) - Used for state management
- [Node.js](https://nodejs.org/en/) - JavaScript Runtime
- [Axios](https://www.npmjs.com/package/axios) - HTTP client
- [Express](https://expressjs.com/) - Handling of routes

## Author

- **Phurba Sherpa** - _Developer_
