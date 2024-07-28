import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteDialogProps } from "../../../types/ToDoItemType";

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  handleClose,
  handleDelete,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleDelete();
          handleClose();
        },
      }}
    >
      <DialogTitle>
        Confirm Deletion
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "red" }}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "red", color: "white" }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
