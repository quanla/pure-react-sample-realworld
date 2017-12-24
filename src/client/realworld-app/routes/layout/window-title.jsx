import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";

export class WindowTitle extends RComponent {

    constructor(props, context) {
        super(props, context);

        document.title = props.title;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title != this.props.title) {
            document.title = nextProps.title;
        }
    }

    render() {
        return null;
    }
}