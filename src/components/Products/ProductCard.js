import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { shoppingActions } from "../../store/slices/shoppingSlice";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
  },
  display: {
    display: "flex",
    maxWidth: "100%",
    maxHeight: "22px",
    minWidth: "100%",
    minHeight: "22px",
    textTransform: "capitalize",
  },
});

export default function ProductCard({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(shoppingActions.AddItem(item));
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Mug"
          height="120"
          width="120"
          image="https://www.redwolf.in/image/cache/catalog/mugs/rick-and-morty-evil-morty-mug-front-128x128.jpg"
          title="Mug"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            ₺ {item.price}
          </Typography>
          <Typography variant="subtitle1" color="textPrimary" component="p">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="textPrimary" component="p">
            {item.itemType}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing={true}>
        <Button
          variant="contained"
          className={classes.display}
          onClick={() => { handleClick(item) }}
          size="small"
          color="secondary"
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
}
