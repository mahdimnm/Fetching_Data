import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { changeCurrentPost } from './redux/User/ActionCreator';
import "./UserPosts.css";
import UserLists from './UserLists';

function UserPosts(props){
    const posts = props.posts.filter(post => post.userId === props.curUser);
    return(
        <>
        <UserLists/>
        <div className="user-posts-container">
            <h3>User {props.curUser} Posts:</h3>
            <ul className="posts-list">
                {posts.map(post => <li key={post.id} className="posts-li" onClick={()=>props.curPostChange(post.id)}>
                                        <Link to={`/user${props.curUser}/post${post.id}`}>{post.title}</Link>
                                </li>)}
            </ul>
        </div>
        </>
    );
}

const mapStateToProps = (state) =>{
    return{
        posts: state.posts,
        curUser: state.curUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        curPostChange: post => dispatch(changeCurrentPost(post))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);