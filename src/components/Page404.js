import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

function Page404() {
  
  return (
<Fragment>   
     <p>Error 404  this page Not Found</p> 
     <Link to='/'>go back to login page</Link>    
    </Fragment>
  );
}

export default Page404;
