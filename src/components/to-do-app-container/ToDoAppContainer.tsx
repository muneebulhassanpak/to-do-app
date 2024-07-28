import Header from "../to-do-app-header/Header";
import ToDoAppItems from "../to-do-app-items-list/ToDoAppItems";

const ToDoAppContainer = () => {
  return (
    <div className="max-w-7xl mx-auto px-3">
      <Header />
      <ToDoAppItems />
    </div>
  );
};

export default ToDoAppContainer;
