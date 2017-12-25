import {RComponent} from "../../../common/r-component";
import {Link} from "react-router-dom";
import {Fragment} from "react";
const {marked} = require("marked");

export class MarkDown extends RComponent {

    render() {
        const {value} = this.props;
        return (
            <div dangerouslySetInnerHTML={{__html: marked(value)}}></div>
        );
    }
}