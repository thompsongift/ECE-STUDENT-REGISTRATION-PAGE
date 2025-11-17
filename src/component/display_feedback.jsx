import React, { useState, useEffect } from "react";
import ButtonType3 from "./button_type_3";

const FeedbackListDummy = ({}) => {
  const [listOfSuggestions, setListOfSuggestions] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(
          `https://api.eceunn.com/api/department-feedbacks?per_page=${itemsPerPage}&page=${pageNum}`,
          {
            signal: controller.signal,
          }
        );
        if (!response.ok) {
          const errs = await response.json();
          if (errs.message) {
            throw new Error(errs.message);
          } else if (errs.error) {
            throw new Error(errs.error);
          }
        }
        const { data } = await response.json();
        setListOfSuggestions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
    return () => controller.abort();
  }, [itemsPerPage]);

  return (
    <>
      <div className="d-block w-100 py-3 px-2 p-md-4">
        {listOfSuggestions.length > 0 ? (
          <>
            {listOfSuggestions.map(({ input_feedback, created_at }, index) => {
              return (
                <div key={index} className="text-start">
                  {index != 0 && <hr />}

                  <h1 className="fs-6 fw-light">{input_feedback}</h1>
                  <small className="fw-light">{created_at.split("T")[0]}</small>
                  {index == listOfSuggestions.length - 1 && <hr />}
                </div>
              );
            })}
            <ButtonType3
              titleName="View more"
              onClick={() => setItemsPerPage(listOfSuggestions.length + 10)}
              extra={"my-2 fs-5"}
            />
          </>
        ) : (
          <div className="bor">
            <h1 className="fs-6 fw-light">No feedbacks </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackListDummy;
