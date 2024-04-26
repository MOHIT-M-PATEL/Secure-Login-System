import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CardContent, Box, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import "../style/style.css";
import authService from "../services/authService";

const Home = () => {
  const [username, setUsername] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data after login
    authService
      .checkAuth()
      .then((res) => {
        if (res.data.authenticated) {
          setUsername(res.data.username);
        } else {
          navigate("/"); // Redirect to login page if not authenticated
        }
      })
      .catch((err) => console.error(err));
    // Add event listener for window close
    window.addEventListener("beforeunload", handleWindowClose);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, [navigate]);

  const handleLogout = () => {
    authService
      .logout()
      .then((res) => {
        navigate("/"); // Redirect to login page after logout
      })
      .catch((err) => console.error(err));
  };

  const handleWindowClose = (event) => {
    // Constructing a URL for the logout endpoint
    const logoutEndpoint = "http://localhost:5000/logout";

    // Creating a form data object with minimal data
    const formData = new FormData();
    formData.append("logout", "true");

    // Sending a beacon with the logout data
    navigator.sendBeacon(logoutEndpoint, formData);

    console.log("Session cookie cleared");
  };

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
  };

  const handleCheckout = () => {
    // Perform the checkout process here, e.g., send cart data to the server
    alert("Thank you for your order!");
    // Clear the cart after checkout
    setCart([]);
  };

  return (
    <div>
      <header>
        <h1>Select Your Pizza</h1>
      </header>

      <div className="container">
        <ul className="pizza-options">
          <li
            data-name="Pepperoni Pizza"
            data-description="A classic pizza with pepperoni slices, mozzarella cheese, and tomato sauce"
          >
            <img
              src="https://th.bing.com/th/id/OIP.GlPf5HEBSNhuUeb8aMwsiwHaFh?rs=1&pid=ImgDetMain"
              alt="Pepperoni Pizza"
            />
            <div>
              <h2>Pepperoni Pizza</h2>
              <p>
                A classic pizza with pepperoni slices, mozzarella cheese, and
                tomato sauce.
              </p>
              <Button
                onClick={() => addToCart("Pepperoni Pizza")}
                variant="contained"
              >
                Add to Cart
              </Button>
            </div>
          </li>
          <li
            data-name="Margherita Pizza"
            data-description="A simple pizza topped with fresh tomatoes, mozzarella cheese, and basil leaves"
          >
            <img
              src="https://th.bing.com/th/id/OIP.27QPM6MictXbaX3AgYp2LwHaD4?rs=1&pid=ImgDetMain"
              alt="Margherita Pizza"
            />
            <div>
              <h2>Margherita Pizza</h2>
              <p>
                A simple pizza topped with fresh tomatoes, mozzarella cheese,
                and basil leaves.
              </p>
              <Button
                onClick={() => addToCart("Margherita Pizza")}
                variant="contained"
              >
                Add to Cart
              </Button>
            </div>
          </li>
          <li
            data-name="Hawaiian Pizza"
            data-description="A controversial pizza with ham, pineapple, and mozzarella cheese"
          >
            <img
              src="https://th.bing.com/th/id/OIP.hpTu81Fo3b10-hHcoNAjhwHaLH?w=201&h=368&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Hawaiian Pizza"
            />
            <div>
              <h2>Hawaiian Pizza</h2>
              <p>
                A controversial pizza with ham, pineapple, and mozzarella
                cheese.
              </p>
              <Button
                onClick={() => addToCart("Hawaiian Pizza")}
                variant="contained"
              >
                Add to Cart
              </Button>
            </div>
          </li>
          <li
            data-name="Veggie Delight Pizza"
            data-description="A flavorful pizza loaded with various vegetables like bell peppers, olives, onions, and mushrooms"
          >
            <img
              src="https://product-assets.faasos.io/production/product/image_1634212701032_Corn_Veggie_Delight_.jpg"
              alt="Veggie Delight Pizza"
            />
            <div>
              <h2>Veggie Delight Pizza</h2>
              <p>
                A flavorful pizza loaded with various vegetables like bell
                peppers, olives, onions, and mushrooms.
              </p>
              <Button
                onClick={() => addToCart("Veggie Delight Pizza")}
                variant="contained"
              >
                Add to Cart
              </Button>
            </div>
          </li>

          <li
            data-name="Four Cheese Pizza"
            data-description="A rich and creamy pizza topped with four types of cheese - mozzarella, cheddar, parmesan, and gorgonzola"
          >
            <img
              src="https://th.bing.com/th/id/OIP.8ih9ZikeKndn5TljCSi1EgHaE8?rs=1&pid=ImgDetMain"
              alt="Four Cheese Pizza"
            />
            <div>
              <h2>Four Cheese Pizza</h2>
              <p>
                A rich and creamy pizza topped with four types of cheese -
                mozzarella, cheddar, parmesan, and gorgonzola.
              </p>
              <Button
                onClick={() => addToCart("Four Cheese Pizza")}
                variant="contained"
              >
                Add to Cart
              </Button>
            </div>
          </li>

          <li
            data-name="Supreme Pizza"
            data-description="An ultimate pizza experience with a variety of toppings including pepperoni, sausage, bell peppers, onions, and olives"
          >
            <img
              src="https://th.bing.com/th/id/OIP.KGjBZcF2Dy53CIX5cYMGpwHaE8?w=259&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Supreme Pizza"
            />
            <div>
              <h2>Supreme Pizza</h2>
              <p>
                An ultimate pizza experience with a variety of toppings
                including pepperoni, sausage, bell peppers, onions, and olives.
              </p>
              <Button
                onClick={() => addToCart("Supreme Pizza")}
                variant="contained"
              >
                Add to Cart
              </Button>
            </div>
          </li>
        </ul>
      </div>

      <div
      style={{
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
      }}>
        <h2>Cart:</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div 
      style={{
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
      }}>
      <Button
        fullWidth
        onClick={handleCheckout}
        variant="contained"
        style={{
          maxWidth:100,
          backgroundColor: "#4CAF50", // Green color for checkout button
          color: "#ffffff", // White text color
          margin: "20px", // Adjust margin top as needed
          
        }}
      >
        Checkout
      </Button>

      <Button
        fullWidth
        onClick={handleLogout}
        variant="contained"
        style={{
          maxWidth:100,
          backgroundColor: "#f44336", // Red color for logout button
          color: "#ffffff", // White text color
          margin: "20px", // Adjust margin top as needed
          
        }}
      >
        Logout
      </Button>
      </div>

    </div>
  );
};

export default Home;
