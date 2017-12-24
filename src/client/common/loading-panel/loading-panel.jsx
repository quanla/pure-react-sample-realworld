import classnames from "classnames";
import {RComponent} from "../r-component";

export class LoadingPanel extends RComponent {

    render() {
        return (
            <div className="loading-panel">
                Loading...
            </div>
        );
    }
}