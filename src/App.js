import React, { useState, useEffect } from 'react'
import './App.css'
import pollService from './services/polls'

function App() {
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
      {polls.map(poll => 
        <p>{poll.question}</p>
      )}
    </div>
  )
}

export default App
