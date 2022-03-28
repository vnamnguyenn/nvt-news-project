import React from 'react'
import {useParams} from 'react-router-dom'
const Post = () =>{
    let { postSlug } = useParams();
    return(
        <div>
            This is {postSlug}
        </div>
    )   
}
export default Post;