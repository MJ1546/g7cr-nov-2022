import React from 'react'
import { useEffect, useState } from "react";
import { getUsers } from './users.service';

const Users = () => {
    const [usersState, setUsersState] = useState([])
    const [networkMode, setNetworkMode] = useState(true)
    useEffect(() => {
        /*
                getUsers()
                    .then(
                        (resp) => {
                            const result = resp.data
                            localStorage.setItem('users', JSON.stringify(result))
                            setUsersState(result)
                        },
                        e => {
                            setNetworkMode(false)
                            console.log(e)
                            setUsersState(JSON.parse(localStorage.getItem('users')))
                        }
                    )
                    */

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(
                (resp) => {
                    resp.json().then(
                        (result) => {
                            localStorage.setItem('users', JSON.stringify(result))
                            setUsersState(result)
                        },
                        err => console.log(err)
                    )
                },
                (e) => {
                    setNetworkMode(false)
                    console.log(e)
                    setUsersState(JSON.parse(localStorage.getItem('users')))
                }
            )

    }, [])

    return (
        <>
            <div>
                {
                    !networkMode ? <span>You are in offline mode</span> : null
                }
            </div>
            <span>Users list</span>
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            User Name
                        </th>
                        <th>
                            Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersState.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Users
