import React, { useEffect, useState, Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Axios from '../../Axios/Axios';
import { Link } from 'react-router-dom';

import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MainCard from './MainCard';

import defaultImg from '../../Assets/noImg.png';

const useStyles = makeStyles(theme => ({
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
        width: 180,
        height: 150,
        margin: "0 auto",
        boxSizing: "border-box",
        fontSize: 60,
        lineHeight: "150px",
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
    n: {
        width: "100%",
    },
    bt: {
        borderTop: "1px solid #4c4c4c",
    },
    bb: {
        borderBottom: "1px solid #e8e8e8",
    },
    nt: {
        margin: "0 auto",
        width: 1260,
        height: 42,
        lineHeight: "42px",
    },
    ntb: {
        border: "none",
        background: "inherit",
        textDecoration: "none",
        padding: "0 5px",
        color: "#323232",
        cursor: "pointer",
        fontSize: "11px",
        '&:hover': {
            color: "#aaa",
        }
    },
    nl: {
        margin: "0 auto",
        width: 1260,
        height: 50,
    },
    lu: {
        listStyle: "none",
        display: "flex",
    },
    ul: {
        textDecoration: "none",
        color: "black",
        padding: "0 68px",
    }
}));

function Main() {
    const classes = useStyles();
    const [log] = useState(window.localStorage.getItem("token") === null && window.sessionStorage.getItem("token") === null);
    const [rendering, setRendering] = useState(false);
    const [products, setProducts] = useState([]);
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

    function logout() {
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.location.href = "/";
    }

    useEffect(() => {
        getBanner();
        getMainProduct();
        setRendering(true);
    }, [setRendering]);

    return (
        rendering ?
            <Fragment>
                <div className={classes.n}>
                    <div className={classes.bb}>
                        <div className={classes.nt}>
                            {log ? <Link to="/login" className={classes.ntb}>로그인</Link> : <button onClick={logout} className={classes.ntb}>로그아웃</button>}
                            {log ? <Link to="/register" className={classes.ntb}>회원가입</Link> : <Link to ="/profile" className={classes.ntb}>프로필</Link>}
                        </div>
                    </div>
                    <div className={classes.logo}>
                        <span>凝安該</span>
                    </div>
                    <div className={classes.bt}>
                        <div className={classes.nl}>
                            <ul className={classes.lu}>
                                <li><Link to="/" className={classes.ul}>의류</Link></li>
                                <li><Link to="/" className={classes.ul}>전자기기</Link></li>
                                <li><Link to="/" className={classes.ul}>도서</Link></li>
                                <li><Link to="/" className={classes.ul}>굿즈</Link></li>
                                <li><Link to="/" className={classes.ul}>뷰티</Link></li>
                                <li><Link to="/" className={classes.ul}>나눔</Link></li>
                                <li><Link to="/" className={classes.ul}>기타</Link></li>
                            </ul>
                        </div>
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