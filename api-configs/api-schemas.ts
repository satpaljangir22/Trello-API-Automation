import { z } from "zod";

// Schema for creating a new user
const NewUserSchema = z.object({
  name: z.string(),
  job: z.string(),
  id: z.string(),
  createdAt: z.string(),
});

// Schema for support information
const SupportSchema = z.object({
  url: z.string(),
  text: z.string(),
});

// Schema for user data
const DataSchema = z.object({
  id: z.number(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string(),
});

// Schema for a single user
const UserSchema = z.object({
  data: DataSchema,
  support: SupportSchema,
});

// Common schema for pagination metadata
const PaginationSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  total_pages: z.number(),
});

// Schema for all users
const AllUsersSchema = PaginationSchema.extend({
  data: z.array(DataSchema),
});

// Schema for resource data
const ResourceDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  year: z.number(),
  color: z.string(),
  pantone_value: z.string(),
});

// Schema for a single resource
const SingleResourceSchema = z.object({
  data: ResourceDataSchema,
  support: SupportSchema,
});

// Schema for all resources
const AllResourcesSchema = PaginationSchema.extend({
  data: z.array(ResourceDataSchema),
  support: SupportSchema,
});

// Export schemas as an object
export const schemas = {
  NewUserSchema,
  UserSchema,
  AllUsersSchema,
  SingleResourceSchema,
  AllResourcesSchema,
};

// Export individual schemas for flexibility
export {
  NewUserSchema,
  UserSchema,
  AllUsersSchema,
  SingleResourceSchema,
  AllResourcesSchema,
};

// Export inferred types
export type NewUser = z.infer<typeof NewUserSchema>;
export type User = z.infer<typeof UserSchema>;
export type AllUsers = z.infer<typeof AllUsersSchema>;
export type SingleResource = z.infer<typeof SingleResourceSchema>;
export type AllResources = z.infer<typeof AllResourcesSchema>;
