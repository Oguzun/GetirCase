import React from "react";
import { Box, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Lock from "../../assets/Bag.png";

const BasketSummary = () => {
  const totalPrice = useSelector((state) => state.Shopping.totalPrice);

  return (
    <Box display="flex" p={2} bgcolor="primary.light">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={3}>
          <img src={Lock} alt="Lock" height="20" width="20" />
        </Grid>
        <Grid item xs={1}>
          ₺
        </Grid>
        <Grid item xs={3}>
          {Math.abs(totalPrice.toFixed(2))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasketSummary;
