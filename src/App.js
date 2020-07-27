import React, { useState, useEffect } from "react"
import "./App.css"
import pollService from "./services/polls"
import Poll from "./components/Poll"
import Home from "./components/Home"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

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
      <Router>
        <Switch>
          <Route path="/polls/:id">
            <Poll polls={polls} pollService={pollService} />
          </Route>
          <Route path="/">
            <Home polls={polls} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
