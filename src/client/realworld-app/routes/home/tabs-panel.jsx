import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Fragment} from "react";

export class TabsPanel extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedIndex: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.selectedIndex > nextProps.tabs.length - 1) {
            this.setState({selectedIndex: nextProps.tabs.length - 1});
        }
    }

    render() {
        const {className, tabs} = this.props;
        const {selectedIndex} = this.state;

        return (
            <div className={className}>
                <div className="feed-toggle">
                    <ul className="nav nav-pills outline-active">
                        {tabs.map((tab, i) => (
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${selectedIndex == i ? "active" : "disabled"}`}
                                    href=""
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({selectedIndex: i});
                                    }}
                                >{tab.tabLabel}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <Fragment key={selectedIndex}>
                    {tabs[selectedIndex].render()}
                </Fragment>

            </div>
        );
    }
}