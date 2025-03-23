interface Support {
  url: string;
  text: string;
}

interface User {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  support: Support;
}

interface NewUser {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

interface Data {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface SingleResource {
  data: Data;
  support: Support;
}

interface AllResources {
  page: number;
  per_page: number;
  total: number;
  total_page: number;
  data: Data[];
  support: Support;
}

export { User, NewUser, AllResources, SingleResource };
