import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {Fragment} from "react";
import {SensiblePointer} from "./sensible-pointer";

export class TabsPanel extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedIndex: this.determineTab(props.tabs, 0),
        };
    }

    determineTab(tabs, current) {
        return SensiblePointer.determine(tabs, {current, disabled: (tab) => !tab, forced: (tab) => tab && tab.forced});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectedIndex: this.determineTab(nextProps.tabs, this.state.selectedIndex)});
    }

    render() {
        const {className, tabs, onChange} = this.props;
        const {selectedIndex} = this.state;

        return (
            <div className={className}>
                <div className="feed-toggle">
                    <ul className="nav nav-pills outline-active">
                        {tabs.map((tab, i) =>
                            !!tab && (
                                <li className="nav-item" key={i}>
                                    <a
                                        className={`nav-link ${selectedIndex == i && "active"}`}
                                        href=""
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (i != selectedIndex) {
                                                this.setState({selectedIndex: i});
                                                onChange();
                                            }
                                        }}
                                    >{tab.tabLabel}</a>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <Fragment key={selectedIndex}>
                    {tabs[selectedIndex].render()}
                </Fragment>

            </div>
        );
    }
}