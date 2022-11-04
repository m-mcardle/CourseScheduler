# Cypress

Cypress is a JavaScript E2E testing framework. This allows us to automate manual testing on our front-end. It will also record test runs and place them in `/videos` or `/screenshots` as a visual reference to the test run.

## Running Cypress

Running against production:
```
./node_modules/.bin/cypress run
```

Running against dev environment:
```
CYPRESS_BASE_URL=http://localhost:3000 ./node_modules/.bin/cypress run
```

## Opening Cypress

To run tests manually with the visual Cypress tooling, open the application by running:
```
./node_modules/.bin/cypress open
```

## Running Official Test Run

```
npx cypress run --record --key aeb1bd3a-0190-49bf-aee6-8350f7e97fd6
```