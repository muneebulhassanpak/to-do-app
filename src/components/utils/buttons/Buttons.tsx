import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import { useContext } from "react";
import { ToDoContext } from "../../../contexts/AppContext";
import CreateToDo from "../../popups/create-to-do-popup/CreateToDo";

const RoundedButton = styled(Button)(({}) => ({
  borderRadius: "50px",
  backgroundColor: "#E88D67",
  color: "white",
  padding: "8px 20px",
  "&:hover": {
    backgroundColor: "purple",
  },
}));

function CreateNewButton() {
  const context = useContext(ToDoContext);
  return (
    <>
      <RoundedButton
        startIcon={<EditIcon />}
        variant="contained"
        onClick={() => {
          context?.changeCreateDialogState(true);
        }}
      >
        Create New
      </RoundedButton>
      {context?.openCreateDialog && <CreateToDo />}
    </>
  );
}

export default CreateNewButton;
