import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import {userInfo} from "../../authen/user-info";
import {WindowTitle} from "./window-title";

export class Layout extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {

        };

        this.onUnmount(userInfo.onChange(() => this.forceUpdate()));
    }

    render() {
        const {children, history, windowTitle} = this.props;

        const renderNavItem = (label, location) => (
            <li className="nav-item">
                {/* Add "active" class when you're on that page" */}
                <Link
                    className={classnames("nav-link", {
                        active: location == history.location.pathname
                    })}
                    to={location}
                >
                    {label}
                </Link>
            </li>
        );

        let user = userInfo.getUser();
        return (
            <Fragment>

                <WindowTitle title={windowTitle == null ? "Conduit" : `${windowTitle} — Conduit`}/>

                <nav className="navbar navbar-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">conduit</Link>
                        <ul className="nav navbar-nav pull-xs-right">
                            {renderNavItem("Home", "/")}

                            {user == null ? (
                                <Fragment>
                                    {renderNavItem("Sign in", "/login")}
                                    {renderNavItem("Sign up", "/register")}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {renderNavItem((
                                        <Fragment>
                                            <i className="ion-compose"></i>&nbsp;New Article
                                        </Fragment>
                                    ), "/editor")}

                                    {renderNavItem((
                                        <Fragment>
                                            <i className="ion-gear-a"></i>&nbsp;Settings
                                        </Fragment>
                                    ), "/settings")}

                                    {renderNavItem((user.username), `/@${user.username}`)}
                                </Fragment>
                            )}
                        </ul>
                    </div>
                </nav>

                {children}

                {/*<footer>*/}
                    {/*<div className="container">*/}
                        {/*<a href="/" className="logo-font">conduit</a>*/}
                        {/*<span className="attribution">*/}
                            {/*An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.*/}
                        {/*</span>*/}
                    {/*</div>*/}
                {/*</footer>*/}
            </Fragment>
        );
    }
}