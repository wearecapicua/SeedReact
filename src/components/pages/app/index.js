import React, { Component } from 'react'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { BrowserRouter as Router } from 'react-router';
import Match from "react-router/Match";
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import injectTapEventPlugin from "react-tap-event-plugin";
import Redirect from 'react-router/Redirect';

import routes from './routes';

import Home from '../../features/home';
import Login from '../../features/login';

import setLoginStateWatcher from "../../../util/auth/setLoginStateWatcher";
import setLoginState from "../../../util/auth/setLoginState";
setLoginStateWatcher();
setLoginState();

// stores
import appState from "../../../stores/AppState";

@observer
export default class App extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		injectTapEventPlugin();
	}

	buildMatchComponent() {
		return routes.map(
			(item, index) => <Match key={index} exactly pattern={item.pattern} component={item.component}/>
		);
	}

	render() {
		return (
			<Router>
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<div style={{width: "100%", height: "100%", margin: "0 auto"}}>
						<div style={{width: "100%", height: "100%"}}>
							<Match exactly pattern={"/"} component={Home}/>
							<Login />
							{appState.isLoggedIn ?
								<div>
									<Match exactly pattern="/" render={() => <Redirect to="/home"/>}/>
									{this.buildMatchComponent()}
								</div> : null
							}
						</div>
					</div>
				</MuiThemeProvider>
			</Router>
		)
	}
}
