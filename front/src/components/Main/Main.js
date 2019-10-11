import React, { useEffect, useState, Fragment } from 'react';
import Time from 'react-time-format';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Nav from '../Nav';
import Axios from '../../Axios/Axios';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    banner: {
        display: "flex",
        justifyContent: "center"
    },
    carousel: {
        marginBottom: 40,
        width: "80%",
        height: 600,
    },
    bannerImg: {
        width: "100%",
        height: 600,
    },
    card: {
        margin: "20px",
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
    const [products, setProducts] = useState([]);
    const [imagesPath, setImagesPath] = useState([]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        console.log(imagesPath);
    };

    async function getBanner(){
        let result = await Axios({
            url: "banner",
            method: "get",
        })
        setImagesPath(result.data.image);
    }

    async function mainProduct() {
        let result = await Axios({
            url: 'api/product/main',
            method: 'get'
        })
        setProducts(result.data.productList);
        console.log(result.data.productList);
    }

    useEffect(() => {
        mainProduct();
    }, []);

    useEffect(() => {
        getBanner();
    }, [])

    return (
        <Fragment>
            <Nav />
            <div className={classes.banner}>
                <Carousel
                    className={classes.carousel}
                    showStatus={false}
                    showThumbs={false}
                    autoPlay={true}
                    infiniteLoop={true}
                >
                    <div>
                        <img className={classes.bannerImg} src={"http://10.80.163.141:3065/" + imagesPath[0]} alt="banner"/>
                    </div>
                    <div>
                        <img className={classes.bannerImg} src={"http://10.80.163.141:3065/" + imagesPath[1]} alt="banner"/>
                    </div>
                </Carousel>
            </div>
            <Typography variant="h4" align="center">최근 등록된 상품</Typography>
            <div className={classes.root}>
                {products.map((item, key) => {
                    return (
                        <Card className={classes.card} key={key}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={item.productName}
                                subheader={<Time value={item.updateDay} format="YYYY/MM/DD hh:mm" />}
                            />
                            <img src={"http://10.80.163.141:3065/" + item.Images[0].src} style={{ width: 350, height: 200 }} alt={item.productName}></img>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p"
                                    style={{ fontSize: "24px", fontFamily: "궁서체" }}>
                                    {item.price}원
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
                                    <Typography paragraph>상세설명 : {item.description}</Typography>
                                    <Typography paragraph>해시태그 : <Link to={"/search/" + item.hashtag}>{item.hashtag}</Link></Typography>
                                    <Typography paragraph>카테고리 : <Link to={"/search/" + item.category}>{item.category}</Link></Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    )
                })}
            </div>
        </Fragment>
    );
}

export default Main;