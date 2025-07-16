export type User = {
  id: string;
  email: string;
  name: string;
  icon?: string;
  blockedUsers: string[];
  likedMapIds: string[];
};
