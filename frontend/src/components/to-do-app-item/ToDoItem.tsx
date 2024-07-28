import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { InfoCardProps } from "../../types/ToDoItemType";
import DeleteDialog from "../popups/create-to-do-popup/DeleteDialog";
import { ToDoContext } from "../../contexts/AppContext";
import CreateToDo from "../popups/create-to-do-popup/CreateToDo";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "purple",
  color: "white",
  borderRadius: "16px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  paddingTop: "3rem",
  position: "relative",
  minWidth: "200px",
  width: "32%",

  [theme.breakpoints.down("lg")]: {
    width: "48%",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const DescriptionText = styled(Typography)(({}) => ({
  marginBottom: "10px",
}));

const ReadMoreButton = styled(Button)(({}) => ({
  color: "white",
  textTransform: "none",
}));

const TopRightButton = styled(Button)(({}) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  color: "black",
  backgroundColor: "#36BA98",
  borderColor: "white",
}));

const BottomRightIcons = styled("div")(({}) => ({
  position: "absolute",
  bottom: "10px",
  right: "10px",
  display: "flex",
  gap: "10px",
}));

const InfoCard: React.FC<InfoCardProps> = ({
  id,
  title,
  description,
  status,
  updateToDoStatus,
  deleteToDo,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openWarningDialog, setWarningDialog] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const context = useContext(ToDoContext);

  return (
    <>
      <StyledCard>
        <TopRightButton
          variant="contained"
          onClick={() => {
            updateToDoStatus(id);
          }}
        >
          {status === "in-progress" ? "Mark as Complete" : "Completed"}
        </TopRightButton>
        <CardContent>
          <Typography variant="h5" component="div" className="text-center">
            {title}
          </Typography>
          <DescriptionText variant="body2">
            {isExpanded ? description : `${description.substring(0, 100)}...`}
          </DescriptionText>
          {description.length > 100 && (
            <ReadMoreButton onClick={handleToggle}>
              {isExpanded ? "Read less" : "Read more"}
            </ReadMoreButton>
          )}
          <BottomRightIcons>
            <IconButton
              onClick={() => {
                if (context) {
                  context.changeEditDialogState(true);
                  context.setSelectedTask({ id, title, description, status });
                }
              }}
              className="cursor-pointer"
            >
              <EditIcon style={{ color: "white" }} />
            </IconButton>
            <div className="rounded-full bg-white">
              <IconButton
                onClick={() => {
                  setWarningDialog(true);
                }}
                className="cursor-pointer"
              >
                <DeleteIcon style={{ color: "#E4003A" }} />
              </IconButton>
            </div>
          </BottomRightIcons>
        </CardContent>
      </StyledCard>
      {openWarningDialog && (
        <DeleteDialog
          open={openWarningDialog}
          handleClose={() => {
            setWarningDialog(false);
          }}
          handleDelete={() => {
            deleteToDo(id);
          }}
        />
      )}
      {context?.openEditDialog && (
        <CreateToDo edit={true} task={context?.selectedTask} />
      )}
    </>
  );
};

export default InfoCard;
