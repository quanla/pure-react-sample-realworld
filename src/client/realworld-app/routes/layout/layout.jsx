import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Link} from "react-router-dom";
import {userInfo} from "../../authen/user-info";

export class Layout extends RComponent {

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
                            <li className="nav-item">
                                <a className="nav-link" href="">Sign up</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                {children}

                <footer>
                    <div className="container">
                        <a href="/" className="logo-font">conduit</a>
                        <span className="attribution">
                            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                        </span>
                    </div>
                </footer>
            </div>
        );
    }
}