/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { Button, Form, Row } from "react-bootstrap"

const NewPoll = ({ polls, pollService, setPolls, setMessage, setMessagevariant }) => {
  const [values, setValues] = useState({ question: "", options: "", optionsObj: {} })

  const formStyle = {
    marginBottom: "20px"
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newObj = { question: values.question, options: values.optionsObj }
    pollService.create(newObj).then(response => {
      setPolls(polls.concat(response.data))
      setMessagevariant("success")
      setMessage("A new poll added succesfully!")
      setValues({ question: "", options: "", optionsObj: {} })
    }).catch(error => {
      console.log(error)
      setMessagevariant("danger")
      setMessage("Error. Try again later.")
    })
    setTimeout(() => {
      setMessage("")
    }, 3000)
  }

  const handleQuestionChange = (value) => {
    setValues({ ...values, question: value })
  }

  const handleOptionsChange = (value) => {
    const array = value.split(/\r?\n/)
    let optionsObj = {}
    array.map((option, i) => option.length > 0 ? optionsObj[i] = { option: option, votes: 0 } : void 0)
    setValues({ ...values, optionsObj: optionsObj, options: value })
  }

  return (
    <>
      <h3>Add a new poll</h3>
      <Row className="justify-content-lg-center">
        <Form onSubmit={handleSubmit} style={formStyle}>
          <Form.Group>
            <Form.Label>Question</Form.Label>
            <Form.Control placeholder="Input poll question" required value={values.question} onChange={({ target }) => handleQuestionChange(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Options (seperated by line):</Form.Label>
            <Form.Control required as="textarea" rows="3" value={values.options} onChange={({ target }) => handleOptionsChange(target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </>
  )
}

export default NewPoll