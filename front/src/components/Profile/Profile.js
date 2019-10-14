import React, { Fragment, useEffect, useState } from 'react';
import Axios from '../../Axios/Axios';
import { makeStyles } from '@material-ui/core/styles';
import Time from 'react-time-format';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Nav from '../Nav';
import defaultImg from '../../Assets/noImg.png';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
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
        margin: "20px auto",
        width: "60%",
    },
    itemCard: {
        margin: "20px",
        width: 300,
        height: 420,
    },
    main: {
        margin: "60px auto 20px",
        width: "200px",
    },
    anpmvatar: {
        margin: 10,
        width: 130,
        height: 130,
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
    avatar:{
        margin: "0 auto",
        width: "50px",
        height: "50px",
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    Typography: {
        margin: "20px 0 0 0",

    },
    myproduct: {
        width: "80%",
        margin: "0 auto",
        height: "130px",

    },

}));

function Profile() {
    const classes = useStyles();

    const [log] = React.useState(window.localStorage.getItem("token") === null && window.sessionStorage.getItem("token") === null);
    const [userInfo, setUserInfo] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [userImg, setUserImg] = React.useState();
    const [products, setProducts] = useState([]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function searchProduct() {
        let result;
        result = await Axios({
            url: 'api/product/myProduct/',
            headers: {"token" : window.localStorage.getItem("token") || window.sessionStorage.getItem("token")},
            method: 'get'
        })
        
        setProducts(result.data.productList);            
    }

    async function getProfile() {
        let result = await Axios({
            url: "api/user/userinfo",
            headers: {"token" : window.sessionStorage.getItem("token") || window.localStorage.getItem("token")},
        });

        setUserInfo(result.data.data);
        setUserImg(result.data.data.ProfileImages[0].src);
    }


    React.useEffect(() => {
        getProfile();
        searchProduct();
    }, []);

    if (log) {
        alert("로그인이 필요한 서비스입니다.");
        window.location.href = "/login";
    } else {
        return (
            <Fragment>
                <Nav />
                <Card className={classes.card}>
                    <div className={classes.main}>
                        <Avatar alt="profileImg" src={userInfo.ProfileImages === null ? "../Profile/noneImg.png" : "http://10.80.163.141:3065/\\" + userImg} className={classes.avatar} />
                        <Typography variant="h3" align="center" className={classes.Typography}>
                            {userInfo.name}
                        </Typography>
                        <CardContent className={classes.cardcontent}>
                        </CardContent>
                    </div>
                </Card>
                <Typography variant="h4" align="center">내 상품</Typography>
                <div className={classes.root} style={{ width: "80%", margin: "auto" }}> 
                {products.map((item, key) => {
                    return (
                        <Card className={classes.itemCard} key={key}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={item.productName}
                                subheader={<Time value={item.updateDay} format="YYYY/MM/DD hh:mm" />}
                            />
                            <img src={item.Images.length === 0 ? defaultImg : "http://10.80.163.141:3065/" + item.Images[0].src} style={{ width: 350, height: 200 }} alt={item.productName}></img>
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
}

export default Profile;