import { useState, useContext, useEffect } from "react";
import InfoCard from "../to-do-app-item/ToDoItem";
import { ToDoContext } from "../../contexts/AppContext";
import { ToDoItemInterface } from "../../types/ToDoItemType";

function ToDoAppItems() {
  const [todos, setToDos] = useState<ToDoItemInterface[]>([]);
  //Context
  const appContext = useContext(ToDoContext);

  useEffect(() => {
    if (appContext?.todos) {
      setToDos(appContext.todos);
    }
  }, [appContext?.todos]);

  const updateToDoStatus = (id: number) => {
    appContext?.editToDoStatus(id);
  };

  const deleteToDo = (id: number) => {
    appContext?.deleteTodo(id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between items-center flex-wrap mt-10">
      {todos.map((item) => (
        <InfoCard
          key={item.id} // Ensure each item has a unique key
          id={item.id}
          title={item.title}
          description={item.description}
          status={item.status}
          updateToDoStatus={() => updateToDoStatus(item.id)} // Pass the update function
          deleteToDo={() => deleteToDo(item.id)} // Pass the delete function
        />
      ))}
    </div>
  );
}

export default ToDoAppItems;
