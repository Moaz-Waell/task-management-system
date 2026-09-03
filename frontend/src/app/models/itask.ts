export interface ITask {
  _id?: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  user?: string;
  attachment?: string;
   createdAt?: string;
}
