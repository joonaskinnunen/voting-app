/* eslint-disable react/prop-types */
import React from "react"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"

const MyPolls = ({ polls, user, pollService, setPolls, setMessage, setMessagevariant }) => {
  let myPolls = polls.filter(poll => poll.user.username === user.username)

  const handleRemove = (id, question) => {
    const confirmRemove = window.confirm(`Are you sure you want to delete ${question}`)
    if(confirmRemove) {
      pollService.remove(id).then(response => {
        setPolls(polls.filter(poll => poll.id !== id))
        myPolls = polls.filter(poll => poll.user.id !== user.id)
        setMessagevariant("success")
        setMessage(`The poll ${response.question} deleted`)
      }).catch(error => {
        console.log(error)
        setMessagevariant("danger")
        setMessage("Error. Try again later.")
      })
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }

  const PollsListing = () => {
    return (
      <>
        <p>From below you can find all your polls</p>
        <ListGroup>
          {myPolls.map(poll =>
            <ListGroup.Item key={poll.id}><Link to={`/polls/${poll.id}`}>{poll.question}</Link><button style={{ backgroundColor: "white", border: "none", marginLeft: "20px" }} onClick={() => handleRemove(poll.id, poll.question)}><Trash /></button></ListGroup.Item>
          )}
        </ListGroup>
      </>
    )
  }
  return (
    <div>
      <h1>My polls</h1>
      {myPolls.length > 0 ? <PollsListing /> : <p>You have no polls yet. <Link to="/newpoll">Create your fist poll now!</Link></p>}
    </div>
  )
}

export default MyPolls