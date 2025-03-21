interface User {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  support: {
    url: string;
    text: string;
  };
}

interface NewUser {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

export { User, NewUser };
