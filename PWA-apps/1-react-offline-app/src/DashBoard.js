import React from 'react'
import { Link } from 'react-router-dom'

const DashBoard = () => {
    return (
        <div>
            <Link to='/home'>
                <button>
                    Home
                </button>
            </Link>
            <Link to='/users'>
                <button>
                    Users
                </button>
            </Link>
        </div>
    )
}

export default DashBoard
