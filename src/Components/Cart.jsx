import React, { useEffect, useState } from "react";
import { CartState } from "../Context/CartContext";
import { Button, ListGroup, Row, Col, Image } from "react-bootstrap";
import {
  AiFillDelete,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const handleIncrease = (product) => {
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id: product.id,
        qty: product.qty + 1,
      },
    });
  };

  const handleDecrease = (product) => {
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id: product.id,
        qty: product.qty - 1,
      },
    });
  };

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row className="align-items-center">
                <Col xs={7} sm={6} md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col xs={12} sm={6} md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col xs={6} sm={6} md={2}>
                  ₹ {prod.price}
                </Col>
                <Col xs={6} sm={6} md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col xs={6} sm={6} md={2}>
                  <div className="quantity-control">
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => handleDecrease(prod)}
                      disabled={prod.qty <= 1}
                    >
                      <AiFillMinusCircle />
                    </Button>
                    <span className="quantity-span">{prod.qty}</span>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => handleIncrease(prod)}
                      disabled={prod.qty >= prod.inStock}
                    >
                      <AiFillPlusCircle />
                    </Button>
                  </div>
                </Col>
                <Col xs={6} sm={6} md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
