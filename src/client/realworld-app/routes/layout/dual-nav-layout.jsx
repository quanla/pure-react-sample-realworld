import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {TransitionGroup, Transition, CSSTransition} from 'react-transition-group';

export class DualNavLayout extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showNav: null,
        };
    }

    makeSpace(direction, active) {
        let enterLeave = active ? "enter" : "exit";
        let dom = ReactDOM.findDOMNode(this);

        if (!active) {
            dom.classList.remove(`${direction}-enter`);
            dom.classList.remove(`${direction}-enter-active`);
        }

        dom.classList.add(`${direction}-${enterLeave}`);
        setTimeout(() => {
            dom.classList.add(`${direction}-${enterLeave}-active`);
        }, 10);

        if (!active) {
            setTimeout(() => {
                dom.classList.remove(`${direction}-exit`);
                dom.classList.remove(`${direction}-exit-active`);
            }, 300);
        }
    }

    render() {
        const {children, contentClassName, className, header,
            renderNavRight, renderNavLeft,
        } = this.props;
        const {showNav} = this.state;

        return (
            <div className={classnames("dual-nav-layout", className)}>
                <div className="main">
                    <div className="header">
                        <img
                            className="left-toggle"
                            src="assets/img/icon-left.png"
                            onClick={() => this.setState({showNav: "left"})}
                        />

                        {header}

                        <img
                            className="right-toggle"
                            src="assets/img/icon-right.png"
                            onClick={() => this.setState({showNav: "right"})}
                        />

                    </div>
                    <div className={`content ${contentClassName}`}>
                        {children}
                    </div>

                    <div
                        className="main-overlay"
                        onClick={() => this.setState({showNav: null})}
                    />
                </div>


                <TransitionGroup
                    className="nav-container"
                >
                    {showNav && (
                        <Fade
                            key={showNav}
                            onEntering={() => this.makeSpace(showNav, true)}
                            onExiting={() => this.makeSpace(showNav, false)}
                        >
                            <div className="nav">
                                {showNav == "right" ? renderNavRight() : renderNavLeft()}
                            </div>
                        </Fade>
                    )}
                </TransitionGroup>
            </div>
        );
    }
}

const duration = 300;

const Fade = ({ children, in: inProp, onEntering, onExiting }) => (
    <Transition in={inProp} timeout={duration}>
        {(state) => {
            // console.log(state);
            state == "entering" && onEntering();
            state == "exiting" && onExiting();

            return (state != "exited") && (
                children
            );
        }}
    </Transition>
);