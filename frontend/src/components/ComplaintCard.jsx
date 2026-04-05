import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag, Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ComplaintCard = ({ complaint }) => {
    if (!complaint) return null;

    const {
        id,
        title = 'Sans titre',
        description = '',
        status = 'Pending',
        city = '',
        category = 'Général',
        created_at
    } = complaint;
    
    const { t } = useTranslation();

    const statusClass = `badge badge-${status.toLowerCase().replace(' ', '-')}`;
    
    const imageUrl = complaint.image_url 
        ? complaint.image_url 
        : (complaint.image 
            ? `${import.meta.env.DEV ? 'http://localhost:8000' : ''}/storage/${complaint.image}` 
            : 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&q=80&w=600');

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
                <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className={statusClass}>
                        {status === 'Pending' ? t('status_pending', 'En attente') : status === 'In Progress' ? t('status_in_progress', 'En cours') : t('status_resolved', 'Résolu')}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Calendar size={12} />
                        {created_at ? new Date(created_at).toLocaleDateString() : t('date_unknown', 'Date inconnue')}
                    </div>
                </div>
                
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                    {description || t('no_description', 'Aucune description disponible.')}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={14} color="var(--primary)" />
                        <span>{city}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Tag size={14} color="var(--secondary)" />
                        <span>{category}</span>
                    </div>
                </div>

                <Link to={`/complaints/${id}`} className="btn btn-outline" style={{ textAlign: 'center', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    {t('view_details', 'Voir les détails')} <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
};

export default ComplaintCard;
