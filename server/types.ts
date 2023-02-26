export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Note = {
  id: string;
  title: string;
  text: string;
  pinned: boolean;
};
