/* eslint-disable react/prop-types */
import React from "react"
import { Link } from "react-router-dom"

const Home = ({ polls }) => {
  console.log(polls)
  return (
    <div>
      <ul>
        {polls.map(poll =>
          <li key={poll.id}><Link to={`/polls/${poll.id}`}>{poll.question}</Link></li>
        )}
      </ul>
    </div>
  )
}

export default Home
