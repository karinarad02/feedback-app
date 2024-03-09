import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

function ActivitateProfesor() {
  const { cod } = useParams();
  const [activitate, setActivitate] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activitateResponse = await fetch(
          `http://localhost:5000/api/activityCod?cod=${cod}`
        );
        if (activitateResponse.ok) {
          const activitateData = await activitateResponse.json();
          setActivitate(activitateData);
          const feedbackResponse = await fetch(
            `http://localhost:5000/api/activityFeedback?cod=${activitateData.id}`
          );
          if (feedbackResponse.ok) {
            const feedbackData = await feedbackResponse.json();
            setFeedback(feedbackData);
          } else {
            console.error(
              `Failed to fetch feedback. Status: ${feedbackResponse.status}`
            );
          }
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

  const formatTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    const seconds = dateObject.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const getEmoticon = (reaction) => {
    switch (reaction) {
      case "smiley":
        return "😊";
      case "frowny":
        return "☹️";
      case "surprised":
        return "😲";
      case "confused":
        return "😕";
      default:
        return reaction;
    }
  };

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
      <h2>Detalii Activitate: {activitate.name}</h2>
      <p>Cod: {activitate.cod}</p>
      <p>Descriere: {activitate.description}</p>

      <h3>Feedback Studenți:</h3>
      {feedback.length === 0 ? (
        <p>Nu există feedback pentru această activitate.</p>
      ) : (
        <ul>
          {feedback.map((item, index) => (
            <li key={index}>
              <p>Moment: {formatTimestamp(item.createdAt)}</p>
              <p>Reacție: {getEmoticon(item.reaction)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ActivitateProfesor;
