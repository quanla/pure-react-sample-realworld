import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {Cols} from "../../../../utils/cols";

export class TagListInput extends RComponent {

    render() {
        const {value, onChange} = this.props;
        return (
            <Fragment>
                <input type="text" className="form-control" placeholder="Enter tags"
                       onKeyDown={(e) => {
                           if (e.keyCode == 13) {
                               let v = e.target.value;
                               if (v && v.length > 0) {
                                   onChange((value || []).concat([v]));
                                   e.target.value = "";
                                   e.preventDefault();
                               }
                           }

                       }}
                />
                <div className="tag-list">
                    {value && value.map((tag, i) => (
                        <span className="tag-default tag-pill" key={i}>
                            <i
                                className="ion-close-round"
                                onClick={() => onChange(Cols.remove1(value, tag))}
                            />
                            {tag}
                        </span>
                    ))}

                </div>
            </Fragment>
        );
    }
}