export interface ITask {
  _id?: string;
  title: string;
  description: string;
  status: string;
  attachment?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}