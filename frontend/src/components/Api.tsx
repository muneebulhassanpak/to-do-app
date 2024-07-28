import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const api = axios.create({
  baseURL: "http://localhost:8080/api/task",
});

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: "in-progress" | "completed";
}

// API functions
export const createTodo = async (data: {
  title: string;
  description: string;
}): Promise<Todo> => {
  const response = await api.post("/create-new-todo", data);
  return response.data;
};

export const editTodoBody = async (data: {
  _id: string;
  title: string;
  description: string;
}): Promise<Todo> => {
  const response = await api.patch(`/edit-todo-body/${data._id}`, {
    title: data.title,
    description: data.description,
  });
  return response.data;
};

export const deleteTodo = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/delete-todo/${id}`);
  return response.data;
};

export const editTodoStatus = async (data: {
  _id: string;
  status: "in-progress" | "completed";
}): Promise<Todo> => {
  const response = await api.put(`/edit-todo-status/${data._id}`, {
    status: data.status,
  });
  return response.data;
};

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get("/get-todos");
  return response.data;
};

// React Query hooks
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, { title: string; description: string }>({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useEditTodoBody = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Todo,
    Error,
    { _id: string; title: string; description: string }
  >({
    mutationFn: editTodoBody,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useEditTodoStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Todo,
    Error,
    { _id: string; status: "in-progress" | "completed" }
  >({
    mutationFn: editTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useGetTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};
