import React, { useEffect, useState, Fragment } from 'react';
import Time from 'react-time-format';
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

function Search({match}){
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [products, setProducts] = useState([]);
    async function searchProduct() {
        let result;
        if (match.params.name) {
            result = await Axios({
                url: 'api/product/searchProduct/' + match.params.name,
                headers: {"token" : window.localStorage.getItem("token") || window.sessionStorage.getItem("token")},
                method: 'get'
            })
        } else {
            result = await Axios({
                url: 'api/product/hashtagProduct/' + match.params.hashtag,
                headers: {"token" : window.localStorage.getItem("token") || window.sessionStorage.getItem("token")},
                method: 'get'
            })
        }
        setProducts(result.data.productList);            
    }

    useEffect(() => {
        searchProduct();
    }, []);

    return(
        <Fragment>
            <Nav/>
            <div className={classes.root} style={{ width: "80%", margin: "auto" }}> 
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
                            {/* <img src={"http://10.80.163.141:3065/" + item.Images[0].src} style={{ width: 350, height: 200 }}></img> */}
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
    )
}

export default Search;