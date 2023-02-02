export interface TodoData {
  uuid: string;
  title: string;
  done: boolean;
  userId: string;
  createtAt: number;
  updatetAt: number;
}

export interface Todo {
  status: "success" | "error";
  data: TodoData[];
}
