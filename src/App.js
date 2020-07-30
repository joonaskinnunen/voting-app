import React, { useState, useEffect } from "react"
import "./App.css"
import pollService from "./services/polls"
import loginService from "./services/login"
import signupService from "./services/signup"
import Poll from "./components/Poll"
import NewPoll from "./components/NewPoll"
import Home from "./components/Home"
import Header from "./components/Header"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { Container } from "react-bootstrap"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import MessageAlert from "./components/MessageAlert"

const App = () => {
  const [polls, setPolls] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageVariant, setMessageVariant] = useState("")

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedVoteappUser")
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      pollService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    pollService
      .getAll()
      .then(initialPolls => {
        setPolls(initialPolls)
      })
  }, [])

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
  }

  return (
    <div>
      <Container fluid>
        <Header user={ user } logout={ handleLogout } />
        <Router>
          <Switch>
            <Route path="/newpoll">
              {user !== null ? <NewPoll polls={polls} setPolls={setPolls} pollService={pollService} setMessage={setMessage} setMessagevariant={setMessageVariant} /> : <Redirect to="/" />}
            </Route>
            <Route path="/polls/:id">
              <Poll polls={polls} setPolls={setPolls} pollService={pollService} setMessage={setMessage} setMessagevariant={setMessageVariant}/>
            </Route>
            <Route path="/login">
              {user !== null ? <Redirect to="/" /> : <Login loginService={loginService} user={user} setUser={setUser} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setMessage={setMessage} setMessagevariant={setMessageVariant} />}
            </Route>
            <Route path="/signup">
              {user !== null ? <Redirect to="/" /> : <Signup signupService={signupService} setMessage={setMessage} setMessagevariant={setMessageVariant} />}
            </Route>
            <Route path="/">
              <Home polls={polls} />
            </Route>
          </Switch>
        </Router>
        <div style={{ width: "300px", margin: "auto"}}>
          <MessageAlert message={message} messageVariant={messageVariant} />
        </div>
      </Container>
    </div>
  )
}

export default App
