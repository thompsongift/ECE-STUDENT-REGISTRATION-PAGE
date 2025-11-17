import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const StarRating = ({ totalStars = 5, endpoint = "/", setHandle }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendRating = async (value) => {
    //setLoading(true);s
    // try {
    //   const response = await fetch(endpoint, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ rating: value }),
    //   });
    //   if (!response.ok) throw new Error("Failed to send rating");
    //   const data = await response.json();
    //   setMessage("Thank you for your rating!");
    // } catch (error) {
    //   console.error(error);
    //   setMessage("Error sending rating. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleClick = async (value) => {
    setRating(value);
    sendRating(value);
    await wait(4000);
    setHandle();
  };

  return (
    <div className="text-center mt-3">
      {message === "" && (
        <div className="mt-0 mb-2 fs-6 fw-light text-dark">
          {"please rate your user experience"}
        </div>
      )}
      <div className="d-flex justify-content-center pb-3">
        {message === "" &&
          [...Array(totalStars)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                key={starValue}
                type="button"
                className="btn btn-link p-0 mx-1 border-0"
                disabled={loading}
                onClick={() => {
                  setMessage("Thank you for your rating!");
                  handleClick(starValue);
                }}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
              >
                <FaStar
                  size={32}
                  color={
                    starValue <= (hover || rating) ? "#06940bff" : "#cff5d0ff"
                  }
                />
              </button>
            );
          })}
      </div>

      {loading && (
        <div
          className="spinner-border text-warning spinner-border-sm"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {message !== "" && (
        <div className="fs-6 fw-light text-dark mb-4">{message}</div>
      )}
    </div>
  );
};

export default StarRating;
