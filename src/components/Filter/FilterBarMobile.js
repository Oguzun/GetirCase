import React, { useState,useEffect, Fragment } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Button } from "@material-ui/core";
import { Grid, Box, SwipeableDrawer } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Sorter from "../Sorter/Sorter";
import FilterBar from "../Filter/FilterBar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {  useSelector } from "react-redux";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const FilterBarMobile = ({ brands, items, tags }) => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const filters = useSelector((state) => state.Shopping.filters);
  const sortingOption = useSelector((state) => state.Shopping.sortingOption);



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    setMessage("Filter automatically applied");

  }, [filters]);

  useEffect(() => {
    setOpen(true);
    setMessage("Sorting automatically applied");
  }, [sortingOption]);


  return (
    <Fragment>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ float: "right" }}
          startIcon={<FilterListIcon />}
          onClick={() => {
            setOpenFilterDrawer(true);
          }}
        >
          Filters
        </Button>
        <SwipeableDrawer
          anchor="top"
          open={openFilterDrawer}
          onClose={() => {
            setOpenFilterDrawer(false);
          }}
          onOpen={() => {}}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={1}
          >
            <Box mb={2}></Box>

            <Grid item sm={12}>
              <CloseIcon
                style={{
                  cursor: "pointer",
                  float: "right",
                  marginTop: "5px",
                  marginRight: "10px",
                }}
                onClick={() => {
                  setOpenFilterDrawer(false);
                }}
              />
            </Grid>
            <Grid item sm={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{
                  marginLeft: "15px",
                }}
              >
                Filters
              </Typography>
            </Grid>

            <Box mb={4}></Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Sorting</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item sm={12}>
                  <Sorter></Sorter>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Box mb={4}></Box>
            <Grid item sm={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Brands</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item sm={12}>
                    <FilterBar
                      HeaderText="Brands"
                      data={brands}
                      Total={items.length}
                    />
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Box mb={4}></Box>
            <Grid item sm={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>Tags</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item sm={12}>
                    <FilterBar
                      HeaderText="Tags"
                      data={tags}
                      Total={items.length}
                    />
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Box mb={4}></Box>
          </Grid>
        </SwipeableDrawer>
      </Grid>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default FilterBarMobile;
