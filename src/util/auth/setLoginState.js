// stores
import appState from "../../stores/AppState";

// sets the loginState of the user, also if showlogin is set to true, it will popup the login dialog box to prompt the user
// to sign in, the login dialog box should be shown for authenticated routes, but should not be shown for unauthenticated routes
export default function setLoginState() {
    const lmToken = window.localStorage.getItem("leadbirdManagerToken");

    if (!lmToken) { // if there is no pgToken, it means user has logged out
        appState.setUserLoggedOut();
    } else {
        // assume the user is already logged in (optimistic ui update), this is to make the ui instantaneous to the user
        // (the component that should be rendered if the user is logged out, won't be shown first, will be set
        // after you check the jwt is not valid on the server side), the user is logged in 99% of the time
        appState.setUserLoggedIn();
    }
}
