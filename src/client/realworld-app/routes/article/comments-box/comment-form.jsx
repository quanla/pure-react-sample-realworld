import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../../common/r-component";
import {StringUtil} from "../../../../../utils/string-util";
import {userInfo} from "../../../authen/user-info";
import {articleApi} from "../../../../api/article-api";

export class CommentForm extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            body: null,
            posting: false,
        };
    }

    doPost() {
        const {body} = this.state;
        const {onPost} = this.props;

        this.setState({posting: true});

        onPost(body).then(() => {
            this.setState({body: null, posting: false});
        });
    }

    render() {

        const {body, posting} = this.state;

        let user = userInfo.getUser();
        if (user == null) {
            return (
                <p style={{display: "inherit"}}>
                    <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link> to add comments on this article.
                </p>
            );
        }

        const bind = (statePath) => ({
            value: this.state[statePath] == null ? "" : this.state[statePath],
            onChange: (e) => this.setState({[statePath]: e.target.value}),
        });

        return (
            <form
                className="card comment-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    this.doPost();
                }}
            >
                <div className="card-block">
                    <textarea
                        className="form-control" placeholder="Write a comment..." rows="3"
                        disabled={posting}
                        {...bind("body")}
                    />
                </div>
                <div className="card-footer">
                    <img src={user.image} className="comment-author-img" />
                    <button
                        className="btn btn-sm btn-primary"
                        disabled={posting || StringUtil.isBlank(body)}
                    >
                        Post Comment
                    </button>
                </div>
            </form>
        );
    }
}