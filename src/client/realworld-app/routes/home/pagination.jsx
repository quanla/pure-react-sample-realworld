import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {LoopUtil} from "../../../../utils/loop-util";

export class Pagination extends RComponent {
    render() {

        const {total, current, onChange} = this.props;

        return (
            <nav>
                <ul className="pagination">
                    {LoopUtil.indexLoop(Math.max(total,current + 1)).map((i) => (
                        <li
                            className={classnames("page-item", {
                                active: i == current
                            })}
                        >
                            <a
                                className="page-link"
                                href=""
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChange(i);
                                }}
                            >
                                {i+1}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}