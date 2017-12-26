import classnames from "classnames";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import {RComponent} from "../../../../common/r-component";
import {articleApi} from "../../../../api/article-api";
import {CommentForm} from "./comment-form";
import {Cols} from "../../../../../utils/cols";
import {LoadingPanel} from "../../../../common/loading-panel/loading-panel";

export class CommentsBox extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            comments: null,
        };

        articleApi.getComments(props.articleSlug).then((comments) => this.setState({comments}));
    }

    render() {
        const {comments} = this.state;
        const {articleSlug} = this.props;

        return (
            <Fragment>

                <CommentForm
                    onPost={(body) => articleApi.postComment(body, articleSlug).then((comment) => this.setState({comments: (comments||[]).concat([comment])}))}
                />

                {comments==null ? (
                    <LoadingPanel text="Loading comments"/>
                ) : (
                    comments.map((comment, i) => (
                        <div className="card" key={i}>
                            <div className="card-block">
                                <p className="card-text">{comment.body}</p>
                            </div>
                            <div className="card-footer">
                                <Link to={`/@${comment.author.username}`} className="comment-author">
                                    <img src={comment.author.image} className="comment-author-img" />
                                </Link>
                                &nbsp;
                                <a href="" className="comment-author">{comment.author.username}</a>
                                <span className="date-posted">{new Date(comment.createdAt).toLocaleString()}</span>

                                <span className="mod-options">
                              <i
                                  className="ion-trash-a"
                                  onClick={() => articleApi.deleteComment(comment.id, articleSlug).then(() => this.setState({comments: Cols.remove1(comments, comment)}))}
                              />
                            </span>
                            </div>
                        </div>
                    ))
                )}
            </Fragment>
        );
    }
}