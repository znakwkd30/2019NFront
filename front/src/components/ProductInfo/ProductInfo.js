import React, { Fragment, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';

import Card from '@material-ui/core/Card';

import Nav from '../Nav';

const Axios = require("../../Axios/Axios");

function ProductInfo({match}){
    const [productInfo, setProductInfo] = React.useState([]);

    function call(){
        console.log(match);
        console.log(match.params.id);
        console.log(productInfo);
    }

    async function getProductInfo(){
        let result = await Axios({
            url: "api/product/productInfo/" + match.id,
            method: "get",
            headers: {"token" : window.localStorage.getItem("token") || window.sessionStorage.getItem("token")}
        });
        setProductInfo(result);
    }

    useEffect(() => {
        getProductInfo();
    }, [])

    return(
        <Fragment>
            <Nav/>
            <Card>
                <div>
                    <Carousel
                        showStatus={false}
                        showThumbs={false}
                        autoPlay={true}
                        infiniteLoop={true}
                    >
                        {productInfo}
                    </Carousel>
                </div>
            </Card>
            <button onClick={call}>Button</button>
        </Fragment>
    )
}

export default ProductInfo;