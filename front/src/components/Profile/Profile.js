import React, { Fragment, useEffect, useState } from 'react';
import Axios from '../../Axios/Axios';
import { makeStyles } from '@material-ui/core/styles';
import Time from 'react-time-format';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Nav from '../Nav';
import { Link } from 'react-router-dom';
import defaultImg from '../../Assets/noImg.png';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

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
        width: 350,
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
    avatar: {
        margin: "0 auto",
        width: "200px",
        height: "200px",
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
    link: {
        cursor: "pointer",
        textDecoration: "none",
        fontSize: "18px"
    },
    profileIcon: {
        alignItems: "right"
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Profile() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();

    const [log] = React.useState(window.localStorage.getItem("token") === null && window.sessionStorage.getItem("token") === null);
    const [userInfo, setUserInfo] = React.useState([]);
    const [heartProduct, setHeartProduct] = React.useState([]);
    const [userImg, setUserImg] = React.useState();
    const [products, setProducts] = useState([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function myProduct() {
        let result;
        result = await Axios({
            url: 'api/product/myProduct/',
            headers: { "token": window.localStorage.getItem("token") || window.sessionStorage.getItem("token") },
            method: 'get'
        })

        setProducts(result.data.productList);
    }

    async function getProfile() {
        let result = await Axios({
            url: "api/user/userinfo",
            headers: { "token": window.sessionStorage.getItem("token") || window.localStorage.getItem("token") },
        });

        setUserInfo(result.data.data);
        setUserImg(result.data.data.ProfileImages[0].src);
    }

    async function getHeartProduct() {
        try {
            let result = await Axios({
                url: "api/product/heartProductList",
                method: "get",
                headers: { "token": window.localStorage.getItem("token") || window.sessionStorage.getItem("token") }
            })
            console.log(result);
            setHeartProduct(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    function handleEdit(id) {
        window.location.href = "/productChange/" + id;
    }

    async function handleDelete(id) {
        let result = await Axios({
            url: "api/product/deleteProduct/" + id,
            headers: { "token": window.sessionStorage.getItem("token") || window.localStorage.getItem("token") },
            method: "delete"
        });
        console.log(result);
        myProduct();
    }

    React.useEffect(() => {
        getProfile();
        myProduct();
        getHeartProduct();
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
                    </div>
                </Card>
                <Typography variant="h4" align="center">내 상품</Typography>
                <div className={classes.root} style={{ width: "80%", margin: "auto" }}> 
                {products.map((item, key) => {
                    return (
                        
                        <Card className={classes.itemCard} key={key}>
                            <CardHeader
                                action={
                                    <div>
                                    <IconButton aria-label="settings" onClick={e => handleEdit(item.id)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="settings" onClick={e => handleDelete(item.id)}>
                                        <DeleteIcon/>    
                                    </IconButton>
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon/>
                                    </IconButton>
                                    {/* <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <IconButton aria-label="settings" onClick={e => handleEdit(item.id)}>
                                                <EditIcon/>
                                            </IconButton>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <IconButton aria-label="settings" onClick={e => handleEdit(item.id)}>
                                                <EditIcon/>
                                            </IconButton>
                                        </MenuItem>
                                    </Menu> */}
                                    </div>
                                }
                                title={<Link to={"/productinfo/" + item.id} className={classes.link}>{item.productName}</Link>}
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
                        </Card>
                    )
                })}
            </div>
            </Fragment>
        )
    }
}

export default Profile;