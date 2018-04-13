export default function setLoginStateWatcher() {
    // monitors local storage for pgToken addition and removal, and refreshes other opened tabs.
    // this is done here because users might open multiple tabs and might login and logout in different tabs
    // the only universal way to communicate the change is through local storage event listener
    // now if a user logs out on one tab or logs in on another, the other tabs will refresh

    window.addEventListener("storage", event => {
        // if there is a leadbird manager token in localstorage, it means the user is logged in, even if the lmToken is fake or expired,
        // it doesn't matter set the user as logged in. this is because the account service will reject them if they
        // send fake or expired lmToken and the react layer will popup the login box for them to sign in
        if (event.key === "leadbirdManagerToken") { // make sure other local storage changes don't trigger a refresh, only login and logouts
            window.location.reload(); // refresh the page
        }
    });
}
