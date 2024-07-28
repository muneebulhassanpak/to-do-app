import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { ToDoContext } from "../../../contexts/AppContext";
import { ToDoItemInterface } from "../../../types/ToDoItemType";

interface CreateToDoProps {
  edit?: boolean;
  task?: ToDoItemInterface;
}

const DialogTitleWithClose = styled(DialogTitle)(({}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const CreateToDo: React.FC<CreateToDoProps> = ({ edit = false, task }) => {
  const context = useContext(ToDoContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (edit && task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [edit, task]);

  const handleClose = () => {
    if (edit) {
      context?.changeEditDialogState(false);
    } else {
      context?.changeCreateDialogState(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (edit && task) {
      context?.editTodo(task.id, title, description, task.status);
    } else {
      context?.addTodo(title, description);
    }
    handleClose();
  };

  return (
    <Dialog
      open={
        edit
          ? context?.openEditDialog || false
          : context?.openCreateDialog || false
      }
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitleWithClose>
        {edit ? "Edit Task" : "Create New Task"}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitleWithClose>
      <DialogContent>
        <DialogContentText>
          {edit
            ? "To edit this item, please update the title and description here."
            : "To create a new item, please enter the title and description here."}
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "red" }}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#6C946F", color: "white" }}
        >
          {edit ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateToDo;
