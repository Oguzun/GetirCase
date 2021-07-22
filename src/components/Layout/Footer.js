import { Grid, Typography, Box } from "@material-ui/core";

export default function Footer() {

  const text="©2019 Market  ·  Privacy Policy";

  return (
    <footer>
      <Box mb={15}></Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} sm={4} xl={2}></Grid>
        <Grid item xs={12} sm={4} xl={5}>
          <Typography
            align="right"
            variant="body1"
            color="secondary"
          >
           {text}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} xl={5}></Grid>
      </Grid>
      <Box mb={5}></Box>
    </footer>
  );
}
