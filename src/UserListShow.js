import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ShowList extends React.Component
{
    constructor()
    {
        super()
        this.state={
            users:{},
            posts:[]
        }
    }
    componentDidMount()
    {
        const userId=this.props.match.params.userId
        axios.get(`http://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response=>{
            const users=response.data
            console.log(users)
            this.setState({users})
        })

        axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response=>{
            const posts=response.data
            console.log(posts)
            this.setState({posts})
        })


        .catch(err=>{
            console.log(err)
        })
    }

    render() {
        
        return (
            <div> 
                <h2>USER NAME:- {this.state.users.name}</h2>
                <h2>POSTS WRITTEN BY USERS</h2>
                <ul>
                    {
                        this.state.posts.map((ele,i)=>{
                        return (<li key={i}><Link to={`/users/${ele.id}`}>{ele.title}</Link></li>)
                        })
                    }
                </ul>
            </div> 
        )
    }
}

export default ShowList