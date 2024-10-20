import React, { useState, useEffect } from "react"
import { Form, Input, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import axios from "axios"
import { loginUrl } from "../utils/urls"

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // form submit
  const formSubmitHandler = async (values) => {
    try {
      setLoading(true)
      const { data } = await axios.post(loginUrl, values)
      message.success("Login successful")
      setLoading(false)
      // Add the login information to local storage
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }))
      navigate("/")
    } catch (error) {
      setLoading(false)
      message.error("Invalid username or password")
    }
  }

  // Prevent multiple login for logged in user
  useEffect(() => {
    if(localStorage.getItem('user'))
      navigate('/')
  }, [navigate])

  return (
    <>
      {loading && <Spinner />}
      <div className="register-page">
        <Form layout="vertical" onFinish={formSubmitHandler}>
          <h1>Login Form</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register">Not a user ? Click here to Register</Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Login
