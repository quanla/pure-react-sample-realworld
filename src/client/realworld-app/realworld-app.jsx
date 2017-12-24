import classnames from "classnames";
import {RComponent} from "../common/r-component";
import {userInfo} from "./authen/user-info";
import { HashRouter, Route, Switch } from 'react-router-dom';
import {HomeRoute} from "./routes/home/home-route";
import {RegisterRoute} from "./routes/register/register-route";

export class RealWorldApp extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.onUnmount(userInfo.onChange(() => this.forceUpdate()));
    }

    render() {
        return (
            <div className="realworld-app">

                {renderRoutes(userInfo.getUser())}

            </div>
        );
    }
}

const renderRoutes = (user) => {
    const requireAuthen = (comp) => user == null ? redirect("/login") : comp;
    const requireUnauthen = (comp) => user != null ? redirect("/") : comp;

    return (
        <HashRouter>
            <Switch>
                <Route exact path='/' component={HomeRoute}/>
                <Route exact path='/register' component={requireUnauthen(RegisterRoute)}/>
            </Switch>
        </HashRouter>
    );
};

function redirect(location) {
    return class RedirectRoute extends RComponent {
        constructor(props, context) {
            super(props, context);

            props.history.push(location);
        }
        render() {
            return null;
        }
    }
}

