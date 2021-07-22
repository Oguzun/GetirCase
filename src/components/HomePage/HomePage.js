import { Grid, Container, Box } from "@material-ui/core";
import FilterBar from "../Filter/FilterBar";
import Sorter from "../Sorter/Sorter";
import ProductSection from "../Products/ProductSection";
import { fetchItems, fetchCompanies } from "../../store/slices/shoppingSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Basket from "../ShoppingBasket/Basket";
import Footer from "../Layout/Footer";

export default function HomePage() {
  const items = useSelector((state) => state.Shopping.items);
  const brands = useSelector((state) => state.Shopping.brands);
  const loading = useSelector((state) => state.Shopping.loading);
  const tags = useSelector((state) => state.Shopping.tags);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);


  useEffect(() => {
    dispatch(fetchCompanies());
  }, [items]);

  
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
        <Grid item xs={12} sm={6} xl={3}>
          <Grid item xs={12} sm={6} xl={10}>
            <Sorter></Sorter>
          </Grid>
          <Box mb={4}></Box>
          <Grid item xs={12} sm={6} xl={10}>
            <FilterBar HeaderText="Brands" data={brands} Total={items.length} />
          </Grid>
          <Box mb={4}></Box>
          <Grid item xs={12} sm={6} xl={10}>
            <FilterBar HeaderText="Tags" data={tags} Total={items.length} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} xl={5}>
          <ProductSection loading={loading} />
        </Grid>
        <Grid item xs={12} sm={6} xl={2}>
          <Basket />
        </Grid>
      </Grid>
      <Footer/>
    </Container>
  );
}
