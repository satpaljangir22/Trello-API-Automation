import { z } from "zod";

const NewUser = z.object({
  name: z.string(),
  job: z.string(),
  id: z.string(),
  createdAt: z.string(),
});

const Support = z.object({
  url: z.string(),
  text: z.string(),
});

const Data = z.object({
  id: z.number(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string(),
});

const User = z.object({
  data: Data,
  support: Support,
});

const AllUsers = z.object({
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  total_pages: z.number(),
  data: z.array(Data),
});

const ResourceData = z.object({
  id: z.number(),
  name: z.string(),
  year: z.number(),
  color: z.string(),
  pantone_value: z.string(),
});

const SingleResource = z.object({
  data: ResourceData,
  support: Support,
});

const AllResources = z.object({
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  total_pages: z.number(),
  data: z.array(ResourceData),
  support: Support,
});

function validateResponseSchema<T>(schema: z.ZodType<T>, response: unknown): T {
  try {
    const parsedResponse = schema.parse(response);
    return parsedResponse;
  } catch (error) {
    throw error;
  }
}

const schemas = {
  newUserSchema: NewUser,
  userSchema: User,
  allUsersSchema: AllUsers,
  singleResourceSchema: SingleResource,
  allResourcesSchema: AllResources,
};

export { schemas, validateResponseSchema };
