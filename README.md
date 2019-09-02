# currency-converter

Visit a live instance of this project [here](https://limitless-river-35973.herokuapp.com/)

## Installation

Install the project with

```
npm install
```

and the client dependencies with

```
cd client
npm install
```

## Execution

To run both the server and the client concurrently in a development environment, run

```
npm run dev
```

Inspect the `scripts` key in the `package.json` for detailed commands on executing the project.

## Challenges

### Valid currencies

Gathering the list of available currencies posed a few design challenges. Since they are gathered dynamically, they can't be part of the middleware express validation in `convertValidator`, necessitating the messy `findCurrencyTypeErrors` function.

The second place they came up was in the `CurrencySelect` field in the front-end form. Since they are gathered by an API call that does not support pagination or tuning the results via query params, the operation is always gathering more results than it needs. Also, since the list of currencies is virtually static, making an HTTP request to an external site for every use of the `CurrencySelect` field is overkill.

A solution would be to store a local copy of the list of valid currencies that both the validation middleware and the `CurrencySelect` field could import. This copy could be stored locally on the server and updated once day via a cron (scheduled task that would make the API call once a day)

### Balancing simplicity with expandablity

Originally I didn't want to use a context store for such a simple application, but did not see a way out without prop mining or unnaturally structuring the components. For example, the `conversion` context could be entirely done away with by simply childing the `ConversionDisplay` to the `ConvertForm` (or by more prop drilling). However since this would couple two unrelated components together and most apps gravitate towards a context store as they expand, I opted to use the `ConversionProvider`.

### Testing

The tests are largely inadequate and could be expanded upon, but more tests would require making calls to our external services, where we have a requests quota.

There are multiple solutions for this, one of which is to have a different test/development database and openexchange acount that the server could point to using `NODE_ENV`.

Another approach would be to decouple the API calls to external services into separate provider methods that the express controllers could import. These separate providers could then determine whether to make a real call, or allow for a mock call to be made based on environment variables as well.
