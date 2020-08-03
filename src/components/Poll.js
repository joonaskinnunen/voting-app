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

const Poll = ({ polls, setPolls, pollService, setMessage, setMessagevariant, user }) => {
  const [formSelect, setFormSelect] = useState(0)
  const [newOption, setNewOption] = useState("")

  const id = useParams().id
  const poll = polls.find(n => n.id === id) ? polls.find(n => n.id === id) : {
    question: "",
    options: {
    },
    user: "5f20649238fe084778d799a6",
  }
  const options = Object.entries(poll.options)
  const optionsAndVotes = options.map(x => [x[1].option])
  options.map((x, i) => optionsAndVotes[i].push(x[1].votes))
  optionsAndVotes.unshift(["Votes", "Votes per option"])

  const onFormChange = (event) => {
    setFormSelect(event.target.value)
  }

  const vote = (event) => {
    event.preventDefault()
    let newObj = { ...poll, options: { ...poll.options, [Object.keys(poll.options).length] : { option: newOption, votes: 1 } } }
    if(formSelect !== "newOption") {
      newObj = { ...poll, options: { ...poll.options, [formSelect]: { ...poll.options[formSelect], votes: poll.options[formSelect].votes + 1 } } }
    }
    if(localStorage.getItem(id)) {
      setMessagevariant("danger")
      setMessage("Error: You can only vote once a poll.")
    } else {
      pollService.update(id, newObj).then(response => {
        setPolls(polls.map(poll => poll.id !== id ? poll : response))
        setMessagevariant("success")
        setMessage("Thanks for voting!")
        window.localStorage.setItem(
          id, id
        )
      })
        .catch(error => {
          console.log(error)
          setMessagevariant("danger")
          setMessage("Error. Try again later.")
        })
    }
    setTimeout(() => {
      setMessage("")
    }, 3000)
  }

  const countVotes = () => {
    let votes = 0
    for(let i = 1; i < optionsAndVotes.length; i++) {
      votes += optionsAndVotes[i][1]
    }
    return votes
  }

  return (
    <>
      <h3>{poll.question}</h3>
      <Row className="justify-content-center">
        {countVotes() > 0 ?
          <Chart
            width={"400px"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={optionsAndVotes}
            options={{
              title: "Votes",
              is3D: true
            }}
            rootProps={{ "data-testid": "1" }}
          /> : <p style={{ width: "200px" }}><b>No votes yet</b></p>}
        <Form inline onSubmit={vote}>
          <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
        I'd like to vote for:
          </Form.Label>
          <Form.Control
            onChange={onFormChange}
            as="select"
            className="my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            custom
          >
            {options.map(option => <option value={option[0]} key={option[0]}>{option[1].option}</option>)}
            {(user && poll.allowCustomOption) && <option value="newOption" key={9999}>I'd like a custom option</option>}
          </Form.Control>
          {formSelect === "newOption" && <Form.Control required placeholder="Input your own option" value={newOption} onChange={({ target }) => setNewOption(target.value)} />}
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
