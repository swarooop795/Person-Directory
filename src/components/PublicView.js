import React from 'react';
import './PublicView.css';

function PublicView({ people }) {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filtered = people.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone.includes(searchTerm)
    );

    if (!people.length) {
        return (
            <div className="public-container">
                <div className="empty-state">
                    <h2>📭 No Persons Yet</h2>
                    <p>The directory is empty.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="public-container">
            <div className="public-header">
                <h2>Person Directory</h2>
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
                                {p.phone && <p className="person-field"><span>📞</span> Contact No: {p.phone}</p>}
                                {p.email && <p className="person-field"><span>📧</span> Email Address: {p.email}</p>}
                                {p.bloodGroup && <p className="person-field"><span>🩸</span> Blood Group: {p.bloodGroup}</p>}
                                {p.maritalStatus && <p className="person-field"><span>💍</span> Marital Status: {p.maritalStatus}</p>}
                                {p.education && <p className="person-field"><span>🎓</span> Qualification: {p.education}</p>}
                                {p.fatherName && <p className="person-field"><span>👨</span> Father Name: {p.fatherName}</p>}
                                {p.motherName && <p className="person-field"><span>👩</span> Mother Name: {p.motherName}</p>}
                                {p.familyCount && <p className="person-field"><span>👪</span> Family Count: {p.familyCount}</p>}
                                {p.address && <p className="person-field"><span>📍</span> Home Town: {p.address}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PublicView;
