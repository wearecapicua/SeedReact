import {observable, action, computed} from "mobx";
import axios from '../../../util/axiosWrapper';

import appState from "../../../stores/AppState";

class LoginStore {

    constructor() {

    }

    @observable loggedUser = null;
    @observable notification = {};

    @action("Login user")
    login(user, callback) {
        let objAuth = {email: user.username, password: user.password};
        let url = '/v1/auth';
        axios.post(url, objAuth)
        .then((response) => {
          if (response.status === 200){
            window.localStorage.setItem("leadbirdManagerToken", response.data.token);
            appState.setUserLoggedIn();
            callback(true);
          }
        })
        .catch((error) => {
            this.handleError(error);
            callback(false);
        })
    }

    @action
    handleError(error) {
        switch (error.response.status) {
            case 400:
                this.notification = {
                    title: error.response.status.toString(),
                    autoHide: 5000,
                    additionalText: error.response.data.message,
                    show: true,
                    type: 'error'
                }
                break
            case 401:
                this.notification = {
                    title: error.response.status.toString(),
                    autoHide: 5000,
                    additionalText: error.response.data.message,
                    show: true,
                    type: 'error'
                }
                break
            case 403:
                this.notification = {
                    title: error.response.status.toString(),
                    autoHide: 5000,
                    additionalText: error.response.data.message,
                    show: true,
                    type: 'error'
                }
                break
            case 409:
                this.notification = {
                    title: error.response.status.toString(),
                    autoHide: 5000,
                    additionalText: error.response.data.message,
                    show: true,
                    type: 'error'
                }
                break
            case 500:
                this.notification = {
                    title: error.response.status.toString(),
                    autoHide: 5000,
                    additionalText: error.response.data.message,
                    show: true,
                    type: 'error'
                }
                break
            default:
                this.notification = {
                    title: error.response.status.toString(),
                    autoHide: 5000,
                    additionalText: error.response.data.message,
                    show: true,
                    type: 'error'
                }
        }

        setTimeout(action(() => {
            this.notification.show = false
        }), 1000)
    }

}

const loginStore = new LoginStore();
export default loginStore;
