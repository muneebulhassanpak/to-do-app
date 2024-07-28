import { useState } from "react";
import { useGetTodos } from "../Api";
import SearchInput from "../to-do-app-header/SearchToDo";
import InfoCard from "../to-do-app-item/ToDoItem";
import { ToDoContext } from "../../contexts/AppContext";
import { useContext } from "react";

const ToDoAppItems = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: todos, isLoading, error } = useGetTodos(searchTerm);

  const appContext = useContext(ToDoContext);

  const updateToDoStatus = (id: string) => {
    appContext?.editToDoStatus(id);
  };

  const deleteToDo = (id: string) => {
    appContext?.deleteTodo(id);
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center flex-wrap mt-10">
        {todos &&
          todos.map((item) => (
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
    </div>
  );
};

export default ToDoAppItems;
