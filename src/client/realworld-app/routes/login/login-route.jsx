import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {Layout} from "../layout/layout";
import {Link} from "react-router-dom";
import {userApi} from "../../../api/user-api";
import {O} from "../../../../utils/object-util";
import {userInfo} from "../../authen/user-info";
import {renderErrorMessages} from "../common/render-error-messages";

export class LoginRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            email: "quanla2003@gmail.com",
            password: "123123",
            // email: null,
            // password: null,
            errors: null,
            submitting: false,
        };
    }

    doLogin() {
        const {email, password} = this.state;

        this.setState({submitting: true});

        userApi.login({email, password}).then(({errors, user}) => {

            if (errors) {
                this.setState({submitting: false, errors});
            } else {
                userInfo.setUser(user);
            }
        });
    }

    render() {

        const {submitting, errors} = this.state;
        const {history} = this.props;

        const bind = (statePath) => ({
            value: this.state[statePath] == null ? "" : this.state[statePath],
            onChange: (e) => this.setState({[statePath]: e.target.value}),
        });

        return (
            <Layout
                windowTitle="Sign Up"
                history={history}
            >
                <div className="auth-page">
                    <div className="container page">
                        <div className="row">

                            <div className="col-md-6 offset-md-3 col-xs-12">
                                <h1 className="text-xs-center">Sign In</h1>
                                <p className="text-xs-center">
                                    <Link to="/register">Need an account?</Link>
                                </p>

                                {renderErrorMessages(errors)}

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        this.doLogin();
                                        // return false;
                                    }}
                                >
                                    <fieldset className="form-group" disabled={submitting}>
                                        <input className="form-control form-control-lg" type="text" placeholder="Email"
                                               {...bind("email")}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group" disabled={submitting}>
                                        <input className="form-control form-control-lg" type="password"
                                               placeholder="Password"
                                               {...bind("password")}
                                        />
                                    </fieldset>
                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                    >
                                        Sign in
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}