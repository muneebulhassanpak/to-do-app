import React from "react";
import { ToDoProvider } from "./contexts/AppContext"; // Adjust the import path accordingly
import ToDoAppContainer from "./components/to-do-app-container/ToDoAppContainer";

const App: React.FC = () => {
  return (
    <ToDoProvider>
      <section className="bg-black min-h-screen">
        <ToDoAppContainer />
      </section>
    </ToDoProvider>
  );
};

export default App;
