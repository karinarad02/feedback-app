import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authAction.js";
import { useNavigate } from "react-router-dom";

function MeniuStudent({ username, setLoggedUsername }) {
  const [codActivitate, setCodActivitate] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const participaActivitate = async () => {
    if (codActivitate.trim() === "") {
      setFormMessage("Introduceți un cod de activitate valid.");
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/api/activityCod?cod=${codActivitate}`
        );

        if (response.ok) {
          const data = await response.json();
          if (!data.message) {
            const activityCreationTime = new Date(data.createdAt).getTime();
            const currentTime = new Date().getTime();
            const unMinInSecunde = 60;

            if (
              Math.floor((currentTime - activityCreationTime) / 1000) >
              unMinInSecunde
            ) {
              setFormMessage(
                "A trecut mai mult de un minut. Nu mai puteți accesa activitatea."
              );
            } else {
              navigate(`/activitate-student/${codActivitate}`);
            }
          } else {
            setFormMessage(
              "Activitatea nu există. Introduceți un cod de activitate valid."
            );
          }
        }
      } catch (error) {
        console.error("Error checking activity:", error.message);
        setFormMessage(
          "A apărut o eroare la verificarea activității. Vă rugăm să încercați din nou mai târziu."
        );
      }
    }
  };

  const handleLogout = () => {
    console.log("Logout successful");
    dispatch(logout());
    setLoggedUsername(null);
    navigate("/");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="container">
      <button onClick={handleLogout} className="logout-button">
        Deconectare
      </button>
      <h2>Buna, {username}!</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Introduceți Codul Activității"
          value={codActivitate}
          onChange={(e) => setCodActivitate(e.target.value)}
        />
        <button onClick={participaActivitate} className="action-button">
          Participa
        </button>
      </div>
      {formMessage && <p className="redform-message">{formMessage}</p>}
    </div>
  );
}

export default MeniuStudent;
