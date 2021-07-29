import './App.css';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UserLists from './UserLists';
import UserPosts from './UserPosts';
import ChangePost from './ChangePost';
import {fetchPosts} from './redux/User/ActionCreator';


function App(props) {
    useEffect(()=>{
        props.fetchPosts()
    }, []);
    return (
        <>
            {(props.loading)
                ? <h2>Loading ...</h2>
                : <div className="App">
                    <Router>
                        <Switch>
                            <Route exact path={`/`} component={UserLists}/>
                            <Route exact path={`/user${props.curUser}`} component={UserPosts}/>
                            <Route exact path={`/user${props.curUser}/post${props.curPost}`} component={ChangePost}/>
                            <UserPosts />
                            <ChangePost />
                        </Switch>
                    </Router> 
                 </div>
            }
        </>
    );
    
}

const mapStateToProps = (state) =>{
    return{
        loading: state.loading,
        curUser: state.curUser,
        curPost: state.curPost
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchPosts: () => dispatch(fetchPosts())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);