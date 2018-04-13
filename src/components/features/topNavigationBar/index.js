// libraries
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import update from 'immutability-helper';

// components
import FlatButton from "material-ui/FlatButton"


// import stores
import appState from "../../../stores/AppState";

// import styles
import styles from "./topNavigationBar.scss";

import logoPath from "../../layout/assets/logo.png";

@observer
export default class TopNavigationBar extends Component {

    constructor(props, context) {
        super(props, context);
    }

    @action openLogin = () => {
        this.showModal("login");
    };

    showModal = (name) => {
        appState.openModal(name);
    };

    handleClickLogout = () => {
        window.localStorage.removeItem("leadbirdManagerToken");
        appState.setUserLoggedOut();
        window.location.href = "/";
    };


    render() {
        return (
            <div className={`${styles.content} ${styles.row}`}>
                <div className={styles.column14}>
                  <img src={logoPath} />
                </div>
                <div>
                  {!appState.isLoggedIn ?
                      <div className={styles.loginContainer}>
                          <FlatButton
                            label="Sign In"
                            hoverColor={"transparent"}
                            onTouchTap={() => this.openLogin()}
                            className={styles.btnSignIn} />
                      </div> :
                      <div className={`${styles.row}`}>
                        <div className={styles.column12} style={{textAlign: "center"}}>
                          <h1>Postcard Admin Panel</h1>
                        </div>
                        <div className={styles.logoutContainer}>
                            <FlatButton
                              label="Logout"
                              hoverColor={"transparent"}
                              onTouchTap={() => this.handleClickLogout()}
                              className={styles.btnLogout} />
                        </div>
                      </div>
                  }
                </div>
            </div>
        )
    }
}
