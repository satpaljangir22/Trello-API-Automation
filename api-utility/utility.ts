import { ZodType, ZodError } from "zod";
import { APIResponse } from "@playwright/test";

const schemaValidatedResponse = function <T>(
  schema: ZodType<T>,
  response: unknown
): T {
  try {
    return schema.parse(response) as T;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Schema validation errors:", error.errors);
      throw new Error(
        `Schema validation failed: ${JSON.stringify(error.errors)}`
      );
    }
    throw new Error(`Unexpected error during schema validation: ${error}`);
  }
};

const handleApiError = async function (
  apiResponse: APIResponse
): Promise<void> {
  if (!apiResponse.ok()) {
    const responseBody = await apiResponse.text();
    console.error(
      `API Error: ${apiResponse.status()} - ${apiResponse.statusText()}\nResponse Body: ${responseBody}`
    );
    throw new Error(
      `Request failed with status ${apiResponse.status()} - ${apiResponse.statusText()}`
    );
  }
};

export { schemaValidatedResponse, handleApiError };
