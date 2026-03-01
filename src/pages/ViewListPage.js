import React, { useState } from 'react';
import './ViewListPage.css';

function ViewListPage({ people, onEdit, onDelete }) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = people.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone.includes(searchTerm)
    );

    const handleDelete = (idx) => {
        onDelete(idx);
        setDeleteConfirm(null);
    };

    if (!people.length) {
        return (
            <div className="page-container">
                <div className="empty-state">
                    <h2>📭 No Persons Yet</h2>
                    <p>Start by adding a new person to your directory.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="list-header">
                <h2>All Persons ({people.length})</h2>
                <input
                    type="text"
                    placeholder="🔍 Search by name, email or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {filtered.length === 0 ? (
                <div className="no-results">No results found for "{searchTerm}"</div>
            ) : (
                <div className="person-grid">
                    {filtered.map((p, idx) => (
                        <div className="person-card" key={idx}>
                            <div className="card-header">
                                {p.photo ? (
                                    <img src={p.photo} alt={p.name} className="person-photo" />
                                ) : (
                                    <div className="person-photo-placeholder">👤</div>
                                )}
                            </div>

                            <div className="card-body">
                                <h3 className="person-name">{p.name}</h3>
                                {p.dob && <p className="person-field"><span>📅</span> DOB: {p.dob}</p>}
                                {p.phone && <p className="person-field"><span>📞</span> {p.phone}</p>}
                                {p.email && <p className="person-field"><span>📧</span> {p.email}</p>}
                                {p.bloodGroup && <p className="person-field"><span>🩸</span> {p.bloodGroup}</p>}
                                {p.maritalStatus && <p className="person-field"><span>💍</span> {p.maritalStatus}</p>}
                            </div>

                            <div className="card-footer">
                                <button
                                    className="btn btn-sm btn-edit"
                                    onClick={() => onEdit(idx)}
                                    title="Edit this person"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-delete"
                                    onClick={() => setDeleteConfirm(idx)}
                                    title="Delete this person"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {deleteConfirm !== null && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Delete Person?</h3>
                        <p>Are you sure you want to delete <strong>{people[deleteConfirm].name}</strong>?</p>
                        <div className="modal-actions">
                            <button className="btn btn-primary" onClick={() => handleDelete(deleteConfirm)}>Yes, Delete</button>
                            <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewListPage;
