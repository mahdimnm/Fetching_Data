import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { changeCurrentUser } from './redux/User/ActionCreator';
import "./UserLists.css"

function UserLists(props){
    let count = 0;
    const usersId = props.users.filter(user =>{
        let temp=count;
        if(count !== user.userId){
            count++;
        }
        return (user.userId !== temp);
    })

    return(
        <ul className="users-list">
            {usersId.map((user) => <li 
                                    key={user.userId}
                                    className={(props.curUser === user.userId) ? "user-li active" :"user-li"}
                                    onClick={()=>props.curUserChange(user.userId)}
                                    > <Link to={`/user${user.userId}`}>User {user.userId}</Link></li>)}
        </ul>
    );

    
}
const mapStateToProps = (state) =>{
    return{
        users: state.posts,
        curUser: state.curUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        curUserChange: user => dispatch(changeCurrentUser(user))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLists);