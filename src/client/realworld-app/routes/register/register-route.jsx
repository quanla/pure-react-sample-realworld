import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {Layout} from "../layout/layout";
import {Link} from "react-router-dom";
import {userApi} from "../../../api/user-api";
import {O} from "../../../../utils/object-util";

export class RegisterRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            email: null,
            password: null,
            username: null,
            errors: null,
            submitting: false,
        };
    }

    doRegister() {
        const {history} = this.props;
        const {email, password, username} = this.state;

        this.setState({submitting: true});

        userApi.register({email, password, username}).then(({errors}) => {

            if (errors) {
                this.setState({submitting: false, errors});
            } else {
                history.push("/");
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

        const renderErrorMessages = () => (
            errors && (
                <ul className="error-messages">
                    {O.mapValuesToList(errors, (errList, field) => (
                        errList.map((errMessage) => (
                            <li>{field} {errMessage}</li>
                        ))
                    ))}
                </ul>
            )
        );

        return (
            <Layout
                windowTitle="Sign Up"
                history={history}
            >
                <div className="auth-page">
                    <div className="container page">
                        <div className="row">

                            <div className="col-md-6 offset-md-3 col-xs-12">
                                <h1 className="text-xs-center">Sign up</h1>
                                <p className="text-xs-center">
                                    <Link to="/login">Have an account?</Link>
                                </p>

                                {renderErrorMessages()}

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        this.doRegister();
                                        // return false;
                                    }}
                                >
                                    <fieldset className="form-group" disabled={submitting}>
                                        <input className="form-control form-control-lg" type="text" placeholder="Your Name"
                                               {...bind("username")}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group" disabled={submitting}>
                                        <input className="form-control form-control-lg" type="text" placeholder="Email"
                                               {...bind("email")}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group" disabled={submitting}>
                                        <input className="form-control form-control-lg" type="password" placeholder="Password"
                                               {...bind("password")}
                                        />
                                    </fieldset>
                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                    >
                                        Sign up
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