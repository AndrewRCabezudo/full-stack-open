import axios from 'axios'
const baseURL = 'http://localhost:3001/phonebook'

const create = newEntry => {
    const request = axios.post(baseURL, newEntry)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const update = (id, newEntry) => {
    const request = axios.put(`${baseURL}/${id}`, newEntry)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default { create, getAll, update, remove }