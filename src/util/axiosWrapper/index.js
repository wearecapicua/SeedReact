import appState from "../../stores/AppState";
import configJson from '../../config/config.json';
import axios from "axios";
/*
 if (user is signed in (meaning leadbirdManagerToken is set on local storage and not expired)){

 send request to /api/whatever/

 if leadbirdManagerToken invalid is received from server
 redirect to login page
 else
 process data sent back from server
 }if (the user is trying to make authenticated code && user is not signed in){

 show display login

 this is done by flipping the mobx store to login = true
 }else{
 show display login

 this is done by flipping the mobx store to login = true
 }
 */

const config = {
    baseURL: configJson[process.env.NODE_ENV].api.domain, // all requests are routed to /api/something....
    timeout: 60000, // default timeout of 60 seconds
};

const axiosInstance = axios.create(config);

// before the request is sent to the server, add jwt to the Authorization header
axiosInstance.interceptors.request.use(config => {
    // console.log("request config", JSON.stringify(config, null, 2));

    // TODO do you want to attach an item from localstorage everytime you send a request? expensive disk operation,
    // measure first as not to do premature optimization, because network trip is much more expensive,
    // does not matter if disk operation is expensive

    let tkn = window.localStorage.getItem("leadbirdManagerToken");

    if (tkn) {
      config.headers.Authorization = `Bearer ${tkn}`;
    }

    return config;
});

// whenever a response is received from the node layer
axiosInstance.interceptors.response.use(response => {

    return response;

}, error => {

    if (error.status === 401) {
      window.localStorage.removeItem("leadbirdManagerToken");
      window.setTimeout(() => {appState.setUserLoggedOut(); window.location.reload()}, 0);
    }

    // handle other types of response errors here
    return Promise.reject(error);
});

export default axiosInstance;
