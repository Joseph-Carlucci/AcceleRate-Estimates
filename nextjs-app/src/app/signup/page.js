"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { get, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { signUp, addUserData } from "@/lib/authHelpers";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getAuth } from "firebase/auth";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmedPassword: Yup.string().required("Confirm Password is required"),
  name: Yup.string().trim().required("Name is required"),
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
      setLoading(false);
      return;
    }
    try {
      await signUp(data.email, data.password);
      await addUserData(getAuth().currentUser, {
        name: data.name,
      });
      router.push("/companyqs");
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
        paddingTop: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "green", textAlign: "center" }}
        >
          Sign Up
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Company Name"
            fullWidth
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ color: "green" }}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmedPassword")}
            error={!!errors.password}
            helperText={errors.confirmedPassword?.message}
            sx={{ color: "green" }}
          />

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
