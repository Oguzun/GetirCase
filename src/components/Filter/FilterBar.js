import React, { Fragment, useState } from "react";
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
import { useDispatch } from "react-redux";
import { shoppingActions } from "../../store/slices/shoppingSlice";

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

  const [searchTerm, setsearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.Id);
    const newChecked = [...checked];
    const item = {
      ...value,
      index: value.Id,
    };

    if (currentIndex === -1) {
      newChecked.push(value.Id);
      dispatch(shoppingActions.AddFilter(item));
    } else {
      newChecked.splice(currentIndex, 1);
      dispatch(shoppingActions.RemoveFilter(item));
    }

    if (newChecked.length > 0) {
      var index = newChecked.indexOf(0);
      if (index !== -1) {
        newChecked.splice(index, 1);
      }
    } else {
      newChecked.push(0);
    }

    console.log(newChecked);

    setChecked(newChecked);
  };

  return (
    <Fragment>
      <Typography variant="caption" align="left" display="block">
        {HeaderText}
      </Typography>
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
    </Fragment>
  );
}
