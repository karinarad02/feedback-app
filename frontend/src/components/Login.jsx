import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/authAction.js";
import { useNavigate } from "react-router-dom";

function Login({ setLoggedUsername }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log("Login successful");
        dispatch(loginSuccess(token));
        setLoggedUsername(username);

        if (data.userType === "profesor") {
          navigate("/meniu-profesor");
        } else if (data.userType === "student") {
          navigate("/meniu-student");
        }
      } else {
        setError("Invalid username or password. Please try again.");
        console.error("Login failed");
        dispatch(
          loginFailure("Invalid username or password. Please try again.")
        );
      }
    } catch (error) {
      setError("An error occurred during login. Please try again later.");
      console.error("Error during login:", error);
      dispatch(
        loginFailure("An error occurred during login. Please try again later.")
      );
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={login}>
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="action-button">
          Log In
        </button>
        <div>Nu ai cont? Inregistreaza-te <a href="/register">aici</a>!</div>
      </form>
    </div>
  );
}

export default Login;
