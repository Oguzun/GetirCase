import React, { useState, Fragment } from "react";
import {
  Container,
  Radio,
  RadioGroup,
  FormControl,
  Typography,
  FormControlLabel,
  Paper,
  Box,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { shoppingActions } from "../../store/slices/shoppingSlice";
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
 
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Sorter() {
  const [value, setValue] = useState("SortItemsAscendingByPrice");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setValue(event.target.value);
    dispatch(shoppingActions.SetSortingOption(event.target.value));
    setOpen(true);
    setMessage("Sorting automatically applied");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <Fragment>
      <Hidden only={["sm", "xs"]}>
        <Typography variant="caption" align="left" display="block">
          Sorting
        </Typography>
      </Hidden>
      <Box mb={1}></Box>
      <Paper variant="outlined">
        <Container>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="sortingopts"
              name="sortingopts"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="SortItemsAscendingByPrice"
                control={<Radio />}
                label="Price low to high"
              />
              <FormControlLabel
                value="SortItemsDescendingByPrice"
                control={<Radio />}
                label="Price high to low"
              />
              <FormControlLabel
                value="SortItemsDescendingByDate"
                control={<Radio />}
                label="New to old"
              />
              <FormControlLabel
                value="SortItemsAscendingByDate"
                control={<Radio />}
                label="Old to new"
              />
            </RadioGroup>
          </FormControl>
        </Container>
      </Paper>
      <Hidden only={["lg", "xl"]}>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            {message}
          </Alert>
        </Snackbar>
      </Hidden>
    </Fragment>
  );
}
