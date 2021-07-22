import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Grid, Container } from "@material-ui/core";
import mainLogo from "../../assets/Logo.PNG";
import BasketSummary from "../ShoppingBasket/BasketSummary";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#FFFFFF",
  },
}));

function CustomAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "center" }}>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={0}
            >
              <Hidden only={["xs", "sm"]}>
                <Grid item md={4}></Grid>
              </Hidden>
              <Grid item sm={1} md={4}>
                <img
                  edge="start"
                  src={mainLogo}
                  alt="Market"
                  height="40"
                  width="141"
                />
              </Grid>
              <Hidden only={["xs", "sm"]}>
                <Grid item md={4} lg={1}>
                  <BasketSummary />
                </Grid>
              </Hidden>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default CustomAppBar;
