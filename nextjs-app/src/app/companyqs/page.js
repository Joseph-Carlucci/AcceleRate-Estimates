"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { addServiceData } from "@/lib/authHelpers";
import { useForm } from "react-hook-form";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "white",
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
  maxHeight: "90vh",
  overflowY: "auto",
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

const addButtonStyle = {
  backgroundColor: "#4B5563",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "10px",
  alignSelf: "center",
};

function CompanyQs() {
  const [user, setUser] = useState(null);
  const [serviceCount, setServiceCount] = useState(3);
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
    addServiceData(user, data); // Adding all form data to Firebase
    router.push("/dashboard"); // Redirect to dashboard
  };

  const handleFillLater = () => {
    router.push("/dashboard"); // Redirect to dashboard or any page of your choice
  };

  const handleAddService = () => {
    setServiceCount(serviceCount + 1);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <h2 style={headingStyle}>Tell us about the services you offer</h2>

        <p style={infoMessageStyle}>
          You can update this information later in your profile settings.
        </p>

        {[...Array(serviceCount)].map((_, index) => (
          <div key={index} style={{ marginTop: index >= 3 ? "20px" : "0" }}>
            <label style={labelStyle} htmlFor={`service${index + 1}`}>
              What is the name of service #{index + 1} that you offer?
            </label>
            <input
              style={inputStyle}
              type="text"
              id={`service${index + 1}`}
              {...register(`service${index + 1}`, { required: index === 0 })}
            />
            {errors[`service${index + 1}`] && index === 0 && (
              <p style={{ color: "red" }}>This field is required</p>
            )}

            <label style={labelStyle} htmlFor={`rate${index + 1}`}>
              How much do you charge in $ per square foot for service #
              {index + 1}?
            </label>
            <input
              style={inputStyle}
              type="number"
              step="0.01"
              id={`rate${index + 1}`}
              {...register(`rate${index + 1}`, { required: index === 0 })}
            />
            {errors[`rate${index + 1}`] && index === 0 && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </div>
        ))}

        <button type="button" style={addButtonStyle} onClick={handleAddService}>
          Add More Service
        </button>

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
