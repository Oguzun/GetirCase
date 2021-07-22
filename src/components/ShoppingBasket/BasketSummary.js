import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useSelector } from "react-redux";

const BasketSummary = () => {
  const totalPrice = useSelector((state) => state.Shopping.totalPrice);

  return (
    <Box display="flex" justifyContent="space-between" p={2} bgcolor="primary.light">
      <Box p={1}>
      <ShoppingBasketIcon  fontSize="small"/>  ₺ {totalPrice.toFixed(2)} 
      </Box>
    </Box>
  );
};

export default BasketSummary;
