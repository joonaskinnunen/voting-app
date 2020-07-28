/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import Chart from "react-google-charts"
import { Button, Form, Row, Alert } from "react-bootstrap"

const Poll = ({ polls, pollService, setPolls }) => {
  const [formSelect, setFormSelect] = useState(1)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertVariant, setAlertVariant] = useState("success")
  const id = Number(useParams().id)
  const poll = polls.find(n => n.id === Number(id))
  const options = Object.entries(poll.options)
  const optionsAndVotes = options.map(x => [x[1].option])
  options.map((x, i) => optionsAndVotes[i].push(x[1].votes))
  optionsAndVotes.unshift(["Votes", "Votes per option"])

  const onFormChange = (event) => {
    setFormSelect(event.target.value)
  }

  const vote = (event) => {
    event.preventDefault()
    const newObj = { ...poll, options: { ...poll.options, [formSelect]: { ...poll.options[formSelect], votes: poll.options[formSelect].votes + 1 } } }
    pollService.update(id, newObj).then(response => {
      setPolls(polls.map(poll => poll.id !== id ? poll : response))
      setAlertVariant("success")
      setAlertMessage("Thanks for voting!")
    })
      .catch(error => {
        console.log(error)
        setAlertVariant("danger")
        setAlertMessage("Error. Try again later.")
      })
    setTimeout(() => {
      setAlertMessage("")
    }, 3000)
  }

  return (
    <>
      <h3>{poll.question}</h3>
      <Row className="justify-content-md-center">
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={optionsAndVotes}
          options={{
            title: "Votes",
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
      {alertMessage.length > 0 && <Alert variant={alertVariant}>{alertMessage}</Alert>}
    </>
  )
}

export default Poll
