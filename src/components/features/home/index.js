import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

// components
import RaisedButton from "material-ui/RaisedButton";

// import stores
import appState from "../../../stores/AppState";

// import styles
import styles from "./home.scss";


@observer
export default class Home extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.content}>
				Hola Mundo! Este es un proyecto en ReactJS.
			</div>
		)
	}

}
