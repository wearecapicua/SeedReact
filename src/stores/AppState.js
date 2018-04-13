import { observable, action } from 'mobx';
import axios from 'axios';
import jwtDecode from "jwt-decode";

class AppState {
  @observable isLoggedIn = false;
  @observable loggedUser = null;

  constructor() {
    /*constructor*/
  }

  @action("user logged in")
  setUserLoggedIn() {
      this.isLoggedIn = true;
      this.getLoggedUser();
  }

  @action("user logged out")
  setUserLoggedOut() {
      this.isLoggedIn = false;
  }

  @action("get logged user")
  getLoggedUser(){
    this.loggedUser = jwtDecode(window.localStorage.getItem("leadbirdManagerToken"));
  }

  @observable modals = {
      login         : {
          isActive: false
      },
      forgotPassword: {
          isActive: false
      },
      changePassword: {
          isActive: false
      }
  }

  @action("open modal")
  openModal(mod) {
      this.closeAllModals();
      this.modals[mod].isActive = true;
  }

  @action("close modal")
  closeModal(mod) {
      this.modals[mod].isActive = false;
  }

  @action("close all modals")
  closeAllModals() {
      Object.keys(this.modals).forEach(key => this.modals[key].isActive = false);
  }

}

const appState = new AppState();
export default appState;
