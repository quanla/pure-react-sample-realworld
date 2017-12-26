import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {Link, Route} from "react-router-dom";
import {profileApi} from "../../../api/profile-api";
import {LoadingPanel} from "../../../common/loading-panel/loading-panel";
import {userInfo} from "../../authen/user-info";
import {FollowButton} from "../common/follow-button";

export class ProfileHeader extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            profile: null,
        };

        profileApi.getProfile(props.username).then((profile) => {
            if (profile == null) {
                props.onInvalidProfile();
                return;
            }
            return this.setState({profile});
        });
    }


    render() {
        const {username} = this.props;
        const {profile} = this.state;

        let user = userInfo.getUser();
        return (
            <Fragment>

                {profile == null ? (
                    <LoadingPanel/>
                ) : (
                    <Fragment>
                        <img src={profile.image} className="user-img" />
                        <h4>{profile.username}</h4>
                        <p>{profile.bio}</p>
                    </Fragment>
                )}
                {user && username == user.username ? (
                    <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
                        <i className="ion-gear-a"/> Edit Profile Settings
                    </Link>
                ) : (
                    <FollowButton
                        className="action-btn"
                        username={username}
                        following={profile && profile.following}
                        onChange={(following) => this.setState({profile: {...profile, following}})}
                    />
                )}
            </Fragment>
        );
    }
}