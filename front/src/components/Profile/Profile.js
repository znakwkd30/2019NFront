import React, { Fragment } from 'react';
import Axios from '../../Axios/Axios';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Nav from '../Nav';

const useStyles = makeStyles({
    card: {
        margin: "20px auto",
        width: "60%",
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
    avatar:{
        margin: "0 auto",
        width: "50px",
        height: "50px",
    },
    Typography: {
        margin: "20px 0 0 0",

    }

});

function Profile() {
    const classes = useStyles();

    const [log] = React.useState(window.localStorage.getItem("token") === null && window.sessionStorage.getItem("token") === null);
    const [userInfo, setUserInfo] = React.useState([]);
    const [userImg, setUserImg] = React.useState();

    async function getProfile(){
        let result = await Axios({
            url: "api/user/userinfo",
            headers: {"token" : window.sessionStorage.getItem("token") || window.localStorage.getItem("token")},
        });

        setUserInfo(result.data.data);
        setUserImg(result.data.data.ProfileImages[0].src);
    }


    React.useEffect(() => {
        getProfile();
    }, []);

    function call(){
        console.log(userInfo);
        console.log(userImg);
    }

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
                    </div>
                </Card>
            </Fragment>
        )
    }
}

export default Profile;