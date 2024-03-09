import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authAction.js";
import { useNavigate } from "react-router-dom";

function MeniuProfesor({ username, setLoggedUsername }) {
  const [activitati, setActivitati] = useState([]);
  const [cod, setCod] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formMessage, setFormMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout successful");
    dispatch(logout());
    setLoggedUsername(null);
    navigate("/");
  };

  const getActivityList = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/userActivityList?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setActivitati(data);
      } else {
        const errorMessage = await response.text();
        console.error(
          `Failed to get activity list. Status: ${response.status}, Message: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error fetching activity list:", error.message);
    }
  };

  const onCreateActivity = async (e) => {
    e.preventDefault();

    setFormMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/activityCod?cod=${cod}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (!data.message) {
          setFormMessage("Cod deja existent! Va rugam introduceti alt cod.");
        } else {
          try {
            const response = await fetch(
              "http://localhost:5000/api/newUserActivity",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, cod, name, description }),
              }
            );

            if (response.ok) {
              getActivityList();
              setName("");
              setDescription("");
              console.log("Activity created!");
            } else {
              const errorMessage = await response.text();
              console.error(
                `Failed to create activity. Status: ${response.status}, Message: ${errorMessage}`
              );
            }
          } catch (error) {
            console.error("Error creating activity:", error.message);
          }
        }
      }
    } catch (error) {
      console.error("Error checking code:", error.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      getActivityList();
    }
  }, [isAuthenticated]);

  return (
    <div className="container">
      <button onClick={handleLogout} className="logout-button">
        Deconectare
      </button>
      <h2>Buna ziua, {username}!</h2>
      <div className="menu-content">
        <p>Lista Activităților Existente:</p>
        <ul>
          {activitati.map((activitate, index) => (
            <li
              key={index}
              onClick={() => navigate(`/activitate-profesor/${activitate.cod}`)}
            >
              <p>{activitate.cod}</p>
              <p>{activitate.name}</p>
              <p>{activitate.description}</p>
            </li>
          ))}
        </ul>
        <p>Creare Activitate Nouă:</p>
        <form onSubmit={onCreateActivity}>
          <div>
            <label htmlFor="cod">Cod:</label>
            <input
              type="text"
              id="cod"
              value={cod}
              onChange={(e) => setCod(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Nume:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Descriere:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {formMessage && <p className="redform-message">{formMessage}</p>}
          <button type="submit" className="action-button">
            Creeaza Activitate Nouă
          </button>
        </form>
      </div>
    </div>
  );
}

export default MeniuProfesor;
