import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";

export class CommentsBox extends RComponent {

    render() {
        return (
            <Fragment>

                <form className="card comment-form">
                    <div className="card-block">
                        <textarea className="form-control" placeholder="Write a comment..." rows="3"/>
                    </div>
                    <div className="card-footer">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                        <button className="btn btn-sm btn-primary">
                            Post Comment
                        </button>
                    </div>
                </form>

                <div className="card">
                    <div className="card-block">
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div className="card-footer">
                        <a href="" className="comment-author">
                            <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                        </a>
                        &nbsp;
                        <a href="" className="comment-author">Jacob Schmidt</a>
                        <span className="date-posted">Dec 29th</span>
                    </div>
                </div>

                <div className="card">
                    <div className="card-block">
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div className="card-footer">
                        <a href="" className="comment-author">
                            <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                        </a>
                        &nbsp;
                        <a href="" className="comment-author">Jacob Schmidt</a>
                        <span className="date-posted">Dec 29th</span>
                        <span className="mod-options">
              <i className="ion-edit"/>
              <i className="ion-trash-a"/>
            </span>
                    </div>
                </div>
            </Fragment>
        );
    }
}