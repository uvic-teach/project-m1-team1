import React, { useState, setState } from "react";
import "./registration.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [username, setFirstName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      setFirstName(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
    if (id === "name") {
      setName(value);
    }
    if (id === "age") {
      setAge(value);
    }
    if (id === "address") {
      setAddress(value);
    }
    if (id === "phone") {
      setPhone(value);
    }
  };

  async function registerUser(data) {
    try {
      let res = await axios.post(
        "https://auth-microservice-l5b7m.ondigitalocean.app/register",
        {
          username: data.username,
          password: data.password,
          name: data.name,
          age: data.age,
          address: data.address,
          phone: data.phone
        }
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  const navigate = useNavigate();

  const handleRegistration = async () => {
    const res = await registerUser({
        username,
        password,
        name,
        age,
        address,
        phone
    });
    console.log(res);

    if (res.status === 201) {
      console.log("Registration OK!");
      navigate("/", { replace: true });
    }
  };

  const handleSubmit = () => {
    console.log(username, password, confirmPassword, name, age, address, phone);
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="username">
          <label className="form__label">
            Username{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={username}
            onChange={(e) => handleInputChange(e)}
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="password">
          <label className="form__label">
            Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="confirm-password">
          <label className="form__label">
            Confirm Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>
        <div className="name">
          <label className="form__label">
            Full Name{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={name}
            onChange={(e) => handleInputChange(e)}
            id="name"
            placeholder="Full Name"
          />
        </div>
        <div className="age">
          <label className="form__label">
            Age{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={age}
            onChange={(e) => handleInputChange(e)}
            id="age"
            placeholder="Age"
          />
        </div>
        <div className="address">
          <label className="form__label">
            Address{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={address}
            onChange={(e) => handleInputChange(e)}
            id="address"
            placeholder="Address"
          />
        </div>
        <div className="phone">
          <label className="form__label">
            Phone Number{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={phone}
            onChange={(e) => handleInputChange(e)}
            id="phone"
            placeholder="Phone Number"
          />
        </div>
      </div>
      <div class="footer">
        <button onClick={() => handleRegistration()} type="submit" class="btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default Registration;
