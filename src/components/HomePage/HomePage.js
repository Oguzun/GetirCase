import { Grid, Container, Box, SwipeableDrawer } from "@material-ui/core";
import FilterBar from "../Filter/FilterBar";
import Sorter from "../Sorter/Sorter";
import ProductSection from "../Products/ProductSection";
import { fetchItems, fetchCompanies } from "../../store/slices/shoppingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Basket from "../ShoppingBasket/Basket";
import Footer from "../Layout/Footer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import ConcealableContainer from "../Layout/ConcealableContainer";
import { Button } from "@material-ui/core";
import FilterBarMobile from "../Filter/FilterBarMobile";
 

const useStyles = makeStyles((theme) => ({
  Concealablebutton: {
    margin: theme.spacing(2),
    float: "right",
  },
}));

export default function HomePage() {
  const items = useSelector((state) => state.Shopping.items);
  const brands = useSelector((state) => state.Shopping.brands);
  const loading = useSelector((state) => state.Shopping.loading);
  const tags = useSelector((state) => state.Shopping.tags);
  const totalPrice = useSelector((state) => state.Shopping.totalPrice);
  const [openDrawer, setOpenDrawer] = useState(false);
 
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  return (
    <Container maxWidth="xl">
      <Box mb={2}></Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
      >
        <Hidden only={["sm", "xs", "md"]}>
          <Grid item xs={12} sm={6} lg={3}>
            <Grid item xs={12} sm={6} lg={10}>
              <Sorter></Sorter>
            </Grid>
            <Box mb={4}></Box>
            <Grid item xs={12} sm={6} lg={10}>
              <FilterBar
                HeaderText="Brands"
                data={brands}
                Total={items.length}
              />
            </Grid>
            <Box mb={4}></Box>
            <Grid item xs={12} sm={6} lg={10}>
              <FilterBar HeaderText="Tags" data={tags} Total={items.length} />
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={12} md={8} lg={5}>
          <Hidden only={["md", "lg", "xl"]}>
            <FilterBarMobile brands={brands} items={items} tags={tags}/>
          </Hidden>
          <ProductSection loading={loading} />
        </Grid>
        <Hidden only={["sm", "xs"]}>
          <Grid item md={4} lg={2}>
            <Basket />
          </Grid>
        </Hidden>
        <Hidden only={["md", "lg", "xl"]}>
          <Grid item xs={12} md={4} lg={2}>
            <ConcealableContainer show>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.Concealablebutton}
                onClick={() => {
                  setOpenDrawer(true);
                }}
              >
                Go to Basket ₺ {Math.abs(totalPrice.toFixed(2))}
              </Button>
              <SwipeableDrawer
                anchor="right"
                open={openDrawer}
                onClose={() => {
                  setOpenDrawer(false);
                }}
                onOpen={() => {}}
              >
                <Basket />
              </SwipeableDrawer>
            </ConcealableContainer>
          </Grid>
        </Hidden>
      </Grid>
      <Footer />
    </Container>
  );
}
