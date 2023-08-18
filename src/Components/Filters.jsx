import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BsFilterCircle } from "react-icons/bs";
import Rating from "./Rating";
import { CartState } from "../Context/CartContext";

const Filters = () => {
  const {
    productState: { sort, byRating },
    productDispatch,
  } = CartState();

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const isMobile = window.innerWidth <= 768;
  return (
    <div className="filters">
      {isMobile ? (
        <Button variant="primary" onClick={handleShow}>
          <BsFilterCircle style={{ fontSize: "30px", marginRight: "5px" }} />{" "}
        </Button>
      ) : (
        <>
          <span className="title">Filter Products</span>
          <span>
            <Form.Check
              inline
              label="Ascending"
              name="group1"
              type="radio"
              id={`inline-1`}
              onChange={() =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "lowToHigh",
                })
              }
              checked={sort === "lowToHigh" ? true : false}
            />
          </span>
          <span>
            <Form.Check
              inline
              label="Descending"
              name="group1"
              type="radio"
              id={`inline-2`}
              onChange={() =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "highToLow",
                })
              }
              checked={sort === "highToLow" ? true : false}
            />
          </span>
          <span>
            <label style={{ paddingRight: 10 }}>Rating: </label>
            <Rating
              rating={byRating}
              onClick={(i) =>
                productDispatch({
                  type: "FILTER_BY_RATING",
                  payload: i + 1,
                })
              }
              style={{ cursor: "pointer" }}
            />
          </span>
          <Button
            variant="light"
            onClick={() =>
              productDispatch({
                type: "CLEAR_FILTERS",
              })
            }
          >
            Clear Filters
          </Button>
        </>
      )}
      {/* Modal for mobile view */}
      {isMobile && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filter Products</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <span style={{ marginBottom: "10px" }}>
              <Form.Check
                inline
                label="Ascending"
                name="group1"
                type="radio"
                id={`inline-1`}
                onChange={() =>
                  productDispatch({
                    type: "SORT_BY_PRICE",
                    payload: "lowToHigh",
                  })
                }
                checked={sort === "lowToHigh" ? true : false}
              />
            </span>
            <span style={{ marginBottom: "10px" }}>
              <Form.Check
                inline
                label="Descending"
                name="group1"
                type="radio"
                id={`inline-2`}
                onChange={() =>
                  productDispatch({
                    type: "SORT_BY_PRICE",
                    payload: "highToLow",
                  })
                }
                checked={sort === "highToLow" ? true : false}
              />
            </span>
            <span style={{ marginBottom: "10px" }}>
              <label style={{ paddingRight: 10 }}>Rating: </label>
              <Rating
                rating={byRating}
                onClick={(i) =>
                  productDispatch({
                    type: "FILTER_BY_RATING",
                    payload: i + 1,
                  })
                }
                style={{ cursor: "pointer" }}
              />
            </span>
            <Button
              style={{ marginBottom: "10px" }}
              variant="primary"
              onClick={() =>
                productDispatch({
                  type: "CLEAR_FILTERS",
                })
              }
            >
              Clear Filters
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                productDispatch({
                  type: "APPLY_FILTERS",
                });
                handleClose();
              }}
            >
              Apply Filter
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Filters;
