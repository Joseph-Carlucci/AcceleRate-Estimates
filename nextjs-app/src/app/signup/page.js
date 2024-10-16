import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          style={{ color: "Black" }}
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          style={{ color: "Black" }}
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          style={{ color: "Black" }}
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Signup;
