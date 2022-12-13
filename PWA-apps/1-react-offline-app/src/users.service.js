import Axios from 'axios'
export function getUsers() {
    return Axios.get('https://jsonplaceholder.typicode.com/users')
}