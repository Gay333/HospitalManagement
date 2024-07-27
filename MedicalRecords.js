import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicalRecords = () => {
  const [tests, setTests] = useState([]);
  axios.defaults.baseURL = "http://localhost:8080";
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('/patient_medical_record/findAll');
        //console.log(response.data); // Add this line to inspect the data
        setTests(response.data);
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
            <p>Patient ID: {test.patient_id || 'Not available'}</p>
            <p>Date of Appointment: {test.date_of_appointment || 'Not available'}</p>
            <p>Doctor ID: {test.doctor_id || 'Not available'}</p>
            <p>Nurse ID: {test.nurse_id || 'Not available'}</p>
            <p>Hospital ID: {test.hospital_id || 'Not available'}</p>
            <p>Purpose of the visit: {test.purpose_of_visit || 'Not available'}</p>
            <p>Past History: {test.past_history || 'Not available'}</p>
          </li>
          
          ))}
        </ul>
      ) : (
        <p>Medical Records loading...</p>
      )}
    </div>
  );
};




export default MedicalRecords;
