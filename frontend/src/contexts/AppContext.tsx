import { createContext, useState, ReactNode } from "react";
import { ToDoItemInterface, ToDoContextProps } from "../types/ToDoItemType";

const defaultToDos: ToDoItemInterface[] = [
  {
    id: 1,
    title: "Sample Title 1",
    description:
      "This is a sample description. It can be very long, exceeding 100 characters, so that we can test the read more and read less functionality properly.",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Sample Title 2",
    description:
      "This is a sample description. It can be very long, exceeding 100 characters, so that we can test the read more and read less functionality properly.",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Sample Title 3",
    description:
      "This is a sample description. It can be very long, exceeding 100 characters, so that we can test the read more and read less functionality properly.",
    status: "in-progress",
  },
];

export const ToDoContext = createContext<ToDoContextProps | undefined>(
  undefined
);

export const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<ToDoItemInterface[]>(defaultToDos);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<
    ToDoItemInterface | undefined
  >(undefined);

  const addTodo = (title: string, description: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), title, description, status: "in-progress" },
    ]);
  };

  const editToDoStatus = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status:
                todo.status === "in-progress" ? "completed" : "in-progress",
            }
          : todo
      )
    );
  };

  const editTodo = (
    id: number,
    title: string,
    description: string,
    status: "in-progress" | "completed"
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title, description, status } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const changeCreateDialogState = (state: boolean) => {
    setOpenCreateDialog(state);
  };

  const changeEditDialogState = (state: boolean) => {
    setOpenEditDialog(state);
  };

  const changeDeleteDialogState = (state: boolean) => {
    setOpenDeleteDialog(state);
  };

  return (
    <ToDoContext.Provider
      value={{
        todos,
        addTodo,
        editToDoStatus,
        editTodo,
        deleteTodo,
        openCreateDialog,
        openEditDialog,
        openDeleteDialog,
        changeCreateDialogState,
        changeEditDialogState,
        changeDeleteDialogState,
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
