import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./components/Login";
import Register from "./components/Register";
import MeniuProfesor from "./components/MeniuProfesor";
import MeniuStudent from "./components/MeniuStudent";
import ActivitateProfesor from "./components/ActivitateProfesor";
import ActivitateStudent from "./components/ActivitateStudent";

const App = () => {
  const [loggedUsername, setLoggedUsername] = useState(null);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login setLoggedUsername={setLoggedUsername} />}
          />
          <Route
            path="/register"
            element={<Register setLoggedUsername={setLoggedUsername} />}
          />
          <Route
            path="/meniu-profesor"
            element={
              <MeniuProfesor
                username={loggedUsername}
                setLoggedUsername={setLoggedUsername}
              />
            }
          />
          <Route
            path="/activitate-profesor/:cod"
            element={<ActivitateProfesor />}
          />
          <Route
            path="/meniu-student"
            element={
              <MeniuStudent
                username={loggedUsername}
                setLoggedUsername={setLoggedUsername}
              />
            }
          />
          <Route
            path="/activitate-student/:cod"
            element={<ActivitateStudent />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
