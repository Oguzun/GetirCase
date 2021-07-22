import React, { Fragment, useEffect } from "react";
import BasketItem from "./BasketItem";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { useSelector } from "react-redux";

const Basket = () => {
  const addedItems = useSelector((state) => state.Shopping.addedItems);
  const totalPrice = useSelector((state) => state.Shopping.totalPrice);
  if (addedItems.length === 0) {
    return (
      <Card
        variant="outlined"
        style={{ borderColor: "#1EA4CE", borderWidth: "6px" }}
      >
        <CardContent>
          <Typography align="center" variant="body1" color="primary">
            Your basket is empty
          </Typography>
          <Typography align="center" variant="body1" color="primary">
            Add product(s) to your basket to place an order.
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card
        variant="outlined"
        style={{ borderColor: "#1EA4CE", borderWidth: "6px" }}
      >
        <CardContent>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            xs={12}
            xl={12}
            sm={12}
          >
            {addedItems.length > 0
              ? addedItems.map((item, i) => {
                  return (
                    <Fragment>
                      <BasketItem key={i} item={item}></BasketItem>
                      <Divider style={{ width: "100%" }} />
                      <Box mb={2}></Box>
                    </Fragment>
                  );
                })
              : null}
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Box mb={1} border={2} p={1} borderColor="secondary.main">
            <Typography
              align="right"
              variant="body1"
              color="secondary"
            >
              ₺ {totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    );
  }
};

export default Basket;
