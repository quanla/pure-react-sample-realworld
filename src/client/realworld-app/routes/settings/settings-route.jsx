import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {Layout} from "../layout/layout";
import {Link} from "react-router-dom";
import {userApi} from "../../../api/user-api";
import {userInfo} from "../../authen/user-info";
import {renderErrorMessages} from "../common/render-error-messages";

export class SettingsRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            user: userInfo.getUser(),
            errors
        };
    }

    render() {
        const {submitting, errors, user} = this.state;
        const {history} = this.props;

        const bind = (path) => ({
            value: user[path] == null ? "" : user[path],
            onChange: (e) => this.setState({user: {...user, [path]: e.target.value}}),
        });

        return (
            <Layout
                windowTitle="Settings"
                history={history}
            >
                <div className="settings-page">
                    <div className="container page">
                        <div className="row">

                            <div className="col-md-6 offset-md-3 col-xs-12">
                                <h1 className="text-xs-center">Your Settings</h1>

                                {renderErrorMessages(errors)}
                                <form>
                                    <fieldset>
                                        <fieldset className="form-group">
                                            <input className="form-control" type="text" placeholder="URL of profile picture"
                                                   {...bind("image")}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input className="form-control form-control-lg" type="text" placeholder="Your Name"
                                                   {...bind("username")}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <textarea className="form-control form-control-lg" rows="8" placeholder="Short bio about you"
                                                      {...bind("bio")}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input className="form-control form-control-lg" type="text" placeholder="Email"
                                                   {...bind("email")}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input className="form-control form-control-lg" type="password" placeholder="New Password"
                                                   {...bind("password")}
                                            />
                                        </fieldset>
                                        <button className="btn btn-lg btn-primary pull-xs-right">
                                            Update Settings
                                        </button>
                                    </fieldset>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}