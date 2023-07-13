import React, { Component, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { fireEvent } from "@testing-library/react";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const checkEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const checkPassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default function(){

    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[email,setEmail]=useState("");    
    const[password,setPassword]=useState("");
    const[successful,setSuccessful]=useState(false);
    const[message,setMessage]=useState("");
    const[checkBtn,setCheckBtn]=useState(null);
    const[form,setForm]=useState(null);

  function handleRegister(e) {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      AuthService.register(
        firstName,
        lastName,
        email,
        password
      ).then(
        response => {
            setMessage(response.data.message);
            setSuccessful(true);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            setMessage(resMessage);
            setSuccessful(false);
        }
      );
    }
  }


    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={handleRegister}
            ref={c => {
                setForm(c);
            }}
          >
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={ev=>setFirstName(ev.target.value)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={lastName}
                    onChange={ev=>setLastName(ev.target.value)}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={ev=>setEmail(ev.target.value)}
                    validations={[required, checkEmail]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={ev=>setPassword(ev.target.value)}
                    validations={[required, checkPassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                setCheckBtn(c);
              }}
            />
          </Form>
        </div>
      </div>
    );
}