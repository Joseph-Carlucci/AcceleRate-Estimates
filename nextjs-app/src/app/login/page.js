"use client";
import { useState } from "react";
import { signIn } from "@/lib/authHelpers";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password); // Call the sign-in function
      alert("User successfully signed in!");
      router.push("/companyqs"); // Redirect to the companyqs page
    } catch (err) {
      alert("Error" + err.message); // Display error if sign-in fails
    }
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default Signup;
