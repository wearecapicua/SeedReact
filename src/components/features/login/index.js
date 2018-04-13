// libraries
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import update from 'immutability-helper';

// components
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import Notification from "../notification";

// import stores
import appState from "../../../stores/AppState";
import loginStore from "./login.store";

// import styles
import styles from "./login.scss";

const customStyles = {
    modal: {
        width: "600px"
    },
    button: {
        margin: 12,
        float: "right"
    },
    errorStyle: {
        position: "absolute",
        bottom: "-5px"
    }
};

@observer
export default class Login extends Component {

  constructor(props, context) {
      super(props, context);
  }

  @observable mobxState = {
      userSignIn: {
          username: "",
          password: ""
      },
      errorTextsSignIn: {
          username: "",
          password: ""
      },
      disabledSignIn: false,
      slideIndex: 0
  };

  @action handleChangeSignIn = (event) => {
      let validate;
      let validateEmail;
      switch (event.target.id) {
          case "emailSignIn":
              this.mobxState.userSignIn.username = event.target.value;
              validate = this.validateText(this.mobxState.userSignIn.username);
              if (validate){
                validateEmail = this.validateEmail(this.mobxState.userSignIn.username);
                if (validateEmail){
                  this.mobxState.errorTextsSignIn.username = "";
                  this.mobxState.disabledSignIn = false;
                }else{
                  this.mobxState.errorTextsSignIn.username = "Invalid E-Mail Address";
                  this.mobxState.disabledSignIn = true;
                }
              }else{
                  this.mobxState.errorTextsSignIn.username = "Required";
                  this.mobxState.disabledSignIn = true;
              }
              break;
          case "passwordSignIn":
              this.mobxState.userSignIn.password = event.target.value;
              validate = this.validateText(this.mobxState.userSignIn.password);
              if (validate){
                  this.mobxState.errorTextsSignIn.password = "";
              }else{
                  this.mobxState.errorTextsSignIn.password = "Required";
              }
              break;
          default:
              throw new TypeError("Expecting input type name to be 'email' or 'password'", "features/login/index.js");
      }
  }

  validateText(text) {
      if (text === "" || text === null){
          return false;
      }
      return true;
  }

  validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  handleClickSignIn = () => {
      this.validateAllSignIn();
      if (!this.mobxState.disabledSignIn) {
          loginStore.login(this.mobxState.userSignIn, this.handleClickCallbackSignIn);
      }
  }

  @action validateAllSignIn = () => {
    let errors = [];
    for (let key in this.mobxState.userSignIn) {
        if (!this.mobxState.userSignIn[key]) {
            this.mobxState.errorTextsSignIn[key] = "Required";
            this.mobxState.disabledSignIn = true;
        }
    }
  }

  handleClickCallbackSignIn = (success) => {
      if (success){
          this.closeLogin();
          if (window.location.pathname === "/"){
              window.location.href = "/postcards";
          }
      }else{

      }
  }

  closeLogin = () => {
      appState.closeModal("login");
  }

	render() {
		return (
			<div>
				<Dialog
            repositionOnUpdate={false}
            modal={false}
            open={appState.modals.login.isActive}
            onRequestClose={this.closeLogin}
        >
          <div>
              <TextField
                  id="emailSignIn"
                  type="text"
                  floatingLabelText="E-Mail Address*"
                  onChange={event => this.handleChangeSignIn(event)}
                  fullWidth
                  maxLength="75"
                  ref="emailSignIn"
                  tabIndex={0}
                  value={this.mobxState.userSignIn.username ? this.mobxState.userSignIn.username : ""}
                  errorText={this.mobxState.errorTextsSignIn.username}
                  errorStyle={customStyles.errorStyle}
              />

              <TextField
                  id="passwordSignIn"
                  type="password"
                  floatingLabelText="Password*"
                  onChange={event => this.handleChangeSignIn(event)}
                  fullWidth
                  maxLength="40"
                  ref="passwordSignIn"
                  value={this.mobxState.userSignIn.password ? this.mobxState.userSignIn.password : ""}
                  errorText={this.mobxState.errorTextsSignIn.password}
                  errorStyle={customStyles.errorStyle}
              />

              <div style={{marginTop: "25px"}}>
                  <RaisedButton
                      label="Sign In"
                      backgroundColor={'#1C306F'}
                      labelColor={"#FFF"}
                      style={customStyles.button}
                      onTouchTap={() => this.handleClickSignIn()}
                      disabled={this.mobxState.disabledSignIn} />

              </div>
          </div>
        </Dialog>
        {loginStore.notification ?
            <Notification
                title={loginStore.notification.title}
                autoHide={loginStore.notification.autoHide}
                additionalText={loginStore.notification.additionalText}
                show={loginStore.notification.show}
                type={loginStore.notification.type}/> : null
        }
			</div>
		)
	}
}
