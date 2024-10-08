// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import './App.css'
// import Landing from './Components/LandingPage'
// import Navbar from './Components/Navbar'

// import Home from './Pages/Home';
// import SignUp from './Pages/SignUp';

// function App() {
//   const theme = createTheme({
//     typography: {
//       fontFamily: 'Montserrat, Arial, sans-serif',
//     }
//   });
  

//   return (
//     <>
//     <ThemeProvider theme={theme}>
//       {/* <Home /> */}
//       {/* <SignUp /> */}
//       {/* <Navbar />  */}
//        {/* <Landing /> */}

//     </ThemeProvider>
//     </>
//   );
// }

// export default App;


import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import CreateProject from "./Pages/CreateProject";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LandingPage from "./Components/LandingPage";
import ProfilePage from "./Pages/ProfilePage";
import TeamMembers from "./Pages/TeamMembers";
import MyProjects from "./Components/MyProjects";
import ProjectDetails from "./Components/ProjectDetails";
import TaskList from "./Components/TaskList";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/home" element= {<Home />} />
            <Route path="/createproject" element= {<CreateProject />} />
            <Route path="/profile" element= {<ProfilePage />} />
            <Route path="/teammembers" element= {<TeamMembers />} />
            <Route path="/myprojects" element={<MyProjects />} />
            <Route path="/projects/:projectId/admin/:adminId" element={<ProjectDetails />} />
            <Route path="/project/tasks" element={<TaskList />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;