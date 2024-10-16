"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/authHelpers";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }
    try {
      await signUp(email, password); // Call the sign-in function
      alert("User successfully signed up!");
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
