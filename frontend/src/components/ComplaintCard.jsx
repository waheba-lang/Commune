import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag, User as UserIcon, Calendar } from 'lucide-react';

const ComplaintCard = ({ complaint }) => {
    const statusClass = `badge badge-${complaint.status.toLowerCase().replace(' ', '-')}`;
    const imageUrl = complaint.image 
        ? `${import.meta.env.DEV ? 'http://localhost:8000' : ''}/storage/${complaint.image}` 
        : 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&q=80&w=400';

    return (
        <div className="card">
            <img src={imageUrl} alt={complaint.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                    <span className={statusClass}>{complaint.status}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} />
                        {new Date(complaint.created_at).toLocaleDateString()}
                    </span>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>{complaint.title}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                        <MapPin size={16} />
                        <span>{complaint.city}, {complaint.address}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                        <Tag size={16} />
                        <span>{complaint.category}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                        <UserIcon size={16} />
                        <span>{complaint.user?.first_name} {complaint.user?.last_name}</span>
                    </div>
                </div>

                <Link to={`/complaints/${complaint.id}`} className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                    Voir les détails
                </Link>
            </div>
        </div>
    );
};

export default ComplaintCard;
