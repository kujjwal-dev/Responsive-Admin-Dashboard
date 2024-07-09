import React, { useState, useEffect } from "react";
import Login from "./Login";
import App from "./App";
import Axios from "axios";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";
import { Toaster } from 'react-hot-toast';

const Auth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function me() {
      try {
        const response = await Axios.get("http://localhost:3001/api/v1/auth/me", {
          withCredentials: true,
        });
        setUser(response?.data.success);
      } catch (error) {
        console.log(error);
      }
    }
    me();
  }, []);

  return user ? 
  <ThemeProvider>
    <SidebarProvider>
      <Toaster position="top-right"/>
     <App /> 
    </SidebarProvider>
  </ThemeProvider> 
  : 
  <Login setUser={setUser} />;
};

export default Auth;
