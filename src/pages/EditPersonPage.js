import React, { useState, useEffect } from 'react';
import './EditPersonPage.css';

function EditPersonPage({ person, personIndex, onSave, onNavigate }) {
    const [formData, setFormData] = useState(person || {});
    const [preview, setPreview] = useState(person?.photo || '');

    useEffect(() => {
        setFormData(person || {});
        setPreview(person?.photo || '');
    }, [person]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files && files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setFormData(prev => ({ ...prev, photo: ev.target.result }));
                setPreview(ev.target.result);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            alert('Name is required');
            return;
        }
        onSave(personIndex, formData);
        onNavigate('/');
    };

    if (!person) {
        return (
            <div className="page-container">
                <div className="empty-state">
                    <h2>⚠️ No Person Selected</h2>
                    <p>Please select a person to edit.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="form-container">
                <form className="person-form" onSubmit={handleSubmit}>
                    <h2 className="form-title">Edit Person Information</h2>

                    <div className="photo-section">
                        {preview && <img src={preview} alt="Preview" className="photo-preview" />}
                        <label className="photo-label">
                            <span className="photo-icon">📸</span>
                            <input type="file" name="photo" accept="image/*" onChange={handleChange} />
                            <span>Change Photo</span>
                        </label>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1-234-567-8900" />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Blood Group</label>
                            <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="O+" />
                        </div>

                        <div className="form-group">
                            <label>Marital Status</label>
                            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                                <option value="">--Select--</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Education</label>
                            <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Bachelor's Degree" />
                        </div>

                        <div className="form-group">
                            <label>Family Count</label>
                            <input type="number" name="familyCount" value={formData.familyCount} onChange={handleChange} min="1" />
                        </div>

                        <div className="form-group">
                            <label>Father's Name</label>
                            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father's name" />
                        </div>

                        <div className="form-group">
                            <label>Mother's Name</label>
                            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} placeholder="Mother's name" />
                        </div>

                        <div className="form-group form-group-full">
                            <label>Address</label>
                            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St, City, State" rows="3"></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Update Person</button>
                        <button type="button" className="btn btn-secondary" onClick={() => onNavigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPersonPage;
