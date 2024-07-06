import React, { useState, useRef } from "react";
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid, Paper } from "@mui/material";
import { CgSpinner } from "react-icons/cg";
import { BsFillShieldLockFill } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";
import toast, { Toaster } from "react-hot-toast";
import Axios from "axios";

const OTPInput = ({ otp, setOtp }) => {
  const inputs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <Grid container spacing={1} justifyContent="center">
      {otp.map((data, index) => (
        <Grid item key={index}>
          <TextField
            type="text"
            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputRef={(el) => (inputs.current[index] = el)}
            sx={{ width: 40, height: 40 }}
            variant="outlined"
          />
        </Grid>
      ))}
    </Grid>
  );
};

const Login = ({ setUser }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateOtp = () => {
    if (otp.join("").length !== 6) {
      setOtpError("OTP must be 6 digits");
      return false;
    }
    setOtpError("");
    return true;
  };

  async function sendEmail() {
    if (!validateEmail()) {
      return;
    }
    setLoading(true);
    try {
      const emailSend = await Axios.post(
        "http://localhost:3001/api/v1/auth/register",
        { email },
        { withCredentials: true }
      );
      toast.success(emailSend.data.message);
      setShowOTP(true);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOTP() {
    if (!validateOtp()) {
      return;
    }
    setLoading(true);
    try {
      const otpSend = await Axios.post(
        "http://localhost:3001/api/v1/auth/verify",
        { otp: otp.join(""), email },
        { withCredentials: true }
      );
      setUser(otpSend.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Welcome to eLearning
            </Typography>
            {showOTP ? (
              <>
                <div className="bg-black text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <Typography component="h2" variant="h6" className="text-center font-bold" sx={{ mt: 2 }}>
                  Enter Your OTP
                </Typography>
                <OTPInput otp={otp} setOtp={setOtp} />
                {otpError && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {otpError}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  onClick={verifyOTP}
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                >
                  {loading && <CgSpinner size={20} className="mx-2 animate-spin" />}
                  Verify OTP
                </Button>
              </>
            ) : (
              <>
                <div className="border-teal-500 border-1 border-solid text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <SiMinutemailer size={30} />
                </div>
                <TextField
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  variant="standard"
                  label="Email"
                  placeholder="Enter your email"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  error={!!emailError}
                  helperText={emailError}
                />
                <Button
                  variant="contained"
                  onClick={sendEmail}
                  fullWidth
                >
                  {loading && <CgSpinner size={20} className="mx-2 animate-spin" />}
                  Send code via Email
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
