import React from 'react'
import Logout from './Logout'

function Header() {
  return (
    <div>
        <nav>
            <h1>Todo List</h1>
            <ul>
                <li>Home</li>
            </ul>
            <Logout/>
        </nav>
    </div>
  )
}

export default Header