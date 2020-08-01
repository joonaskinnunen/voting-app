/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"

const Home = ({ polls, user }) => {
  const [searchString, setSearchString] = useState("")
  const [pollsToShow, setPollsToShow] = useState(polls)

  const handleSearchChange = (event) => {
    setSearchString(event.target.value.toLowerCase())
    setPollsToShow(polls.filter(poll => poll.question.toLowerCase().includes(event.target.value)))
  }

  const FilteredPolls = () => {
    const results = pollsToShow.map(poll => <ListGroup.Item key={poll.id}><Link to={`/polls/${poll.id}`}>{poll.question}</Link></ListGroup.Item>)
    return (
      <>
        <ListGroup>
          {results.length > 0 ? results.map(result => result) : <p>No matching polls with search word {searchString}</p>}
        </ListGroup>
      </>
    )
  }

  const Polls = () => {
    return (
      <>
        <ListGroup>
          {polls.map(poll => !poll.privatePoll &&
            <ListGroup.Item key={poll.id}><Link to={`/polls/${poll.id}`}>{poll.question}</Link></ListGroup.Item>
          )}
        </ListGroup>
      </>
    )
  }

  return (
    <div>
      <h1>All polls</h1>
      <p>Below you can find all polls created with this app. Select a poll to see the results and vote.</p>{user === null && <p><Link to="/login">Login</Link> to make a new poll.</p>}
      <p style={{ marginBottom: "2px" }}>Search:</p>
      <input value={searchString} onChange={handleSearchChange} style={{ marginBottom: "20px" }}></input>
      {searchString.length === 0 ? <Polls /> : <FilteredPolls />}
    </div>
  )
}

export default Home
