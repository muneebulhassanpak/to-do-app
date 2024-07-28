import CreateNewButton from "../utils/buttons/Buttons";
import SearchInput from "./SearchToDo";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row gap-4  justify-between items-center py-5 ">
      <div className="left">
        <h2 className="text-2xl font-semibold text-white dark:text-white">
          Algo ToDo App
        </h2>
      </div>
      <div className="right flex flex-col-reverse sm:flex-row gap-4">
        <SearchInput />
        <CreateNewButton />
      </div>
    </header>
  );
};

export default Header;
