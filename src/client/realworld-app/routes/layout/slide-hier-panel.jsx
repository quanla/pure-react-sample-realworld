import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export class SlideHierPanel extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            stack: [],
            direction: null,
        };
    }

    render() {
        const {hierData, render, goInto} = this.props;
        const {stack, direction} = this.state;
        const shownData = stack.reduce((curr, index) => goInto(curr, index), hierData);

        return (
            <div className="slide-hier-panel">

                <TransitionGroup className={classnames("panels-container", direction)}>
                    <CSSTransition
                        timeout={3000}
                        classNames="slide"
                        key={stack.length}
                    >
                        {render(shownData, {
                            onBack: stack.length == 0 ? null : (() => this.setState({
                                stack: stack.slice(0, stack.length - 1),
                                direction: "left"
                            })),
                            onForward: (index) => this.setState({
                                stack: stack.concat([index]),
                                direction: "right",
                            })
                        })}
                    </CSSTransition>
                </TransitionGroup>

            </div>
        );
    }
}