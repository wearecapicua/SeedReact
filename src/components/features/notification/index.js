import React from "react";
import { observer } from "mobx-react";
import Done from "material-ui/svg-icons/action/done";
import Error from "material-ui/svg-icons/alert/error";
import Warning from "material-ui/svg-icons/alert/warning";
import Info from "material-ui/svg-icons/action/info";
import CustomNoti from "./customMaterialNotification";
import notificationStyles from "./notification.scss";

const mobxState = {
    show: false,
    type: "",
    title: "",
    additionalText: "",
    overflowContent: null,
    autoHide: 0,
    className: "",
    icon: null,
    iconFillColor: "",
    iconBadgeColor: ""
};

@observer
class Notification extends React.Component {
    componentWillMount() {
        const nextProps = this.props;
        if (nextProps.show) {
            mobxState.show = nextProps.show;
            mobxState.type = nextProps.type;
            mobxState.title = nextProps.title;
            mobxState.additionalText = nextProps.additionalText;
            mobxState.overflowContent = nextProps.overflowContent;
            mobxState.autoHide = nextProps.autoHide;
            this.setStyle(nextProps.type);
            this.showNotification();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            mobxState.show            = nextProps.show;
            mobxState.type            = nextProps.type;
            mobxState.title           = nextProps.title;
            mobxState.additionalText  = nextProps.additionalText;
            mobxState.overflowContent = nextProps.overflowContent;
            mobxState.autoHide        = nextProps.autoHide;
            this.setStyle(nextProps.type);
            this.showNotification();
        }
    }

    setStyle = classStyle => {
        switch (classStyle) {
            case "success":
                mobxState.type = "success";
                mobxState.className = "success";
                mobxState.icon = <Done />;
                mobxState.iconFillColor = "#4F8A10";
                mobxState.iconBadgeColor = "#DFF2BF";
                break;
            case "warning":
                mobxState.type = "warning";
                mobxState.className = "warning";
                mobxState.icon = <Warning />;
                mobxState.iconFillColor = "#9F6000";
                mobxState.iconBadgeColor = "#FEEFB3";
                break;
            case "error":
                mobxState.type = "error";
                mobxState.className = "error";
                mobxState.icon = <Error />;
                mobxState.iconFillColor = "#D8000C";
                mobxState.iconBadgeColor = "#FFBABA";
                break;
            case "info":
                mobxState.type = "info";
                mobxState.className = "info";
                mobxState.icon = <Info />;
                mobxState.iconFillColor = "#00529B";
                mobxState.iconBadgeColor = "#BDE5F8";
                break;
            default:
                mobxState.type = "";
                mobxState.className = "";
                mobxState.icon = null;
                mobxState.iconFillColor = "";
                mobxState.iconBadgeColor = "";
        }
    }

    showNotification = () => {
        CustomNoti.showNotification({
            title: mobxState.title,
            additionalText: mobxState.additionalText,
            overflowContent: mobxState.overflowContent,
            autoHide: mobxState.autoHide,
            icon: mobxState.icon,
            iconBadgeColor: mobxState.iconBadgeColor,
            iconFillColor: mobxState.iconFillColor
        });
    }

    render() {
        return (
            <div className={notificationStyles[mobxState.className]}>
                <CustomNoti
                    desktop
                    rootStyle={{ bottom: 20, right: 25, zIndex: 1 }}
                />
            </div>
        );
    }
}

export default Notification;