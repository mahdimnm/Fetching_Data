import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from './redux/User/ActionCreator';
import './ChangePost.css';
import ReactDOM from 'react-dom';


function ChangePost(props) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [spanText, setSpanText] = useState("");
    const titleRef = useRef();
    const bodyRef = useRef();
    useEffect(()=>{
        const curPostObject = props.posts.filter(post=>post.id === props.curPost)[0];
        setTitle(()=> (curPostObject.title));
        setBody(()=> (curPostObject.body));
           
    },[]);

    const handleChange = (event)=>{
        if(event.target.name === "title"){
            setTitle(() => event.target.value);
        }
        else{
            setBody(() => event.target.value);
        }
    }
    
    const cancelButton = () => {
        window.location.href = "http://localhost:3000/";
    }

    const handleSubmit = (event) => {
        const curPostObject = props.posts.filter(post=>post.id === props.curPost)[0];
        event.preventDefault();
        if(title === curPostObject.title && body === curPostObject.body){
            inputfocus("title");
            setSpanText('You Should Change the Post to submit it.');
        }
        else if(title === ''){
            inputfocus("title");
            setSpanText('You Must Define The Title Of The Post.');
        }
        else if(body === ''){
            inputfocus("body");
            setSpanText('You Must Define The Body Of The Post.');
        }
        else{
            axios.put(`https://jsonplaceholder.typicode.com/posts/${props.curPost}`, {
                id: props.curPost,
                title: title,
                body: body,
                userId: props.curUser
            })
                .then(()=>{
                    props.fetchPosts();
                    window.location.href = "http://localhost:3000/";
                })
                .catch((error)=>{
                    console.log(error.message);
                })
        }
    }

    const inputfocus = (whichInput) => {
        whichInput === "title" ? titleRef.current.focus() : bodyRef.current.focus();
    }

    
    return ReactDOM.createPortal((
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Changing Post</h2>

                <label htmlFor="in-title">Title</label>
                <input ref={titleRef} type="text"
                    name="title" value={title} id="in-title" onChange={handleChange}
                 /><br/>

                <label for="in-body">Body</label>
                <input  ref={bodyRef} htmlFor="text" 
                    name="body" value={body} id="in-body" onChange={handleChange}
                /><br/>

                {(spanText) ? <span>{`*${spanText}`}</span> : null }

                <button type="submit">Change Post</button>
                <button type="button" onClick={cancelButton}>Cancel</button>
            </form>
        </div>
    ), document.getElementById("form"));
    
}

const mapStateToProps = (state) =>{
    return{
        posts: state.posts,
        curUser: state.curUser,
        curPost: state.curPost
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchPosts: () => dispatch(fetchPosts())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePost);