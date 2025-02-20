import axios from "axios"
const baseUrl = "/api/users"

const signup = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { signup }