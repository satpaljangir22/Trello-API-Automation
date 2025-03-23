interface Support {
  url: string;
  text: string;
}

interface Data {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface User {
  data: Data;
  support: Support;
}

interface NewUser {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

interface AllUsers {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data[];
}

interface ResourceData {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface SingleResource {
  data: ResourceData;
  support: Support;
}

interface AllResources {
  page: number;
  per_page: number;
  total: number;
  total_page: number;
  data: ResourceData[];
  support: Support;
}

export { User, NewUser, AllUsers, AllResources, SingleResource };
