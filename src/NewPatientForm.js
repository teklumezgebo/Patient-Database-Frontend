import React from "react";
import { useState } from "react";
import Patient from "./Patient";

function NewPatientForm({ onPatientChange, onPatientDelete, onUpdate }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [hypertension, setHypertensive] = useState('')
    const [diabetes, setDiabetic] = useState('')

    const patientObj = {
        first_name: firstName,
        last_name: lastName,
        hypertension: hypertension,
        diabetes: diabetes
    }

    function handleFirstName(event){
        setFirstName(event.target.value)
    }

    function handleLastName(event) {
        setLastName(event.target.value)
    }

    function handleHypertension(event) {
        if (event.target.checked === true) {
            setHypertensive(true)
        } else if (event.target.checked === false) {
            setHypertensive(false)
        }
    }

    function handleDiabetic(event) {
        if (event.target.checked === true) {
            setDiabetic(true)
        } else if (event.target.checked === false) {
            setDiabetic(false)
        }
    }

    function handleNewPatientSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:9292/patients', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientObj)
        })
        .then(res => res.json())
        .then(patient => {
            const newPatient = <Patient id={patient.id} firstName={patient.first_name} lastName={patient.last_name} hypertension={patient.hypertension} diabetes={patient.diabetes} onDelete={onPatientDelete} />
            onPatientChange(newPatient)
            setFirstName("")
            setLastName("")
            setHypertensive(false)
            setDiabetic(false)
            document.getElementById('hypertension').checked = false
            document.getElementById('diabetes').checked = false
        })
    }
    
    return (
        <div>
            <form onSubmit={handleNewPatientSubmit}>
            <input type="text" placeholder="First Name" onChange={handleFirstName} value={firstName}></input>
            <input type="text" placeholder="Last Name" onChange={handleLastName} value={lastName}></input>
            <div className="checkbox-container">
            <input type="checkbox" id="hypertension" onChange={handleHypertension}value={hypertension}></input>
            <label htmlFor="hypertension">Hypertensive</label>
            <input type="checkbox" id="diabetes" onChange={handleDiabetic} value={diabetes}></input>
            <label htmlFor="diabetes">Diabetic</label>
            </div>
            <br></br>
            <input type="submit" value="Add New"></input>
            </form>
        </div>
    )
}

export default NewPatientForm