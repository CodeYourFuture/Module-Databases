const request = require("supertest");
const { end } = require("./db");
process.env.NODE_ENV = "test";
process.env.PORT = 3001;
const server = require("./app");

global.request = request;
global.server = server;

afterAll(async () => {
  await end();
  server.close();
});
