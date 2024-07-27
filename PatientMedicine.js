import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicalTests = () => {
  const [tests, setTests] = useState([]);
  axios.defaults.baseURL = "http://localhost:8080";
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('/medicine_per_patient/findAllMedicineRecords');
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
            <li key={test.serial_number}>
            <p>Patient ID: {test.patient_ID || 'Not available'}</p>
            <p>Medicine ID: {test.medicine_ID || 'Not available'}</p>
            <p>Purpse: {test.purpose || 'Not available'}</p>
            <p>Timing: {test.timing || 'Not available'}</p>
            <p>Start Date: {test.start_date || 'Not available'}</p>
            <p>End Date: {test.end_date || 'Not available'}</p>
          </li>
          
          ))}
        </ul>
      ) : (
        <p>Medical Records loading...</p>
      )}
    </div>
  );
};




export default MedicalTests;
