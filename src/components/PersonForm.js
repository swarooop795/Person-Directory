import React, { useState } from 'react';
import './PersonForm.css';

const initialState = {
    photo: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    bloodGroup: '',
    dob: '',
    maritalStatus: '',
    education: '',
    fatherName: '',
    motherName: '',
    familyCount: ''
};

function PersonForm({ onSave, existing }) {
    const [person, setPerson] = useState(existing || initialState);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files && files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setPerson(prev => ({ ...prev, photo: ev.target.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setPerson(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(person);
        setPerson(initialState);
    };

    return (
        <form className="person-form" onSubmit={handleSubmit}>
            <h2>{existing ? 'Edit' : 'Add'} Person</h2>
            <label>
                Photo
                <input type="file" name="photo" accept="image/*" onChange={handleChange} />
            </label>
            <label>
                Name
                <input type="text" name="name" value={person.name} onChange={handleChange} required />
            </label>
            <label>
                Phone
                <input type="tel" name="phone" value={person.phone} onChange={handleChange} />
            </label>
            <label>
                Email
                <input type="email" name="email" value={person.email} onChange={handleChange} />
            </label>
            <label>
                Address
                <input type="text" name="address" value={person.address} onChange={handleChange} />
            </label>
            <label>
                Blood Group
                <input type="text" name="bloodGroup" value={person.bloodGroup} onChange={handleChange} />
            </label>
            <label>
                Date of Birth
                <input type="date" name="dob" value={person.dob} onChange={handleChange} />
            </label>
            <label>
                Marital Status
                <select name="maritalStatus" value={person.maritalStatus} onChange={handleChange}>
                    <option value="">--select--</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                </select>
            </label>
            <label>
                Education
                <input type="text" name="education" value={person.education} onChange={handleChange} />
            </label>
            <label>
                Father's Name
                <input type="text" name="fatherName" value={person.fatherName} onChange={handleChange} />
            </label>
            <label>
                Mother's Name
                <input type="text" name="motherName" value={person.motherName} onChange={handleChange} />
            </label>
            <label>
                Family Count
                <input type="number" name="familyCount" value={person.familyCount} onChange={handleChange} />
            </label>
            <button type="submit">{existing ? 'Update' : 'Save'}</button>
        </form>
    );
}

export default PersonForm;
