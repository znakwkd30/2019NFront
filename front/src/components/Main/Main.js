import React, { useEffect, useState, Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Nav from '../Nav';
import Axios from '../../Axios/Axios';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MainCard from './MainCard';

import defaultImg from '../../Assets/noImg.png';

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
    margin: {
        margin: "20px",
        width: 350,
        height: 380,
    },
    link: {
        cursor: "pointer",
        textDecoration: "none",
    },
}));

function Main() {
    const classes = useStyles();
    const [rendering, setRendering] = useState(false);
    const [check, setCheck] = useState(false);
    const [products, setProducts] = useState([]);
    const [heartProducts, setHeartProducts] = useState([]);
    const [imagesPath, setImagesPath] = useState([]);

    async function getBanner() {
        let result = await Axios({
            url: "banner",
            method: "get",
        })
        setImagesPath(result.data.image);
    }

    async function getMainProduct() {
        let result = await Axios({
            url: 'api/product/main',
            method: 'get'
        })
        setProducts(result.data.productList);
    }

    async function getHeartProduct() {
        let result = await Axios({
            url: "api/product/heartProductList",
            headers: { "token": window.localStorage.getItem("token") || window.sessionStorage.getItem("token") },
            method: "get",
        })
        setHeartProducts(result.data.productList);
    }

    useEffect(() => {
        getBanner();
        getMainProduct();
        getHeartProduct();
        setRendering(true);
    }, [setRendering]);

    return (
        rendering ?
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
                            <img className={classes.bannerImg} src={imagesPath[0] === undefined ? defaultImg : "http://10.80.163.141:3065/" + imagesPath[0]} alt="banner" />
                        </div>
                        <div>
                            <img className={classes.bannerImg} src={imagesPath[1] === undefined ? defaultImg : "http://10.80.163.141:3065/" + imagesPath[1]} alt="banner" />
                        </div>
                    </Carousel>
                </div>
                <Typography variant="h4" align="center">최근 등록된 상품</Typography>
                <div className={classes.root}>
                    {products.map((item, key) => {
                        return <MainCard item={ item } key={ key }/>
                    })}
                </div>
                <hr />
                <div style={{ display: "block" }}>
                    <div style={{ margin: "auto", width: "1000px", fontFamily: "나눔손글씨 김유이체", fontSize: "20px", fontWeight: "bold" }}>
                        <p>WDNA 대표이사 OOO  개인정보보호담당자 OOO  사업자등록정보 X  통신판매업신고 X</p>
                        <p>대구광역시 달성군 구지면 창리로11길 93 / TEL X</p>
                        <p>너울시장은 통신판매중개자로서 중고거래마켓 너울시장의 거래 당사자가 아니며, 입점판매가 등록한 상품정보 및 거래에 대해 책임을 지지 않습니다</p>
                        <p>Copyright ⓒ WeDoNotAnything Corp. All rights reserved.</p>
                    </div>
                </div>
            </Fragment>
            : <p></p>
    );
}

export default Main;