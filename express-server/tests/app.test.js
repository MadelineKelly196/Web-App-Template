import {createApp} from "../app.js";
import * as dbService from "../dbService.js";
import request from "supertest";
import {describe, expect, jest} from '@jest/globals';

const app = createApp(dbService);

describe("GET /", () => {
  it("should return basic hello world as JSON", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty("message");
      expect(response.body[0].message).toMatch(/Hello World!/);
      expect(response.body[1].message).toMatch(/From Node.js/);
    }
  });
});

// Mock the dbService to isolate tests
const mockDbService = {
  getData: jest.fn().mockResolvedValue([
    { id: 1, message: "Hello World!" },
    { id: 2, message: "From mockDB" }
  ])
};

const appMockDb = createApp(mockDbService);

describe("GET /", () => {
  it("should return basic hello world as JSON", async () => {
    const response = await request(appMockDb).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty("message");
      expect(response.body[0].message).toMatch(/Hello World!/);
      expect(response.body[1].message).toMatch(/From mockDB/);
    }
  });
});

// Mock dbService with error
const mockDbServiceError = {
  getData: jest.fn().mockRejectedValue(new Error("Database error"))
};

const appErrorDb = createApp(mockDbServiceError);

describe("GET /", () => {
  it("should return basic hello world as JSON", async () => {
    const response = await request(appErrorDb).get("/");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error", "Database error");
  });
});


