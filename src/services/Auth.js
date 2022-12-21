import axios from "axios"

// const baseUrl = "https://localhost:5001/api/authentication"
const baseUrl = "https://webapiharjoituskoodi.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}


export default { authenticate }

