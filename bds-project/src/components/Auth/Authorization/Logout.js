import React, { useContext } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "../../../context/snackbarContext";

function Logout() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const [snackBarStatus, setSnackBarStatus] = useContext(SnackBarContext);

  const handleLogout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          localStorage.clear(),
          setSnackBarStatus({
            msg: "Logout Successfully!",
            key: Math.random(),
          }),
          navigate(`/login`)
        );
      }, 1000);
    });
  };

  return (
    <>
      <Button onClick={handleClickOpen} sx={{ padding: 0 }}>
        <BiLogOutCircle size={24} className="logout-logo" />
        <Typography className="logout-typo">Logout</Typography>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title" sx={{ padding: "8px 12px" }}>
          BDS confirm
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingBottom: "5px" }}>
            Are you sure to logout?
          </DialogContentText>
          <DialogActions sx={{ padding: 0 }}>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleLogout} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Logout;
