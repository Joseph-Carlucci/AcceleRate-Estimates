"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { addUserData } from "@/lib/authHelpers";
import { useForm } from "react-hook-form";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f0fff4",
};

const formStyle = {
  backgroundColor: "#f0fdf4",
  padding: "20px",
  borderRadius: "8px",
  width: "550px",
  border: "2px solid #34d399",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  color: "black",
  padding: "10px",
  margin: "10px 0",
  width: "100%",
  border: "1px solid #34d399",
  borderRadius: "4px",
};

const labelStyle = {
  fontWeight: "bold",
  color: "#064e3b",
};

const headingStyle = {
  color: "#064e3b",
  fontSize: "19px",
  marginBottom: "2px",
  fontWeight: "bold",
  textAlign: "center",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginTop: "15px",
};

const submitButtonStyle = {
  backgroundColor: "#34d399",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const infoMessageStyle = {
  color: "#6b7280",
  fontSize: "14px",
  textAlign: "center",
  marginBottom: "20px",
};

const fillLaterButtonStyle = {
  backgroundColor: "#9CA3AF",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

function CompanyQs() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Authenticate user using Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in
      } else {
        router.push("/signup"); // Redirect to signup if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Function to handle form submission
  const onSubmit = (data) => {
    alert(`Form Data: ${JSON.stringify(data)}`);
    // Sending data to Firebase
    addUserData(user, data); // Adding all form data to Firebase
  };

  const handleFillLater = () => {
    router.push("/dashboard"); // Redirect to dashboard or any page of your choice
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <h2 style={headingStyle}>
          Answer the following to help us automate your quotes
        </h2>

        <p style={infoMessageStyle}>
          You can update this information later in your profile settings.
        </p>

        <div>
          <label style={labelStyle} htmlFor="rate">
            How much do you charge per square foot?
          </label>
          <input
            style={inputStyle}
            type="number"
            id="rate"
            {...register("rate", { required: true })}
          />
          {errors.rate && (
            <p style={{ color: "red" }}>This field is required</p>
          )}
        </div>

        <div>
          <label style={labelStyle} htmlFor="size">
            Blah blah blah blah?
          </label>
          <input
            style={inputStyle}
            type="number"
            id="size"
            {...register("size", { required: true })}
          />
          {errors.size && (
            <p style={{ color: "red" }}>This field is required</p>
          )}
        </div>

        <div>
          <label style={labelStyle} htmlFor="experience">
            Blah blah blah blah?
          </label>
          <input
            style={inputStyle}
            type="number"
            id="experience"
            {...register("experience", { required: true })}
          />
          {errors.experience && (
            <p style={{ color: "red" }}>This field is required</p>
          )}
        </div>

        <div>
          <label style={labelStyle} htmlFor="services">
            Blah blah blah blah?
          </label>
          <input
            style={inputStyle}
            type="text"
            id="services"
            {...register("services", { required: true })}
          />
          {errors.services && (
            <p style={{ color: "red" }}>This field is required</p>
          )}
        </div>

        <div>
          <label style={labelStyle} htmlFor="location">
            Blah blah blah blah?
          </label>
          <input
            style={inputStyle}
            type="text"
            id="location"
            {...register("location", { required: true })}
          />
          {errors.location && (
            <p style={{ color: "red" }}>This field is required</p>
          )}
        </div>

        <div>
          <label style={labelStyle} htmlFor="phone">
            Blah blah blah blah?
          </label>
          <input
            style={inputStyle}
            type="tel"
            id="phone"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <p style={{ color: "red" }}>This field is required</p>
          )}
        </div>

        {/* Container for Submit and "Fill Out Later" buttons */}
        <div style={buttonContainerStyle}>
          <button type="submit" style={submitButtonStyle}>
            Submit
          </button>

          {/* "Fill Out Later" button */}
          <button
            type="button"
            style={fillLaterButtonStyle}
            onClick={handleFillLater}
          >
            Fill Out Later
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyQs;
