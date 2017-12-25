import classnames from "classnames";
import {RComponent} from "../r-component";

export class LoadingPanel extends RComponent {

    render() {
        const {text} = this.props;
        return (
            <div className="loading-panel">
                {text || "Loading"}...
            </div>
        );
    }
}