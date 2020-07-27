/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import Chart from "react-google-charts"
import { Button, Form } from "react-bootstrap"

const Poll = ({ polls, pollService }) => {
  const [formSelect, setFormSelect] = useState(1)
  const id = useParams().id
  const poll = polls.find(n => n.id === Number(id))
  const options = Object.entries(poll.options)
  const optionsAndVotes = options.map(x => [x[1].option])
  options.map((x, i) => optionsAndVotes[i].push(x[1].votes))
  optionsAndVotes.unshift(["Votes", "Votes per option"])

  const listStyle = {
    listStyleType: "none"
  }

  const onFormChange = (event) => {
    setFormSelect(event.target.value)
  }

  const vote = (event) => {
    event.preventDefault()
    console.log(formSelect)
    const newObj = { ...poll, options: { ...poll.options, [formSelect]: { ...poll.options[formSelect], votes: poll.options[formSelect].votes + 1 } } }
    console.log(newObj)
    pollService.update(id, newObj)
  }

  return (
    <div>
      <h3>{poll.question}</h3>
      <ul style={listStyle}>
        {options.map(x => <li key={x[1].option}>{x[1].option}</li>)}
      </ul>
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
        Submit
        </Button>
      </Form>

    </div>
  )
}

export default Poll
