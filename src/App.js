import React, { useState, useEffect } from "react"
import "./App.css"
import pollService from "./services/polls"
import loginService from "./services/login"
import signupService from "./services/signup"
import Poll from "./components/Poll"
import NewPoll from "./components/NewPoll"
import Home from "./components/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { Container } from "react-bootstrap"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom"
import MessageAlert from "./components/MessageAlert"
import MyPolls from "./components/MyPolls"

const App = () => {
  const [polls, setPolls] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageVariant, setMessageVariant] = useState("")

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedVoteappUser")
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

  useEffect(() => {
    document.title = "Voting App"
  }, [])

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
    setMessageVariant("success")
    setMessage("Logged out successfully")
    setTimeout(() => {
      setMessage("")
    }, 3000)
  }

  return (
    <div>
      <Container fluid>
        <Router>
          <Header user={ user } logout={ handleLogout } />
          <Switch>
            <Route path="/polls/:id">
              <Poll polls={polls} setPolls={setPolls} pollService={pollService} setMessage={setMessage} setMessagevariant={setMessageVariant} user={user}/>
            </Route>
            <Route path="/login">
              {user !== null ? <Redirect to="/mypolls" /> : <Login loginService={loginService} user={user} setUser={setUser} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setMessage={setMessage} setMessagevariant={setMessageVariant} />}
            </Route>
            <Route path="/signup">
              {user !== null ? <Redirect to="/mypolls" /> : <Signup signupService={signupService} setMessage={setMessage} setMessagevariant={setMessageVariant} />}
            </Route>
            <Route path="/newpoll">
              {user !== null ? <NewPoll polls={polls} setPolls={setPolls} pollService={pollService} setMessage={setMessage} setMessagevariant={setMessageVariant} /> : <p>You have to <Link to="/login">login</Link> to create a new poll</p> }
            </Route>
            <Route path="/mypolls">
              {user !== null ? <MyPolls polls={polls} user={user} pollService={pollService} setPolls={setPolls} setMessage={setMessage} setMessagevariant={setMessageVariant} /> : <p><Link to="/login">Login</Link> to see your polls.</p> }
            </Route>
            <Route path="/">
              <Home polls={polls} user={user} />
            </Route>
          </Switch>
        </Router>
        <div style={{ width: "300px", margin: "auto" }}>
          <MessageAlert message={message} messageVariant={messageVariant} />
        </div>
        <Footer />
      </Container>
    </div>
  )
}

export default App
