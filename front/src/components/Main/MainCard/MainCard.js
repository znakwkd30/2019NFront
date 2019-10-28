import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import {
    Link
} from 'react-router-dom';
import Time from 'react-time-format';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Axios from '../../../Axios/Axios';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: "20px",
        width: 350,
        height: 365,
    },
    link: {
        cursor: "pointer",
        textDecoration: "none",
    },
    card: {
        width: "100%",
        height: "100%",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const MainCard = ({ item }) => {
    const classes = useStyles();

    const handleClick = id => {
        console.log(id);
        Axios({
            url: "api/heart/click/" + id,
            headers: {"token" : window.localStorage.getItem("token") || window.sessionStorage.getItem("token")},
            method: 'post'
        })
        .then(result => {
            console.log(result);
        })
    }

    return (
        <div className={classes.margin}>
            <Card className={classes.card}>
                <CardHeader
                    title={<Link to={"/productinfo/" + item.id} className={classes.link}>{item.productName}</Link>}
                    subheader={<Time value={item.updateDay} format="YYYY/MM/DD hh:mm" />}
                />
                <img src={"http://10.80.163.141:3065/" + item.Images[0].src} style={{ width: 350, height: 200 }}></img>
                
                {/* <img src={item.Images.length === 0 ? defaultImg : "http://10.80.163.141:3065/" + item.Images[0].src} style={{ width: 350, height: 200 }} alt={item.productName}></img> */}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p"
                        style={{ fontSize: "24px", fontFamily: "궁서체" }}>
                        {item.price}원
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default MainCard;