const request = require("supertest");
const { end } = require("./db");
const { Client } = require("pg");
process.env.NODE_ENV = "test";
process.env.PORT = 3001;
const server = require("./app");

global.request = request;
global.server = server;
global.dbClient = new Client({
  connectionString: process.env.DATABASE_URL
})

beforeAll(async () => {
  await global.dbClient.connect();
});

afterAll(async () => {
  await end();
  await global.dbClient.end();
  server.close();
});
