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

const handleApiError = function (apiResponse: APIResponse): void {
  if (!apiResponse.ok()) {
    throw new Error(`Request failed with status ${apiResponse.status()}`);
  }
};

export { schemaValidatedResponse, handleApiError };
