import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import getLPTheme from "./components/getLPTheme.jsx";
import ToggleColorMode from "./components/ToggleColorMode.jsx";

import Home from './pages/home/Home.jsx';
import About from './pages/about/About.jsx';
import Header from './pages/header/Header.jsx';
import Footer from './pages/footer/Footer.jsx';
import Resume from './pages/resume/Resume.jsx';
import Project from './pages/project/Project.jsx';
import PageNotFound from './components/PageNotFound.jsx';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const localMode = localStorage.getItem('mode');
  const [mode, setMode] = useState(localMode ? localMode : 'dark');
  const LPtheme = React.useMemo(() => createTheme(getLPTheme(mode)), [mode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src="loading.svg" alt="Loading..." height="80px" width="150px" />
        </div>
      ) : (
        <BrowserRouter>
          <Header mode={mode} />
          <div style={{ marginTop: 100 }}>
            <Routes>
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path="/home" element={<Home />} />
              <Route path='/about' element={<About mode={mode} />} />
              <Route path='/project' element={<Project mode={mode} />} />
              <Route path='/resume' element={<Resume />} />
              <Route path="/404" element={<PageNotFound />} />
            </Routes>
          </div>
          <Footer />
          <div className='theme-mode' style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: "999" }}>
            <ToggleColorMode style={{ backgroundColor: "transparent", border: "none", color: "white" }} mode={mode} toggleColorMode={toggleColorMode} />
          </div>
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}
