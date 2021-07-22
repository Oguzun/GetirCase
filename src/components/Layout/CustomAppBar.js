import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Grid, Container, Box } from "@material-ui/core";
import mainLogo from "../../assets/Logo.PNG";
import BasketSummary from "../ShoppingBasket/BasketSummary";
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
              <Grid item xs={12} sm={6} xl={3}></Grid>
              <Grid
                item
                xs={12}
                sm={6}
                xl={4}
                >
                <img src={mainLogo} alt="Market" height="40" width="141" />
              </Grid>
              <Grid item xs={12} sm={6} xl={1}>
                <BasketSummary />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default CustomAppBar;
