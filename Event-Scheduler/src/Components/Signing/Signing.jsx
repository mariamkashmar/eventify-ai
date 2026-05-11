import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signing.css";

export default function Signing() {
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleSignUpChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignInChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const switchMode = () => {
    setIsSignIn(!isSignIn);
    setMessage("");
    setError("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setMessage("Account created successfully. Please sign in.");
      setIsSignIn(true);
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="signing-page">
      <div className="signing-card">
        <div className="signing-left">
          <div>
            <p className="signing-label">Eventify</p>

            <h1>{isSignIn ? "Welcome Back" : "Join Eventify"}</h1>

            <p>
              {isSignIn
                ? "Sign in to manage your events, tickets, and personalized recommendations."
                : "Create your account and start discovering, creating, and managing events smarter."}
            </p>
          </div>

          <div className="signing-info-box">
            <h2>{isSignIn ? "New here?" : "Already registered?"}</h2>

            <p>
              {isSignIn
                ? "Create an account to explore events, reserve tickets, and organize your schedule."
                : "Sign in to continue managing your events and tickets."}
            </p>

            <button type="button" className="signing-small-btn" onClick={switchMode}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>

        <div className="signing-right">
          <h1 className="signing-title">
            {isSignIn ? "Sign In" : "Create Account"}
          </h1>

          <p className="signing-subtitle">
            {isSignIn
              ? "Access your account and continue planning your next event experience."
              : "Join Eventify and start creating or joining events with ease."}
          </p>

          <div className="switch-buttons">
            <button
              type="button"
              className={isSignIn ? "active" : ""}
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>

            <button
              type="button"
              className={!isSignIn ? "active" : ""}
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </button>
          </div>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          {isSignIn ? (
            <form onSubmit={handleSignIn}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={signInData.email}
                  onChange={handleSignInChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  required
                />
              </div>

              <button type="submit" className="signing-btn">
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <div className="form-row">
                <div className="input-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    value={signUpData.firstname}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    value={signUpData.lastname}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phonenumber"
                  placeholder="Enter your phone number"
                  value={signUpData.phonenumber}
                  onChange={handleSignUpChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter your country"
                  value={signUpData.country}
                  onChange={handleSignUpChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="signing-btn">
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}