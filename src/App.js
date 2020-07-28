import React, { useState, useEffect } from "react"
import "./App.css"
import pollService from "./services/polls"
import Poll from "./components/Poll"
import Home from "./components/Home"
import Header from "./components/Header"
import { Container } from "react-bootstrap"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import NewPoll from "./components/NewPoll"

const App = () => {
  const [polls, setPolls] = useState([])

  useEffect(() => {
    pollService
      .getAll()
      .then(initialPolls => {
        console.log(initialPolls)
        setPolls(initialPolls)
      })
  }, [])

  return (
    <div className="App">
      <Container fluid>
        <Header />
        <Router>
          <Switch>
            <Route path="/newpoll">
              <NewPoll polls={polls} setPolls={setPolls} pollService={pollService} />
            </Route>
            <Route path="/polls/:id">
              <Poll polls={polls} setPolls={setPolls} pollService={pollService} />
            </Route>
            <Route path="/">
              <Home polls={polls} />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  )
}

export default App
