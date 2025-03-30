import { test, expect } from "../api-configs/api-request-fixture";
import { endpoints } from "../api-configs/api-endpoints";
import { schemas } from "../api-configs/api-schemas";

test("create a new user", async ({ apiClient }) => {
  const user_details = { name: "Satpal", job: "QA" };
  const response = await apiClient.post(
    endpoints.users,
    schemas.newUserSchema,
    user_details
  );
  expect(parseInt(response.id)).toBeTruthy();
});

test("verify a single user", async ({ apiClient }) => {
  const user_id = 2;
  const response = await apiClient.get(
    endpoints.users + `/${user_id}`,
    schemas.userSchema
  );
  expect(response.data.id).toBe(user_id);
});

test("list users on a page", async ({ apiClient }) => {
  const params = { page: 2 };
  const response = await apiClient.get(
    endpoints.users,
    schemas.allUsersSchema,
    params
  );
  expect(response.page).toBe(params.page);
});

test("single user not found", async ({ request }) => {
  const user_id = 23;
  const response = await request.get(endpoints.users + `/${user_id}`);
  const responseData = await response.json();
  expect(responseData).toEqual({});
});

test("get list of all resources", async ({ apiClient }) => {
  const response = await apiClient.get(
    endpoints.unknown,
    schemas.allResourcesSchema
  );
  expect(response.data).toHaveLength(6);
});

test("get a single resources", async ({ apiClient }) => {
  const resources_id = 2;
  const response = await apiClient.get(
    endpoints.unknown + `/${resources_id}`,
    schemas.singleResourceSchema
  );
  expect(response.data.id).toBe(resources_id);
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
