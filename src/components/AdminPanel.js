import React, { useState } from 'react';
import './AdminPanel.css';

function AdminPanel({ people, onAddPerson, onUpdatePerson, onDeletePerson, onLogout }) {
    
    const [activeTab, setActiveTab] = useState('list');
    const [editingIndex, setEditingIndex] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
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
    });
    const [preview, setPreview] = useState('');

    const filtered = people.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e) => {
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

        if (editingIndex !== null) {
            onUpdatePerson(editingIndex, formData);
            setEditingIndex(null);
        } else {
            onAddPerson(formData);
        }
        resetForm();
        setActiveTab('list');
    };

    const resetForm = () => {
        setFormData({
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
        });
        setPreview('');
        setEditingIndex(null);
    };

    const handleEditClick = (idx) => {
        setEditingIndex(idx);
        setFormData(people[idx]);
        setPreview(people[idx].photo || '');
        setActiveTab('form');
    };

    const handleDeleteClick = (idx) => {
        setDeleteConfirm(idx);
    };

    const handleConfirmDelete = (idx) => {
        onDeletePerson(idx);
        setDeleteConfirm(null);
    };

    return (
        <div className="admin-container">
            {/* Admin Header */}
            <div className="admin-header">
                <h1>⚙️ Admin Panel</h1>
                <button className="logout-btn" onClick={onLogout}>
                    🚪 Logout
                </button>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                >
                    📋 View All ({people.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
                    onClick={() => {
                        resetForm();
                        setActiveTab('form');
                    }}
                >
                    ➕ Add New Person
                </button>
            </div>

            {/* Content */}
            <div className="admin-content">
                {/* List Tab */}
                {activeTab === 'list' && (
                    <div className="list-section">
                        <div className="list-header">
                            <h2>Person Directory ({people.length})</h2>
                            <input
                                type="text"
                                placeholder="🔍 Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        {filtered.length === 0 ? (
                            <div className="empty-state">
                                <p>No persons found</p>
                            </div>
                        ) : (
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Blood Group</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((person, idx) => (
                                            <tr key={idx}>
                                                <td className="photo-cell">
                                                    {person.photo ? (
                                                        <img src={person.photo} alt={person.name} className="thumb" />
                                                    ) : (
                                                        <span className="no-photo">📷</span>
                                                    )}
                                                </td>
                                                <td>{person.name}</td>
                                                <td>{person.email || '-'}</td>
                                                <td>{person.phone || '-'}</td>
                                                <td>{person.bloodGroup || '-'}</td>
                                                <td className="actions-cell">
                                                    <button
                                                        className="action-btn edit-btn"
                                                        onClick={() => handleEditClick(idx)}
                                                        title="Edit"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        className="action-btn delete-btn"
                                                        onClick={() => handleDeleteClick(idx)}
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Form Tab */}
                {activeTab === 'form' && (
                    <div className="form-section">
                        <h2>{editingIndex !== null ? '✏️ Edit Person' : '➕ Add New Person'}</h2>

                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="photo-section">
                                {preview && <img src={preview} alt="Preview" className="photo-preview" />}
                                <label className="photo-label">
                                    <span>📸 Upload Photo</span>
                                    <input type="file" name="photo" accept="image/*" onChange={handleInputChange} />
                                </label>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label>DOB</label>
                                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label>Blood Group</label>
                                    <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label>Marital Status</label>
                                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                                        <option value="">--Select--</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Education</label>
                                    <input type="text" name="education" value={formData.education} onChange={handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label>Family Count</label>
                                    <input type="number" name="familyCount" value={formData.familyCount} onChange={handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label>Father's Name</label>
                                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label>Mother's Name</label>
                                    <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} />
                                </div>

                                <div className="form-group form-group-full">
                                    <label>Address</label>
                                    <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3"></textarea>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    {editingIndex !== null ? '💾 Update Person' : '➕ Add Person'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        resetForm();
                                        setActiveTab('list');
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm !== null && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Delete Person?</h3>
                        <p>Are you sure you want to delete <strong>{people[deleteConfirm].name}</strong>?</p>
                        <div className="modal-actions">
                            <button className="btn btn-primary" onClick={() => handleConfirmDelete(deleteConfirm)}>
                                Yes, Delete
                            </button>
                            <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPanel;




