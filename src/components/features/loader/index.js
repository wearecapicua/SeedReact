import React from "react";
import { observer } from "mobx-react";
import CircularProgress from "material-ui/CircularProgress";
import _omit from "lodash/omit";
import loaderStyle from "./loader.scss";

@observer
class Loader extends React.Component {

    render() {
        const props = _omit(this.props, ["text"]);
        return (
            <div className={loaderStyle.loader}>
                <CircularProgress
                    {...props}
                />
                <br />
                <span>{this.props.text}</span>
            </div>
        );
    }
}

Loader.propTypes = {
    text: React.PropTypes.string
};

export default Loader;
