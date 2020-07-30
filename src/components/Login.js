/* eslint-disable react/prop-types */
import React from "react"
import { Button, Form, Row } from "react-bootstrap"
import pollService from "../services/polls"

const Login = ( { loginService, setUsername, username, setPassword, password, setUser, setMessage, setMessagevariant } ) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)

      window.localStorage.setItem(
        "loggedVoteappUser", JSON.stringify(user)
      )

      console.log(window.localStorage.getItem("loggedVoteappUser"))

      pollService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      setMessagevariant("success")
      setMessage(`${username} logged in successfully!`)
    } catch (exception) {
      console.log(exception)
      setMessagevariant("danger")
      setMessage("Wrong username or password")
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <>
      <h3>Login</h3>
      <Row className="justify-content-center">
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control required value={username} key="1" onChange={({ target }) => setUsername(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control required type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </>  )
}

export default Login
