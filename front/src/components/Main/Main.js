import React, { useEffect, useCallback, useState, Fragment } from 'react';
import Time from 'react-time-format';
import Nav from '../Nav';
import Axios from '../../Axios/Axios';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
}));

function Main() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const [products, setProducts] = useState({});
    const [images, setImages] = useState({});
    async function mainProduct() {
        let result = await Axios({
            url: 'api/product/main',
            method: 'get'
        })
        console.log(result);
        console.log(result.data.productList[0].Images[0].src)
        setProducts(result.data.productList);
        setImages(result.data.productList.Images);
    }

    useEffect(() => {
        mainProduct();
    }, []);

    return (
        <Fragment>
            <Nav/>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {Object.keys(products).map((product, i) => (
                <div style={{margin: "20px", width: "420px"}} key={ i }>
                <Card className={classes.card}>
                <CardHeader
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={products[i].productName}
                    subheader={<Time value={products[i].updateDay} format="YYYY/MM/DD hh:mm"/>}
                />
                <img src={"http://10.80.163.141:3065/"+products[i].Images[0].src} style={{width: 350, height: 200}}></img>
                {/* <CardMedia
                    className={classes.media}
                    image={products[i].Images[0].src}
                    title="Paella dish"
                /> */}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p"
                                style={{fontSize: "24px", fontFamily: "궁서체"}}>
                        {products[i].price}원
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                    </IconButton>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography paragraph>상세설명 : {products[i].description}</Typography>
                    <Typography paragraph>해시태그 : <Link to="/search">{products[i].hashtag}</Link></Typography>
                    <Typography paragraph>카테고리 : <Link to="/search">{products[i].category}</Link></Typography>
                    </CardContent>
                </Collapse>
                </Card>
                </div>
                ))}
            </div>            
        </Fragment>
    );
}

export default Main;