import React, { useEffect, useState, Fragment } from 'react';
import Time from 'react-time-format';
import Nav from '../Nav';
import Axios from '../../Axios/Axios';
import { Link } from 'react-router-dom';
import './main.css'

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

function Main() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [products, setProducts] = useState([]);
    const [images, setImages] = useState({});
    async function mainProduct() {
        let result = await Axios({
            url: 'api/product/main',
            method: 'get'
        })
        console.log(result.data.productList);
        setProducts(result.data.productList);
        setImages(result.data.productList.Images);
    }

    useEffect(() => {
        mainProduct();
    }, []);

    return (
        <Fragment>
            <Nav />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="http://10.80.163.141:3065/img1.jpg"/>
            </div>
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
                            <img src={"http://10.80.163.141:3065/" + item.Images[0].src} style={{ width: 350, height: 200 }}></img>
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
                                    <Typography paragraph>해시태그 : <Link to={"/search/hashtag/" + item.hashtag}>{item.hashtag}</Link></Typography>
                                    <Typography paragraph>카테고리 : <Link to={"/search/" + item.category}>{item.category}</Link></Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    )
                })}
            </div>
            <hr/>
            <div style={{ display: "block" }}>
                <div style={{ margin: "auto", width: "1000px", fontFamily: "나눔손글씨 김유이체", fontSize: "20px", fontWeight: "bold" }}>
                    <p>WDNA 대표이사 OOO  개인정보보호담당자 OOO  사업자등록정보 X  통신판매업신고 X</p>
                    <p>대구광역시 달성군 구지면 창리로11길 93 / TEL X</p>
                    <p>너울시장은 통신판매중개자로서 중고거래마켓 너울시장의 거래 당사자가 아니며, 입점판매가 등록한 상품정보 및 거래에 대해 책임을 지지 않습니다</p>
                    <p>Copyright ⓒ WeDoNotAnything Corp. All rights reserved.</p>
                </div>
            </div>
        </Fragment>
    );
}

export default Main;