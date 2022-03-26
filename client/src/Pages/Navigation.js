import React from 'react'
import {Link} from 'react-router-dom'
const Navigation = () => {
    return(
        <div>
            <h3>Logo</h3>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/post'>Post</Link></li>
                <li><Link to='/video'>Contact</Link></li>
                <li><Link to='/user'>Post</Link></li>
                <li><Link to='/category'>Contact</Link></li>
                <li><Link to='/tag'>Contact</Link></li>
            </ul>
        </div>
    )
}

export default Navigation;