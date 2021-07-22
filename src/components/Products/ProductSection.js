import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ProductCard from "./ProductCard";
import CustomPagination from "../Layout/CustomPagination";
import { Box, Typography, Chip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { shoppingActions } from "../../store/slices/shoppingSlice";

const ProductSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(16);
  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  const items = useSelector((state) => state.Shopping.filteredItems);
  const itemTypes = useSelector((state) => state.Shopping.itemTypes);
  const dispatch = useDispatch();

  const currentItems = items.slice(indexofFirstItem, indexofLastItem);

  const paginate = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChipClick = (payload) => {
    dispatch(shoppingActions.SetActiveChipFilter(payload));
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} xl={12}>
        <Typography variant="h4">Products</Typography>
      </Grid>

      <Grid item xs={12} sm={12} xl={12}>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xl={1}>
            <Chip
              label="Mug"
              clickable
              onClick={() => {
                handleChipClick("Mug");
              }}
              color="secondary"
            />
          </Grid>
          <Grid item xl={1}>
            <Chip
              label="Shirt"
              clickable
              onClick={() => {
                handleChipClick("Shirt");
              }}
              color="#FFFFFF"
            />
          </Grid>
        </Grid>
      </Grid>

      {currentItems.length > 0
        ? currentItems.map((item, i) => {
            return (
              <Grid item xs={12} sm={4} key={i} xl={3}>
                <ProductCard item={item} key={i}></ProductCard>
              </Grid>
            );
          })
        : null}
      <Box mb={2}></Box>

      <CustomPagination
        itemsPerPage={itemPerPage}
        totalItems={items.length}
        paginate={paginate}
      />
    </Grid>
  );
};

export default ProductSection;
