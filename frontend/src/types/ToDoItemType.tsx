export interface ToDoItemInterface {
  _id: string;
  title: string;
  description: string;
  status: "in-progress" | "completed";
}

export interface InfoCardProps {
  _id: string;
  title: string;
  description: string;
  status: "in-progress" | "completed";
  updateToDoStatus: (id: string) => void;
  deleteToDo: (id: string) => void;
}

export interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

export interface CreateDialogProps {
  open: boolean;
  handleClose: () => void;
  handleCreate: () => void;
}

export interface ToDoContextProps {
  todos: ToDoItemInterface[];
  addTodo: (title: string, description: string) => void;
  editToDoStatus: (id: string) => void;
  editTodo: (
    id: string,
    title: string,
    description: string,
    status: "in-progress" | "completed"
  ) => void;
  deleteTodo: (id: string) => void;
  openCreateDialog: boolean;
  openEditDialog: boolean;
  openDeleteDialog: boolean;
  changeCreateDialogState: (state: boolean) => void;
  changeEditDialogState: (state: boolean) => void;
  changeDeleteDialogState: (state: boolean) => void;
  selectedTask: ToDoItemInterface | undefined;
  changeSelectedTask: (task: ToDoItemInterface) => void;
}
