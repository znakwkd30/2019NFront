import React, { Fragment } from 'react';

import Nav from '../Nav';

function Search({match}){
    return(
        <Fragment>
            <Nav/>
            <p>{match.params.name}</p>
        </Fragment>
    )
}

export default Search;