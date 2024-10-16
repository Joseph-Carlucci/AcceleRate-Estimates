"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation in Next.js
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { signUp } from "@/lib/authHelpers";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    if (data.password !== data.confirmedPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signUp(data.email, data.password);
      alert("User successfully signed in!");
      router.push("/companyqs"); // Redirect after successful sign-up
    } catch (err) {
      setError(err.message || "Sign up failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "white",
        minHeight: "100vh",
        minWidth: "100vw",
        paddingTop: 8,
        position: "absolute",
      }}
    >
      <Box
        sx={{
          position: "relative",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8, // Offset from the top of the viewport
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "green" }}>
          Sign Up
        </Typography>

        {/* Show error alert if login fails */}
        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ color: "green" }} // Set text color to green
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmedPassword")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ color: "green" }} // Set text color to green
          />

          {/* Submit button with loading indicator */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2, mb: 2, backgroundColor: "green" }}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
