import { test, expect } from "../api-fixtures/api-client-fixture";
import { endpoints } from "../api-fixtures/endpoints";
import {
  User,
  NewUser,
  AllResources,
  SingleResource,
} from "../api-fixtures/response-interfaces";

test("create a new user", async ({ apiClient }) => {
  const user_details = { name: "Satpal", job: "QA" };
  const response = await apiClient.post(endpoints.createUser(), user_details);
  expect(response.ok()).toBeTruthy();
  const newUser: NewUser = await response.json();
  expect(parseInt(newUser.id)).toBeTruthy();
});

test("verify a single user", async ({ apiClient }) => {
  const user_id = 2;
  const response = await apiClient.get(endpoints.singleUser(user_id));
  expect(response.ok()).toBeTruthy();
  const user: User = await response.json();
  expect(user.data.id).toBe(user_id);
});

test("list users on a page", async ({ apiClient }) => {
  const response = await apiClient.get(endpoints.listUsers(2));
  expect(response.ok()).toBeTruthy();
});

test("single user not found", async ({ apiClient }) => {
  const user_id = 23;
  const response = await apiClient.get(endpoints.singleUser(user_id));
  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body).toEqual({});
});

test("get list of all resources", async ({ apiClient }) => {
  const response = await apiClient.get(endpoints.listResources());
  expect(response.ok()).toBeTruthy();
  const allResources: AllResources = await response.json();
  expect(allResources.data).toHaveLength(6);
});

test("get a single resources", async ({ apiClient }) => {
  const resources_id = 2;
  const response = await apiClient.get(endpoints.singleResource(resources_id));
  expect(response.ok()).toBeTruthy();
  const singleResource: SingleResource = await response.json();
  expect(singleResource.data.id).toBe(resources_id);
});
