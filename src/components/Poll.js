/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import Chart from "react-google-charts"
import { Button, Form, Row } from "react-bootstrap"
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share"

const Poll = ({ polls, pollService, setPolls, setMessage, setMessagevariant }) => {
  const [formSelect, setFormSelect] = useState(0)
  const id = useParams().id
  console.log(polls)
  const poll = polls.find(n => n.id === id)
  console.log(poll)
  const options = Object.entries(poll.options)
  const optionsAndVotes = options.map(x => [x[1].option])
  options.map((x, i) => optionsAndVotes[i].push(x[1].votes))
  optionsAndVotes.unshift(["Votes", "Votes per option"])

  const onFormChange = (event) => {
    setFormSelect(event.target.value)
    console.log(poll)
  }

  const vote = (event) => {
    event.preventDefault()
    const newObj = { ...poll, options: { ...poll.options, [formSelect]: { ...poll.options[formSelect], votes: poll.options[formSelect].votes + 1 } } }
    pollService.update(id, newObj).then(response => {
      setPolls(polls.map(poll => poll.id !== id ? poll : response))
      setMessagevariant("success")
      setMessage("Thanks for voting!")
    })
      .catch(error => {
        console.log(error)
        setMessagevariant("danger")
        setMessage("Error. Try again later.")
      })
    setTimeout(() => {
      setMessage("")
    }, 3000)
  }

  return (
    <>
      <h3>{poll.question}</h3>
      <Row className="justify-content-center">
        <Chart
          width={"300px"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={optionsAndVotes}
          options={{
            title: "Votes",
            is3D: true
          }}
          rootProps={{ "data-testid": "1" }}
        />
        <Form inline onSubmit={vote}>
          <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
        I'd like to vote for...:
          </Form.Label>
          <Form.Control
            onChange={onFormChange}
            as="select"
            className="my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            custom
          >
            {options.map(option => <option value={option[0]} key={option[0]}>{option[1].option}</option>)}
          </Form.Control>
          <Button type="submit" className="my-1">
        Vote
          </Button>
        </Form>
      </Row>
      <p style={{ marginTop: "30px" }}>Share this poll:</p>
      <FacebookShareButton url={window.location.href}><FacebookIcon size={40} round={true} /></FacebookShareButton>
      <TwitterShareButton url={window.location.href}><TwitterIcon size={40} round={true} /></TwitterShareButton>
      <WhatsappShareButton url={window.location.href}><WhatsappIcon size={40} round={true} /></WhatsappShareButton>
    </>
  )
}

export default Poll
