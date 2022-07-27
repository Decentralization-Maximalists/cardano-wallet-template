import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import HomePage from "./containers/HomePage/HomePage"
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import { themeDark } from "./themes/theme";

const routing = (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/HomePage" element={<HomePage />}/>
      </Routes>
    </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme = { themeDark }>
      {routing}
    </ThemeProvider>
  </React.StrictMode>
);
  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
