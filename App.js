//import logo from './logo.svg';
//import { AppBar } from '@mui/material';
import './App.css';
import ReactDOM from 'react-dom/client';
import Appbar from "./components/Appbar";
import NurseAddition from './components/NurseAddition';
import UserRegistration from "./components/UserRegistration";
import Login from "./components/Login";
//import Chat from "./Chat";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
//import AdminLogin from "./pages/AdminLogin"; 
import Chat from "./pages/Chat"; 
import Home from "./pages/Home"; 
import Landing from "./pages/Landing"; 
//import Login from "./pages/Login"; 

import Logout from "./pages/Logout"; 
import MedicalDocuments from "./pages/MedicalDocuments"; 
//import NurseLogin from "./pages/NurseLogin"; 
import NurseRegistration from "./pages/NurseRegistration"; 
import PatientLogin from "./pages/PatientLogin";

import PatientRegistration from "./pages/PatientRegistration"; 
import Profile from "./pages/Profile"; 
import NurseLogin from './components/NurseLogin';
import AdminLogin from './components/AdminLogin';
import MedicalRecords from './components/MedicalRecords';
import PatientMedicalRecords from './components/PatientMedicalRecords';
import MedicalTests from './components/MedicalTests';
import PatientMedicalTests from './components/PatientMedicalTests';
import PatientMedicine from './components/PatientMedicine';
import SinglePatientMedicine from './components/SinglePatientMedicine';
import SpecificPatientMedicine from './components/SpecificPatientMedicine';
import SpecificPatientRecord from './components/SpecificPatientRecord';
import SpecificPatientTest from './components/SpecificPatientTest';
import DeletePatientMedicine from './components/DeletePatientMedicine';
import DeletePatientRecord from './components/DeletePatientRecord';
import DeletePatientTest from './components/DeletePatientTest';
import AddPatientMedicine from './components/AddPatientMedicine';
import AddPatientRecord from './components/AddPatientRecord';
import AddPatientTest from './components/AddPatientTest'


function App() {
  return (
    <Router>
      <Appbar/>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/login">Login</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/register">Register</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/nurse-addition">Nurse Addition</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/nurse-login">Nurse Login</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/admin-login">Admin Login</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/medical-records">Medical Records</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/patient-medical-records">Patient Medical Records</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/medical-tests">Medical Tests</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/patient-medical-tests">Patient Medical Tests</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/All-patient-medicine">All Patient Medicine</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/single-patient-medicine">Single Patient Medicine</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/specific-patient-medicine">Specific Patient Medicine</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/specific-patient-record">Specific Patient Record</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/specific-patient-test">Specific Patient Test</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/delete-patient-medicine">Delete Patient Medicine</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/delete-patient-record">Delete Patient Record</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/delete-patient-test">Delete Patient Test</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/add-patient-medicine">Add Patient Medicine</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/add-patient-test">Add Patient Test</Link>
      <div style={{ marginBottom: '100px' }}></div>
      <Link to="/add-patient-record">Add Patient Record</Link>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/add-patient-medicine" element={<AddPatientMedicine />} />
        <Route path="/add-patient-test" element={<AddPatientTest />} />
        <Route path="/add-patient-record" element={<AddPatientRecord />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
      <div style={{ marginBottom: '100px' }}></div>
    </Router>
  );
}

export default App;