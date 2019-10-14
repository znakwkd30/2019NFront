import React, { Fragment, useState, useEffect } from 'react';
import Time from 'react-time-format';
import {
    Link
} from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Nav from '../Nav';
import defaultImg from '../../Assets/noImg.png';
import { makeStyles, Typography } from '@material-ui/core';

const Axios = require("../../Axios/Axios");

const useStyles = makeStyles(theme => ({
    root: {
        width: "55%",
        height: 400,
    },
    fCard: {
        margin: "10px auto",
        width: "80%",
    },
    profile: {
        margin: "50px auto",
        width: "80%",
        height: "auto",
        display: "flex",
        justifyContent: "space-between",
    },
    carousel: {
        width: 480,
        height: 480,
    },
    bannerImg: {
        width: "100%",
        height: 480,
    },
    payBtn: {
        margin: "23px 20px",
        float: "right",
    },
    menu: {
        margin: "auto",
        width: "80%",
    }
}))

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

function ProductInfo({ match }) {
    const classes = useStyles();
    const [productInfo, setProductInfo] = useState([]);
    const [imagePath, setImagePath] = useState([]);
    const [value, setValue] = useState(0);

    async function getProductInfo() {
        let result = await Axios({
            url: "api/product/detail/" + match.params.id,
            method: "get",
            headers: { "token": window.localStorage.getItem("token") || window.sessionStorage.getItem("token") }
        });
        setProductInfo(result.data.product);
        setImagePath(result.data.product.Images);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getProductInfo();
    }, [])

    return (
        <Fragment>
            <Nav />
            <Card className={classes.fCard}>
                <div className={classes.profile}>
                    <Carousel
                        className={classes.carousel}
                        showStatus={false}
                        showThumbs={false}
                        autoPlay={true}
                        infiniteLoop={true}
                    >
                        {imagePath.map((item, key) => {
                            return (
                                <div>
                                    <img className={classes.bannerImg} src={item.src === undefined ? defaultImg : "http://10.80.163.141:3065/" + item.src} alt="banner" />
                                </div>
                            )
                        })}
                    </Carousel>
                    <Paper className={classes.root}>
                        <Table size="medium" className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="h4">{productInfo.productName}</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Typography variant="h6"><Time value={productInfo.updateDay} format="YYYY/MM/DD hh:mm" /></Typography></TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Typography variant="h6">{productInfo.price}원</Typography></TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Typography variant="h6">카테고리: <Link to="/search">{productInfo.category}</Link></Typography></TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Typography variant="h6">태그: <Link to="/search">{productInfo.hashtag}</Link></Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button variant="contained" size="large" color="primary" className={classes.payBtn}>
                            구매하기
                        </Button>
                    </Paper>
                </div>
            </Card>
            <Paper square className={classes.menu}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="상세 정보" {...a11yProps(0)} />
                    </Tabs>
                <TabPanel value={value} index={0}>
                    {productInfo.description}
                </TabPanel>
            </Paper>
        </Fragment>
    )
}

export default ProductInfo;