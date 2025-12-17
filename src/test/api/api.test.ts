// to run the test just run the below command in the root directory
// npm test src/test/api

import fs from "fs/promises";
import { resolve } from "path";
import { describe, it, expect, beforeEach, afterAll } from "vitest";
import server, { PORT } from "../../server/server";
import { testData, postTestData } from "../data/testdata";
import { sleep } from "../utils/utils";
const filepath = resolve(import.meta.dirname, "./api.test.json");

const root = `http://localhost:${PORT}`;

beforeEach(async () => {
  await fs.writeFile(filepath, JSON.stringify([]));
  await sleep(2000);
});

afterAll(async () => {
  await fs.writeFile(filepath, JSON.stringify([]));
  server.close();
});

// READ

describe("GET fetch requests to '/' endpoint", async () => {
  const response = await fetch(`${root}/`);
  it("Expected to return with a http status code of 200", () => {
    expect(response.status).toBe(200);
  });

  it("Expected to return content-type: application/json; charset=utf-8", () => {
    expect(response.headers.get("content-type")).toStrictEqual(
      "application/json; charset=utf-8"
    );
  });

  it("returns database content on the response body", async () => {
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toStrictEqual(testData);

    expect(body).not.toEqual([]);
  });
});

// CREATE

describe("POST fetch requests to '/' endpoint", async () => {
  it("Expectation to return status code 201", async () => {
    const response = await fetch(`${root}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(postTestData),
    });
    expect(response.status).toBe(201);
  });

  it("Expectation that the response body include the new updated data", async () => {
    const response = await fetch(`${root}/`);
    const body = await response.json();
    const newestEntry = body[body.length - 1];

    expect(response.status).toBe(200);
    expect(newestEntry.name).toBe(postTestData.name);
    expect(newestEntry.category).toBe(postTestData.category);
    expect(newestEntry.quantity).toBe(postTestData.quantity);
  });
});
// Delete

describe("DELETE fetch requests at '/:name' endpoint", async () => {
  it("Clean up we will delete the latest item", async () => {



        const response = await fetch(`${root}/${postTestData.name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // body: JSON.stringify(postTestData),
    });
  });
});



// READ

describe("GET fetch requests to '/' endpoint to verify the item was deleted", async () => {
  const response = await fetch(`${root}/`);
  it("Expected to return with a http status code of 200", () => {
    expect(response.status).toBe(200);
  });

  it("Expected to return content-type: application/json; charset=utf-8", () => {
    expect(response.headers.get("content-type")).toStrictEqual(
      "application/json; charset=utf-8"
    );
  });

  it("returns database content on the response body", async () => {
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toStrictEqual(testData);

    expect(body).not.toEqual([]);
  });
});
// Update
