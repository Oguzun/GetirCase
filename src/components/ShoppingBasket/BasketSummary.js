import React from "react";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import Lock from "../../assets/Bag.png";

const BasketSummary = () => {
  const totalPrice = useSelector((state) => state.Shopping.totalPrice);

  return (
    <Box display="flex" justifyContent="center" p={2} bgcolor="primary.light">
      <Box p={1}>
      <img src={Lock} alt="Lock" height="24" width="24" />
      </Box>
      <Box p={1}>₺ {totalPrice.toFixed(2)}</Box>
    </Box>
  );
};

export default BasketSummary;
