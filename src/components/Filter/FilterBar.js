import React, { Fragment, useState ,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  TextField,
  Paper,
  Typography,
} from "@material-ui/core";
import { sc } from "../../utils/Common";
import { useDispatch ,useSelector} from "react-redux";
import { shoppingActions } from "../../store/slices/shoppingSlice";
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
 
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 160,
    overflow: "auto",
  },
}));

export default function FilterBar({ HeaderText, data }) {
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);
  
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const ActiveChipFilter = useSelector(
    (state) => state.Shopping.ActiveChipFilter
  );

  const [searchTerm, setsearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.Id);
    let newChecked = [...checked];

    if (value.Id === 0) {
      newChecked = [0];
    }

    if (currentIndex === -1) {
      newChecked.push(value.Id);
      dispatch(shoppingActions.AddFilter(value));
    } else {
      newChecked.splice(currentIndex, 1);
      dispatch(shoppingActions.RemoveFilter(value));
    }

    if (newChecked.length > 0) {
      var index = newChecked.indexOf(0);
      if (index !== -1) {
        newChecked.splice(index, 1);
      }
    } else {
      newChecked.push(0);
    }

    setChecked(newChecked);

    setOpen(true);
    setMessage("Filters automatically applied");
  };

  useEffect(() => {
    setChecked([0]);
  }, [ActiveChipFilter]);

 

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

 

  return (
    <Fragment>
      <Hidden only={["sm", "xs"]}>
        <Typography variant="caption" align="left" display="block">
          {HeaderText}
        </Typography>
      </Hidden>
      <Box mb={1}></Box>
      <Paper variant="outlined">
        <Box mb={2}></Box>
        <Container>
          <TextField
            label={`Search ${HeaderText}`}
            variant="outlined"
            fullWidth={true}
            onChange={(event) => {
              setsearchTerm(event.target.value);
            }}
          />
          <List className={classes.root}>
            {data
              .filter((item) => sc(item.Name, searchTerm))
              .map((value, i) => {
                return (
                  <ListItem
                    key={i}
                    dense
                    button
                    onClick={handleToggle(value, value.Id)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value.Id) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      id={i}
                      primary={`${value.Name} ( ${value.Count} )`}
                    />
                  </ListItem>
                );
              })}
          </List>
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
