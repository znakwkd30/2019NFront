import React, { Fragment } from 'react';
import Axios from '../../Axios/Axios';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Nav from '../Nav';

import defaultImg from '../../Assets/noneImg.png';

const useStyles = makeStyles({
    card: {
        margin: "20px auto",
        width: "60%",
    },
    main: {
        margin: "60px auto 20px",
        width: "150px",
    },
    avatar: {
        margin: 10,
        width: 130,
        height: 130,
    },
});

function Profile() {
    const classes = useStyles();

    const [log] = React.useState(window.localStorage.getItem("token") === null && window.sessionStorage.getItem("token") === null);
    const [userInfo, setUserInfo] = React.useState([]);
    const [userImg, setUserImg] = React.useState();

    async function getProfile() {
        let result = await Axios({
            url: "api/user/userinfo",
            headers: { "token": window.sessionStorage.getItem("token") || window.localStorage.getItem("token") },
        })
        setUserInfo(result.data.data);
        setUserImg(result.data.data.ProfileImages[0].src);
    }

    React.useEffect(() => {
        getProfile();
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
                        <Avatar alt="profileImg" src={userInfo.length === 0 ? defaultImg : "http://10.80.163.141:3065/\\" + userImg} className={classes.avatar} />
                        <Typography variant="h4" align="center">
                            {userInfo.name}
                        </Typography>
                        <Button variant="contained" className={classes.button}>
                            Default
                        </Button>
                    </div>
                </Card>
            </Fragment>
        )
    }
}

export default Profile;