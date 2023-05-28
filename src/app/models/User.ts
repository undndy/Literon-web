import {Task} from './Task';

export interface User{
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  email: string;
  tasks: Task[];
  role: string[];
}
