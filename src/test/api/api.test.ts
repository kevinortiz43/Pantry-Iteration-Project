import fs from "fs/promises";
import { resolve } from "path";
import { describe, it, expect, beforeEach, afterAll } from "vitest";
import server, { PORT } from "../../server/server";
import { testData } from "../data/testdata";

const filepath = resolve(import.meta.dirname, "./api.test.json");

const root = `http://localhost:${PORT}`;
const response = await fetch(`${root}/`);
const body = await response.json();
// console.log(root);

// console.log(testData[0].name);

beforeEach(async () => {
  await fs.writeFile(filepath, JSON.stringify([]));
});

afterAll(async () => {
  await fs.writeFile(filepath, JSON.stringify([]));
  server.close();
});

describe.skip("GET fetch requests to '/' endpoint", async () => {
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
    expect(body).toStrictEqual(testData);

    expect(body).not.toEqual([]);
  });
});

describe("POST fetch requests to '/' endpoint", async () => {
  const postTestData = {
    name: "TEST Banana",
    category: "Fruit",
    quantity: 2,
    unitType: "1",
    threshold: 1,
    __v: 0,
  };

  it.skip("Expectation to return status code 201", async () => {
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
    const newestEntry = body[body.length - 1];

    console.log(newestEntry.name);
    console.log(newestEntry.quantity);
    console.log(newestEntry.category);
    console.log(newestEntry.unitType);

    // console.log(newestEntry.name)
    console.log("-----------------");
    console.log(postTestData.name);
    console.log(postTestData.quantity);
    console.log(postTestData.category);
    console.log(postTestData.unitType);
    // const testData1 = {
    //   _id: "69418d6fe26e59beb8c3c68d",
    //   name: "carrots",
    //   category: "veggie",
    //   quantity: 2,
    //   __v: 0,
    // };

    expect(response.status).toBe(200);
    expect(newestEntry).include(postTestData);

    // expect(body).not.toEqual([]);
  });
});

// Update

// Delete
