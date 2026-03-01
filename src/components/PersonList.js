import React from 'react';
import './PersonList.css';

function PersonList({ people, onEdit, onDelete }) {
    if (!people.length) {
        return <p>No persons added yet.</p>;
    }

    return (
        <div className="person-list">
            {people.map((p, idx) => (
                <div className="person-card" key={idx}>
                    {p.photo && <img src={p.photo} alt={p.name} className="thumb" />}
                    <div className="info">
                        <strong>{p.name}</strong>
                        <p>{p.phone} {p.email && <span>| {p.email}</span>}</p>
                    </div>
                    <div className="actions">
                        <button onClick={() => onEdit(idx)}>Edit</button>
                        <button onClick={() => onDelete(idx)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PersonList;
