import React, { useState, useEffect } from "react"
import { Form, Input, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import axios from "axios"
import { registerUrl } from "../utils/urls"

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // form submit
  const formSubmitHandler = async (values) => {
    try {
      setLoading(true)
      await axios.post(registerUrl, values)
      message.success("Registration successful")
      setLoading(false)
      navigate("/login")
    } catch (error) {
      setLoading(false)
      message.error("Invalid username or password")
    }
  }

  // Prevent registration for logged in user
  useEffect(() => {
    if(localStorage.getItem('user'))
      navigate('/')
  }, [navigate])

  return (
    <>
      {loading && <Spinner />}
      <div className="register-page">
        <Form layout="vertical" onFinish={formSubmitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already registered ? Click here to Login</Link>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Register
