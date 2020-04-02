import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'

class PostList extends React.Component
{
    constructor()
    {
        super()
        this.state={
            posts:[]
        }
    }
    componentDidMount()
    {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response=>{
            const posts=response.data
            this.setState({posts})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render()
    {
        return(
        <div>
            <h2>Total Posts - {this.state.posts.length}</h2>
            <ul>
                {
                    this.state.posts.map((ele,i)=>{
                    return (<li key={i}><Link to={`/posts/${ele.id}`}>{ele.title}</Link></li>)
                    })
                }
            </ul>
        </div>
        )
    }
}

export default PostList