/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { Button, Form, Row } from "react-bootstrap"

const NewPoll = ({ polls, pollService, setPolls, setMessage, setMessagevariant }) => {
  const [values, setValues] = useState({ question: "", options: "", optionsObj: {}, allowCustomOption: false, privatePoll: false })

  const formStyle = {
    marginBottom: "20px"
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(values)
    if(values.question.length < 5) {
      setMessagevariant("danger")
      setMessage("Question length must be at least 5 characters long")
    } else if(!values.optionsObj[1]) {
      setMessagevariant("danger")
      setMessage("Give at least two options")
    } else {
      const newObj = { question: values.question, options: values.optionsObj, allowCustomOption: values.allowCustomOption, privatePoll: values.privatePoll }
      pollService.create(newObj).then(response => {
        setPolls(polls.concat(response.data))
        setMessagevariant("success")
        setMessage("A new poll added succesfully!")
        setValues({ question: "", options: "", optionsObj: {}, allowCustomOption: false, privatePoll: false })
      }).catch(error => {
        console.log(error)
        setMessagevariant("danger")
        setMessage("Error. Try again later.")
      })
    }
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
      <Row className="justify-content-center">
        <Form onSubmit={handleSubmit} style={formStyle}>
          <Form.Group>
            <Form.Label><b>Question:</b></Form.Label>
            <Form.Control placeholder="Input poll question" required value={values.question} onChange={({ target }) => handleQuestionChange(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label><b>Options (seperated by line):</b></Form.Label>
            <Form.Control required as="textarea" rows="3" value={values.options} onChange={({ target }) => handleOptionsChange(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Allow users to add their own custom options:</Form.Label>
            <Form.Check onChange={() => setValues({ ...values, allowCustomOption: !values.allowCustomOption })} aria-label="Allow custom options" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Make this poll private. Only people with the direct link has access:</Form.Label>
            <Form.Check onChange={() => setValues({ ...values, privatePoll: !values.privatePoll })} aria-label="Make this poll private" />
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