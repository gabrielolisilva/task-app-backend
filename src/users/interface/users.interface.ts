export interface IUsersData {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  team_id?: string;
  createdAt: Date;
  updatedAt: Date;
}
