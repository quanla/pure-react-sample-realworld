import {RComponent} from "../../../common/r-component";
import {Link} from "react-router-dom";
import {Fragment} from "react";
const {markdown} = require("markdown");

export class MarkDown extends RComponent {

    render() {
        const {value} = this.props;
        return (
            <div dangerouslySetInnerHTML={{__html: markdown.toHTML(value)}}></div>
        );
    }
}