import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/authAction.js";
import { useNavigate } from "react-router-dom";

function Register({ setLoggedUsername }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("student");
  const [formMessage, setFormMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setFormMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, type }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful");

        const loginResponse = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          const loginToken = loginData.token;
          dispatch(loginSuccess(loginToken));
          setLoggedUsername(username);

          if (type === "profesor") {
            navigate("/meniu-profesor");
          } else if (type === "student") {
            navigate("/meniu-student");
          }
        } else {
          setFormMessage("Login after registration failed.");
          console.error("Login after registration failed");
          dispatch(loginFailure("Login after registration failed."));
        }
      } else {
        setFormMessage("Registration failed. Please try again.");
        console.error("Registration failed");
        dispatch(loginFailure("Registration failed. Please try again."));
      }
    } catch (error) {
      setFormMessage(
        "An error occurred during registration. Please try again later."
      );
      console.error("Error during registration:", error);
      dispatch(
        loginFailure(
          "An error occurred during registration. Please try again later."
        )
      );
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={register}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="type">User Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="profesor">Profesor</option>
          </select>
        </div>
        {formMessage && <p className="redform-message">{formMessage}</p>}
        <button type="submit" className="action-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
