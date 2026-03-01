import React, { useState } from 'react';
import '../components/PersonForm.css';

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

function AddPersonPage({ onSave, onNavigate }) {
    const [person, setPerson] = useState(initialState);
    const [preview, setPreview] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files && files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setPerson(prev => ({ ...prev, photo: ev.target.result }));
                setPreview(ev.target.result);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setPerson(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!person.name.trim()) {
            alert('Name is required');
            return;
        }
        onSave(person);
        setPerson(initialState);
        setPreview('');
        onNavigate('/');
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <form className="person-form" onSubmit={handleSubmit}>
                    <h2 className="form-title">Add New Person</h2>

                    <div className="photo-section">
                        {preview && <img src={preview} alt="Preview" className="photo-preview" />}
                        <label className="photo-label">
                            <span className="photo-icon">📸</span>
                            <input type="file" name="photo" accept="image/*" onChange={handleChange} />
                            <span>Upload Photo</span>
                        </label>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input type="text" name="name" value={person.name} onChange={handleChange} placeholder="John Doe" required />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" name="phone" value={person.phone} onChange={handleChange} placeholder="+1-234-567-8900" />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={person.email} onChange={handleChange} placeholder="john@example.com" />
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="date" name="dob" value={person.dob} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Blood Group</label>
                            <input type="text" name="bloodGroup" value={person.bloodGroup} onChange={handleChange} placeholder="O+" />
                        </div>

                        <div className="form-group">
                            <label>Marital Status</label>
                            <select name="maritalStatus" value={person.maritalStatus} onChange={handleChange}>
                                <option value="">--Select--</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Education</label>
                            <input type="text" name="education" value={person.education} onChange={handleChange} placeholder="Bachelor's Degree" />
                        </div>

                        <div className="form-group">
                            <label>Family Count</label>
                            <input type="number" name="familyCount" value={person.familyCount} onChange={handleChange} min="1" />
                        </div>

                        <div className="form-group">
                            <label>Father's Name</label>
                            <input type="text" name="fatherName" value={person.fatherName} onChange={handleChange} placeholder="Father's name" />
                        </div>

                        <div className="form-group">
                            <label>Mother's Name</label>
                            <input type="text" name="motherName" value={person.motherName} onChange={handleChange} placeholder="Mother's name" />
                        </div>

                        <div className="form-group form-group-full">
                            <label>Address</label>
                            <textarea name="address" value={person.address} onChange={handleChange} placeholder="123 Main St, City, State" rows="3"></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Save Person</button>
                        <button type="button" className="btn btn-secondary" onClick={() => { setPerson(initialState); setPreview(''); }}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPersonPage;
