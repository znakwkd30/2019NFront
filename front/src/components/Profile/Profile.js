import React, { Fragment } from 'react';

import Nav from '../Nav';

function Profile() {
    const [log] = React.useState(window.localStorage.getItem("token") === null && window.sessionStorage.getItem("token") === null);

    if (log) {
        alert("로그인이 필요한 서비스입니다.");
        window.location.href = "/login";
    } else {
        return (
            <Fragment>
                <Nav />
                
            </Fragment>
        )
    }
}

export default Profile;