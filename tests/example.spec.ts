import { test, expect } from "@playwright/test";
import { endpoints } from "../api-configs/api-endpoints";
import {
  User,
  NewUser,
  AllResources,
  SingleResource,
  AllUsers,
} from "../api-configs/api-responses";

test("create a new user", async ({ request }) => {
  const user_details = { name: "Satpal", job: "QA" };
  const response = await request.post(endpoints.users, { data: user_details });
  expect(response.ok()).toBeTruthy();
  const newUser: NewUser = await response.json();
  expect(parseInt(newUser.id)).toBeTruthy();
});

test("verify a single user", async ({ request }) => {
  const user_id = 2;
  const response = await request.get(endpoints.users + `/${user_id}`);
  expect(response.ok()).toBeTruthy();
  const user: User = await response.json();
  expect(user.data.id).toBe(user_id);
});

test("list users on a page", async ({ request }) => {
  const params = { page: 2 };
  const response = await request.get(endpoints.users, { params: params });
  expect(response.ok()).toBeTruthy();
  const body: AllUsers = await response.json();
  expect(body.page).toBe(params.page);
});

test("single user not found", async ({ request }) => {
  const user_id = 23;
  const response = await request.get(endpoints.users + `/${user_id}`);
  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body).toEqual({});
});

test("get list of all resources", async ({ request }) => {
  const response = await request.get(endpoints.unknown);
  expect(response.ok()).toBeTruthy();
  const allResources: AllResources = await response.json();
  expect(allResources.data).toHaveLength(6);
});

test("get a single resources", async ({ request }) => {
  const resources_id = 2;
  const response = await request.get(endpoints.unknown + `/${resources_id}`);
  expect(response.ok()).toBeTruthy();
  const singleResource: SingleResource = await response.json();
  expect(singleResource.data.id).toBe(resources_id);
});

test("single resources not found", async ({ request }) => {
  const nonExistingResource = 23;
  const response = await request.get(
    endpoints.unknown + `/${nonExistingResource}`
  );
  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body).toEqual({});
});

test("update a user", async ({ request }) => {
  const user_id = 2;
  const user = {
    name: "morpheus",
    job: "zion resident",
  };
  const response = await request.put(`${endpoints.users}/${user_id}`, {
    data: user,
  });
  expect(response.ok()).toBeTruthy();
  const body: { name: string; job: string; updatedAt: string } =
    await response.json();
  expect(body.updatedAt).toBeTruthy();
});
