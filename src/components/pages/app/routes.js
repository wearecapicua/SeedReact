/**
 we have two routes, one is for the sidebar and one is for deep links, this describes the sidebar routes

 react router tips
 - don't use
 - if you are in a child component you have to always prepend the its parents path like `${pathname} before matching, otherwise the path are not gonna match
 e.g. <Link to={`${pathname}/test`}>Test</Link>
 <Match pattern={`${pathname}/test`} component={Test}/>

 pattern writing
 patterns should be unique, maybe write a test to check that here
 pattern should be, main page + lower-case, separated with - e.g. /driver-trips
 */

// components
import Home from "../home";

// utility library
//import Auth from "../../util/auth";

export default [
  
];
