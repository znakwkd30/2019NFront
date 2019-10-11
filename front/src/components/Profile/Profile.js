import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

import Nav from '../Nav';
import { Typography } from 'antd';

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

    if (log) {
        alert("로그인이 필요한 서비스입니다.");
        window.location.href = "/login";
    } else {
        return (
            <Fragment>
                <Nav />
                <Card className={classes.card}>
                    <div className={classes.main}>
                        <Avatar alt="Remy Sharp" src="" className={classes.avatar} />
                        <Typography align="center" variant="h2" gutterBottom>
                            신민수
                        </Typography>
                    </div>
                </Card>
            </Fragment>
        )
    }
}

export default Profile;