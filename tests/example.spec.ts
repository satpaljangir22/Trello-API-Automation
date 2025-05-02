import { test, expect } from "../api-configs/api-request-fixture";
import { endpoints } from "../api-configs/api-endpoints";
import { schemas } from "../api-configs/api-schemas";

test("should create a new user successfully", async ({ apiClient }) => {
  const user_details = { name: "Satpal", job: "QA" };
  const response = await apiClient.post(
    endpoints.users,
    schemas.NewUserSchema,
    user_details
  );
  expect(parseInt(response.id)).toBeTruthy();
});

test(" should return details of a single user", async ({ apiClient }) => {
  const user_id = 2;
  const response = await apiClient.get(
    endpoints.users + `/${user_id}`,
    schemas.UserSchema
  );
  expect(response.data.id).toBe(user_id);
});

test("should return a paginated list of users", async ({ apiClient }) => {
  const params = { page: 2 };
  const response = await apiClient.get(
    endpoints.users,
    schemas.AllUsersSchema,
    params
  );
  expect(response.page).toBe(params.page);
});

test("should return empty object for a non-existing user", async ({
  request,
}) => {
  const user_id = 23;
  const response = await request.get(endpoints.users + `/${user_id}`, {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  });
  const responseData = await response.json();
  expect(responseData).toEqual({});
});

test("should return a list of all resources", async ({ apiClient }) => {
  const response = await apiClient.get(
    endpoints.unknown,
    schemas.AllResourcesSchema
  );
  expect(response.data).toHaveLength(6);
});

test("should return details of a single resource", async ({ apiClient }) => {
  const resources_id = 2;
  const response = await apiClient.get(
    endpoints.unknown + `/${resources_id}`,
    schemas.SingleResourceSchema
  );
  expect(response.data.id).toBe(resources_id);
});

test("should return empty object for non-existing resource", async ({
  request,
}) => {
  const nonExistingResource = 23;
  const response = await request.get(
    endpoints.unknown + `/${nonExistingResource}`,
    {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    }
  );
  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body).toEqual({});
});

test("should update details of a user", async ({ request }) => {
  const user_id = 2;
  const user = {
    name: "morpheus",
    job: "zion resident",
  };
  const response = await request.put(`${endpoints.users}/${user_id}`, {
    data: user,
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  });
  expect(response.ok()).toBeTruthy();
  const body: { name: string; job: string; updatedAt: string } =
    await response.json();
  expect(body.updatedAt).toBeTruthy();
});
