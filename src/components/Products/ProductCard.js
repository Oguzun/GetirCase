import React  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { shoppingActions } from "../../store/slices/shoppingSlice";
import Mug from "../../assets/Mug.png";
import shirt from "../../assets/shirt.png";

const useStyles = makeStyles({
  root: {
    minHeight: 250,
  },
  display: {
    display: "flex",
    maxWidth: "100%",
    maxHeight: "22px",
    minWidth: "100%",
    minHeight: "35px",
    textTransform: "capitalize",
  },
  content:{
    minHeight: 65,
  }
});

export default function ProductCard({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(shoppingActions.AddItem(item));
  };

  const imgPath = (type) => {
    if (type === "shirt") {
      return (
        <CardMedia
          component="img"
          alt="shirt"
          height="120"
          width="120"
          image={shirt}
          title="shirt"
        />
      );
    } else {
      return (
        <CardMedia
          component="img"
          alt="Mug"
          height="120"
          width="120"
          image={Mug}
          title="Mug"
        />
      );
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {imgPath(item.itemType)}
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary" component="p">
            ₺ {item.price}
          </Typography>
          <Typography variant="subtitle1" color="textPrimary" component="p">
            {item.name}
          </Typography>
       
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing={true}>
        <Button
          variant="contained"
          className={classes.display}
          onClick={() => {
            handleClick(item);
          }}
          size="small"
          color="secondary"
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
}
