import classnames from "classnames";
import {RComponent} from "../common/r-component";
import {userInfo} from "./authen/user-info";
import { HashRouter, Route, Switch } from 'react-router-dom';
import {HomeRoute} from "./routes/home/home-route";
import {RegisterRoute} from "./routes/register/register-route";
import {LoginRoute} from "./routes/login/login-route";
import {fetcherConfig} from "../api/fetcher";
import {SettingsRoute} from "./routes/settings/settings-route";
import {ProfileRoute} from "./routes/profile/profile-route";

export class RealWorldApp extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.onUnmount(userInfo.onChange(() => this.forceUpdate()));

        fetcherConfig.setHeaders(() => {
            let user = userInfo.getUser();
            if (user) {
                return {
                    "authorization": `Token ${user.token}`,
                };
            }
            return {};
        });

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
    const requireAuthen = (comp) => user == null ? redirect("/") : comp;
    const requireUnauthen = (comp) => user != null ? redirect("/") : comp;

    return (
        <HashRouter>
            <Switch>
                <Route exact path='/' component={HomeRoute}/>
                <Route path='/@:username' component={ProfileRoute}/>
                <Route exact path='/register' component={requireUnauthen(RegisterRoute)}/>
                <Route exact path='/login' component={requireUnauthen(LoginRoute)}/>

                <Route exact path='/settings' component={requireAuthen(SettingsRoute)}/>
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

