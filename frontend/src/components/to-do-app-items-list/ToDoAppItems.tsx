import { useContext } from "react";
import InfoCard from "../to-do-app-item/ToDoItem";
import { ToDoContext } from "../../contexts/AppContext";
import { useGetTodos } from "../Api";

function ToDoAppItems() {
  // Fetch todos using the custom hook
  const { data: todos, isLoading, error } = useGetTodos();

  // Context
  const appContext = useContext(ToDoContext);

  const updateToDoStatus = (id: string) => {
    appContext?.editToDoStatus(id);
  };

  const deleteToDo = (id: string) => {
    appContext?.deleteTodo(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between items-center flex-wrap mt-10">
      {todos &&
        todos?.map((item) => (
          <InfoCard
            key={item._id} // Ensure each item has a unique key
            _id={item._id}
            title={item.title}
            description={item.description}
            status={item.status}
            updateToDoStatus={() => updateToDoStatus(item._id)} // Pass the update function
            deleteToDo={() => deleteToDo(item._id)} // Pass the delete function
          />
        ))}
    </div>
  );
}

export default ToDoAppItems;
