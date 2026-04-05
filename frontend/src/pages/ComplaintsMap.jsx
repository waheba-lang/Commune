import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../api/axios';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Tag } from 'lucide-react';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ComplaintsMap = () => {
    const { t } = useTranslation();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await api.get('/complaints');
                setComplaints(response.data.data || []);
            } catch (error) {
                console.error('Error fetching complaints for map', error);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    // Center on Oujda city by default
    const mapCenter = [34.6814, -1.9086];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 72px)' }}>
            <div style={{ background: '#1e3c72', color: 'white', padding: '1.5rem 2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{t('map_title', 'Carte Citoyenne')}</h1>
                <p style={{ opacity: 0.8 }}>{t('map_desc', 'Explorez les réclamations signalées à travers la ville.')}</p>
            </div>

            <div style={{ flex: 1, position: 'relative', width: '100%', zIndex: 0 }}>
                {loading ? (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(255,255,255,0.7)' }}>
                        <div className="spinner"></div>
                    </div>
                ) : null}

                <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer 
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />

                    {complaints.filter(c => c.latitude && c.longitude).map(complaint => (
                        <Marker key={complaint.id} position={[complaint.latitude, complaint.longitude]}>
                            <Popup minWidth={250}>
                                <div style={{ margin: '-13px -20px -13px -20px', borderRadius: '12px', overflow: 'hidden' }}>
                                    {(complaint.image_url || complaint.image) && (
                                        <div style={{ height: '120px', width: '100%' }}>
                                            <img 
                                                src={complaint.image_url || `${import.meta.env.DEV ? 'http://localhost:8000' : ''}/storage/${complaint.image}`} 
                                                alt={complaint.title} 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                            />
                                        </div>
                                    )}
                                    <div style={{ padding: '15px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <span className={`badge badge-${complaint.status?.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '0.65rem' }}>
                                                {complaint.status}
                                            </span>
                                            <span style={{ fontSize: '0.7rem', color: '#888' }}>
                                                {new Date(complaint.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <strong style={{ display: 'block', fontSize: '1rem', color: '#1e3c72', marginBottom: '8px' }}>
                                            {complaint.title}
                                        </strong>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>
                                            <Tag size={12} /> {complaint.category}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#666', marginBottom: '12px' }}>
                                            <MapPin size={12} /> {complaint.city}
                                        </div>
                                        
                                        <Link to={`/complaints/${complaint.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', background: '#ff8c42', color: 'white', textDecoration: 'none', padding: '6px 0', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                            {t('view_details', 'Voir les détails')} <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default ComplaintsMap;
