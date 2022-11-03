# /client

This directory contains the code for our React Web Application.

Notable dependencies are:
* [Material UI](https://mui.com/material-ui/getting-started/overview/)
* [React Scheduler](https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/)

## Development

To start the development server on [](localhost:3000), run this command:
```
npm start
```

## Testing

This project includes unit tests build for `@testing-library` than can be executed by running this command:
```
npm test
```

These tests will be ran by GitLab's CI/CD each time a commit is made to the repo that changes any code inside this directory.

## Deployment

To deploy the code we must first install all of our project's dependencies. To do this we can run `npm install`. Then we must generate a bundled version of our application. To do this we can run `npm run build`. We then need to place the generated `/build` directory inside our VM's `/www` directory. To do this we can do `sudo cp -r ./build /www`.

The client should be automatically deployed by our GitLab CI/CD which just automates these steps each time changes are made on the `main` branch.
