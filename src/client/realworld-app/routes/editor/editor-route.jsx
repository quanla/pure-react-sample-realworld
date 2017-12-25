import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {Layout} from "../layout/layout";
import {Link} from "react-router-dom";
import {userApi} from "../../../api/user-api";
import {userInfo} from "../../authen/user-info";
import {renderErrorMessages} from "../common/render-error-messages";
import {articleApi} from "../../../api/article-api";
import {TagListInput} from "./tag-list-input";

export class EditorRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            article: {},
            errors: null,
        };
    }

    doSubmit() {
        const {history} = this.props;
        const {article} = this.state;

        this.setState({submitting: true});
        articleApi.createArticle(article).then(({errors, article}) => {
            if (errors) {
                this.setState({submitting: false, errors});
            } else {
                history.push(`/article/${article.slug}`)
            }
        });
    }

    render() {
        const {submitting, errors, article} = this.state;
        const {history} = this.props;

        const bind = (path) => ({
            value: article && article[path],
            onChange: (newValue) => this.setState({article: {...article, [path]: newValue}}),
        });
        const bindString = (path) => ({
            value: (article == null || article[path] == null) ? "" : article[path],
            onChange: (e) => this.setState({article: {...article, [path]: e.target.value}}),
        });

        return (
            <Layout
                windowTitle="Editor"
                history={history}
            >
                <div className="editor-page">
                    <div className="container page">
                        <div className="row">

                            <div className="col-md-10 offset-md-1 col-xs-12">

                                {renderErrorMessages(errors)}

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        this.doSubmit();
                                    }}
                                >
                                    <fieldset>
                                        <fieldset className="form-group" disabled={article == null || submitting}>
                                            <input type="text" className="form-control form-control-lg" placeholder="Article Title"
                                                   {...bindString("title")}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group" disabled={article == null || submitting}>
                                            <input type="text" className="form-control" placeholder="What's this article about?"
                                                   {...bindString("description")}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group" disabled={article == null || submitting}>
                                            <textarea className="form-control" rows="8" placeholder="Write your article (in markdown)"
                                                      {...bindString("body")}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group" disabled={article == null || submitting}>
                                            <TagListInput
                                                {...bind("tagList")}
                                            />
                                        </fieldset>
                                        <button className="btn btn-lg pull-xs-right btn-primary">
                                            Publish Article
                                        </button>
                                    </fieldset>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}