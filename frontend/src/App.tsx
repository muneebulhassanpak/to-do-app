import React from "react";
import { ToDoProvider } from "./contexts/AppContext";
import ToDoAppContainer from "./components/to-do-app-container/ToDoAppContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToDoProvider>
        <section className="bg-black min-h-screen">
          <ToDoAppContainer />
        </section>
      </ToDoProvider>
    </QueryClientProvider>
  );
};

export default App;
