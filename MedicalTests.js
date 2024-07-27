import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicalTests = () => {
  const [tests, setTests] = useState([]);
  axios.defaults.baseURL = "http://localhost:8080";
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('/patient_tests/findAll');
        //console.log(response.data); // Add this line to inspect the data
        setTests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching medical tests:', error.response || error);
      }
    };
  
    fetchTests();
  }, []);
  

  return (
    <div>
      <h2>Medical Tests</h2>
      {tests && tests.length > 0 ? (
        <ul>
            
          {tests.map((test) => (
            <li key={test.s_no}>
            <p>Patient ID: {test.patient_ID || 'Not available'}</p>
            <p>Date of Appointment: {test.date_of_appointment || 'Not available'}</p>
            <p>Heart Rate: {test.heart_rate || 'Not available'}</p>
            <p>Diabetes Pedigree Function: {test.diabetespedigreefunction || 'Not available'}</p>
            <p>Glucose: {test.glucose || 'Not available'}</p>
            <p>Skin Thickness: {test.skin_thickness || 'Not available'}</p>
            <p>Insulin: {test.insulin || 'Not available'}</p>
            <p>Body Mass Index: {test.bmi || 'Not available'}</p>
            <p>Outcome: {test.outcome !== undefined ? test.outcome : 'Not available'}</p>          </li>
          
          ))}
        </ul>
      ) : (
        <p>Medical Records loading...</p>
      )}
    </div>
  );
};




export default MedicalTests;
