import React from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import { Typography, Grid, Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { shoppingActions } from "../../store/slices/shoppingSlice";
import { withStyles } from "@material-ui/core/styles";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const BasketItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddIcon = (item) => {
    dispatch(shoppingActions.AddItemFromBasket(item));
  };

  const handleRemoveIcon = (item) => {
    dispatch(shoppingActions.RemoveItemFromBasket(item));
  };

  const itemTotalPrice = item.price * item.amount;

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box mb={2}></Box>

      <Grid item xs={6}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textPrimary" component="h2">
              {item.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" component="h2">
              ₺ {Math.abs(itemTotalPrice.toFixed(2))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          color="secondary"
          aria-label="remove item"
          size="small"
          onClick={() => handleRemoveIcon(item)}
        >
          <RemoveIcon />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <Box
          width={1}
          bgcolor="primary.main"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <WhiteTextTypography variant="h5">{item.amount}</WhiteTextTypography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          color="secondary"
          aria-label="add item"
          size="small"
          onClick={() => handleAddIcon(item)}
        >
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default BasketItem;
