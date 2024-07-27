package com.example.patient.service;


import com.example.patient.model.Patient;
import com.example.patient.model.Patient_Medical_Record;
import com.example.patient.model.Patient_Tests;
import com.example.patient.repository.Patient_TestsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Patient_TestsService {
    public final Patient_TestsRepository patientTestsRepository;

    @Autowired

    public Patient_TestsService(Patient_TestsRepository patientTestsRepository){
        this.patientTestsRepository = patientTestsRepository;
    }

    public Iterable<Patient_Tests> findAllTests(){
        return patientTestsRepository.findAll();
    }

    public Iterable<Patient_Tests> findTestsPatient(String patient_ID){
        return patientTestsRepository.findPatientTest(patient_ID);
    }

    public Iterable<Patient_Tests> findParticularTest(String patient_ID, String date_of_appointment){
        return patientTestsRepository.findSpecificTest(patient_ID,date_of_appointment);
    }

    public Patient_Tests addnewPatientTest(Patient_Tests patient) {
        return patientTestsRepository.save(patient);
    }

    @Transactional
    public int deletePatient(Iterable<Patient_Tests> patient) {
        try {

            if (patient != null) {
                patientTestsRepository.deleteAll(patient);
                System.out.println("Patient Test Deleted Successfully!");
                return 1;
            } else {
                System.out.println("Patient not found.");
                return 0;
            }
        } catch (Exception e) {
            System.out.println("An error occurred while deleting the patient test: " + e.getMessage());
        }
        return 0;
    }
}
