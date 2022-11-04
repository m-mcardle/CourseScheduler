const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://20.168.192.248',
    projectId: "q43meb",
    supportFile: false,
  },
});
