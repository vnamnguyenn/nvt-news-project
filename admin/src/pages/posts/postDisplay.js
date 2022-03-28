import React from 'react'
import {useParams} from 'react-router-dom'
const PostDetail = () =>{
    let { id } = useParams();
    return(
        <div>
            This is {id}
        </div>
    )   
}
export default PostDetail;