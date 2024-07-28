import { createContext, useState, ReactNode } from "react";
import { ToDoItemInterface, ToDoContextProps } from "../types/ToDoItemType";

const defaultToDos: ToDoItemInterface[] = [
  {
    _id: "1",
    title: "Sample Title 1",
    description:
      "This is a sample description. It can be very long, exceeding 100 characters, so that we can test the read more and read less functionality properly.",
    status: "in-progress",
  },
  {
    _id: "2",
    title: "Sample Title 2",
    description:
      "This is a sample description. It can be very long, exceeding 100 characters, so that we can test the read more and read less functionality properly.",
    status: "in-progress",
  },
  {
    _id: "3",
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
      { _id: Date.now().toString(), title, description, status: "in-progress" },
    ]);
  };

  const editToDoStatus = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id
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
    id: string,
    title: string,
    description: string,
    status: "in-progress" | "completed"
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, title, description, status } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
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

  const changeSelectedTask = (data: ToDoItemInterface): void => {
    console.log("DAFAFDAFDASFAD", data);

    setSelectedTask(data);
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
        changeSelectedTask,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
