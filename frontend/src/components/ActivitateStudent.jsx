import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const ActivitateStudent = () => {
  const { cod } = useParams();
  const [selectedType, setSelectedType] = useState(null);
  const [formMessage, setFormMessage] = useState("");
  const [activitate, setActivitate] = useState({});
  const [loading, setLoading] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleSubmitFeedback = async () => {
    if (selectedType) {
      console.log("Submitted feedback:", selectedType);
      try {
        const response = await fetch(
          "http://localhost:5000/api/newStudentFeedback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cod, reaction: selectedType }),
          }
        );

        if (response.ok) {
          setFormMessage("Feedback trimis cu succes!");
          const feedbackContainer = document.querySelector(
            ".feedback-container"
          );
          Array.from(feedbackContainer.children).forEach((child) => {
            child.classList.remove("active");
          });
          setSelectedType("");
        } else {
          const errorMessage = await response.text();
          console.error(
            `Failed to submit feedback. Status: ${response.status}, Message: ${errorMessage}`
          );
        }
      } catch (error) {
        console.error("Error submitting feedback:", error.message);
      }
    } else {
      setFormMessage("Selectati o reactie inainte sa trimiteti feedback!");
    }
  };

  const handleClick = (e, emotion) => {
    const feedbackContainer = e.currentTarget.parentElement;

    Array.from(feedbackContainer.children).forEach((child) => {
      child.classList.remove("active");
    });

    e.currentTarget.classList.add("active");
    setSelectedType(emotion);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activitateResponse = await fetch(
          `http://localhost:5000/api/activityCod?cod=${cod}`
        );
        if (activitateResponse.ok) {
          const activitateData = await activitateResponse.json();
          setActivitate(activitateData);
        } else {
          console.error(
            `Failed to fetch activity details. Status: ${activitateResponse.status}`
          );
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedback:", error.message);
      }
    };

    fetchData();
  }, [cod]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>Activitate: {activitate.name}</h2>
      <p>Cod: {activitate.cod}</p>
      <p>Descriere: {activitate.description}</p>
      <div className="feedback-container">
        <div onClick={(e) => handleClick(e, "smiley")}>😊</div>
        <div onClick={(e) => handleClick(e, "frowny")}>☹️</div>
        <div onClick={(e) => handleClick(e, "surprised")}>😲</div>
        <div onClick={(e) => handleClick(e, "confused")}>😕</div>
      </div>
      {formMessage && (
        <p
          className={`${
            formMessage.includes("succes")
              ? "greenform-message"
              : "redform-message"
          }`}
        >
          {formMessage}
        </p>
      )}
      <button className="action-button" onClick={handleSubmitFeedback}>
        Trimite Feedback
      </button>
    </div>
  );
};

export default ActivitateStudent;
