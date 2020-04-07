import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ShowListPost extends React.Component
{
    constructor()
    {
        super()
        this.state={
            users:[],
            posts:[],
            comments:[]
        }
    }
    componentDidMount()
    {
        
        const id=this.props.match.params.userId
        
        axios.get(`http://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response=>{
            const posts=response.data
            console.log(posts)
            this.setState({posts})

            axios.get(`http://jsonplaceholder.typicode.com/users/${posts.userId}`)
        .then(response=>{
            const users=response.data
            console.log(users)
            this.setState({users})
        })
        })

        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(response=>{
            const comments=response.data
            console.log(comments)
            this.setState({comments})
        })

        .catch(err=>{
            console.log(err)
        })
    }

    render() {
        console.log('user',this.state.users)
        console.log('post',this.state.posts)
        console.log('comments',this.state.comments)
        return (
            <div> 
                <h2>USER NAME:- {this.state.users.name}</h2>
                <h2>TITLE :-
                    {
                        this.state.posts.title
                    }
                </h2>
                <h2>BODY:-
                    {
                        this.state.posts.body
                    }
                </h2>
                <hr/>
                <h2>Comments:</h2>
                <ul>
                    {
                        this.state.comments.map((ele,i)=>{
                        return (<li key={i}>{ele.body}</li>)
                        })
                    }
                </ul><hr/>
                <p><Link to={`/users/${this.state.users.id}`}>More Posts from author:{this.state.users.name}</Link></p>
            </div> 
        )
    }
}

export default ShowListPost