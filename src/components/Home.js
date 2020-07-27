/* eslint-disable react/prop-types */
import React from "react"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"

const Home = ({ polls }) => {
  return (
    <div>
      <h1>All polls</h1>
      <p>Below you can find all polls created with this app. Select a poll to see the results and vote, or sign-in to make a new poll.</p>
      <ListGroup>
        {polls.map(poll =>
          <ListGroup.Item key={poll.id}><Link to={`/polls/${poll.id}`}>{poll.question}</Link></ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default Home
