export interface ToDoItemInterface {
  id: number;
  title: string;
  description: string;
  status: "in-progress" | "completed";
}

export interface InfoCardProps {
  id: number;
  title: string;
  description: string;
  status: "in-progress" | "completed";
  updateToDoStatus: (id: number) => void;
  deleteToDo: (id: number) => void;
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
  editToDoStatus: (id: number) => void;
  editTodo: (
    id: number,
    title: string,
    description: string,
    status: "in-progress" | "completed"
  ) => void;
  deleteTodo: (id: number) => void;
  openCreateDialog: boolean;
  openEditDialog: boolean;
  openDeleteDialog: boolean;
  changeCreateDialogState: (state: boolean) => void;
  changeEditDialogState: (state: boolean) => void;
  changeDeleteDialogState: (state: boolean) => void;
  selectedTask: ToDoItemInterface | undefined;
  setSelectedTask: (task: ToDoItemInterface | undefined) => void;
}
