import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import {userInfo} from "../../authen/user-info";

export class Layout extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {

        };

        this.onUnmount(userInfo.onChange(() => this.forceUpdate()));
    }

    render() {
        const {children} = this.props;

        return (
            <div className="">
                <nav className="navbar navbar-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">conduit</Link>
                        <ul className="nav navbar-nav pull-xs-right">
                            <li className="nav-item">
                                {/* Add "active" class when you're on that page" */}
                                <a className="nav-link active" href="">Home</a>
                            </li>

                            {userInfo.getUser() == null ? (
                                <Fragment>
                                    <li className="nav-item">
                                        <a className="nav-link" href="">Sign up</a>
                                    </li>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <li className="nav-item">
                                        <a className="nav-link" href="">
                                            <i className="ion-compose"></i>&nbsp;New Post
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="">
                                            <i className="ion-gear-a"></i>&nbsp;Settings
                                        </a>
                                    </li>
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
            </div>
        );
    }
}