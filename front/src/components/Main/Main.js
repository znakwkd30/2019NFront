import React, { useEffect, useState, Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Axios from '../../Axios/Axios';
import { Link } from 'react-router-dom';

import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MainCard from './MainCard';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';

import defaultImg from '../../Assets/noImg.png';

const useStyles = makeStyles(theme => ({
    ns: {
        width: "40%",
        margin: "20px auto",
        display: "flex",
    },
    nc: {
        width: "21%",
        margin: "10px auto",
    },
    cl: {
        margin: "0 10px",
    },
    searche: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: "1px solid black",
        width: '50%',
        minWidth: 262,
        margin: "0 auto",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
          lineHeight: "37px",
            width: 100,
            margin: "0 auto",
            boxSizing: "border-box",
      },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
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
    linkBtn: {
        margin: "0 5px",
        textDecoration: "none",
        color: "black",
        border: "none",
        background: "inherit",
        fontSize: 18,
        cursor: "pointer",
    },
    nl: {
        
    }
}));

function Main() {
    const classes = useStyles();
    const [log] = useState(window.localStorage.getItem("token") === null && window.sessionStorage.getItem("token") === null);
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

    function logout(){
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.location.href = "/";
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
                <div className={classes.n}>
                    <div className={classes.nm}>
                        <div className={classes.mu}>

                        </div>
                    </div>
                    <div className={classes.ns}>
                        <div className={classes.logo}>
                            <span><Link to="/" className={classes.linkBtn}>凝安該</Link></span>
                        </div>
                        <div className={classes.searche}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.nl}>
                            {log ? <Link to="/login" className={classes.linkBtn}>로그인</Link> : <button className={classes.linkBtn} onClick={logout}>로그아웃</button>}
                            {log ? <Link to="/register" className={classes.linkBtn}>회원가입</Link> : <Link to="/profile" className={classes.linkBtn}>프로필</Link>}
                        </div>
                    </div>
                    <div className={classes.nc}>
                        <Link className={classes.cl} to="/search/의류">의류</Link>
                        <Link className={classes.cl} to="/search/전자기기">전자기기</Link>
                        <Link className={classes.cl} to="/search/도서">도서</Link>
                        <Link className={classes.cl} to="/search/굿즈">굿즈</Link>
                        <Link className={classes.cl} to="/search/뷰티">뷰티</Link>
                        <Link className={classes.cl} to="/search/나눔">나눔</Link>
                        <Link className={classes.cl} to="/search/기타">기타</Link>
                    </div>
                </div>
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
                        return <MainCard item={item} key={key} />
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