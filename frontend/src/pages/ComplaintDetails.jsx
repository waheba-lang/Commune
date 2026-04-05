import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { MapPin, Tag, User, Clock, ArrowLeft, FileText, History, Navigation, Printer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ComplaintDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const response = await api.get(`/complaints/${id}`);
                setComplaint(response.data.data);
            } catch (error) {
                console.error('Error fetching complaint', error);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaint();
    }, [id]);

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner"></div>
        </div>
    );

    if (!complaint) return (
        <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>
            <h2>{t('complaint_not_found', 'Signalement introuvable')}</h2>
            <button onClick={() => navigate(-1)} className="btn btn-outline" style={{marginTop: '1rem'}}>{t('back', 'Retour')}</button>
        </div>
    );

    const imageUrl = complaint.image_url 
        ? complaint.image_url 
        : (complaint.image 
            ? `${import.meta.env.DEV ? 'http://localhost:8000' : ''}/storage/${complaint.image}` 
            : 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&q=80&w=1200');

    return (
        <div className="fade-in" style={{ paddingBottom: '5rem', background: 'var(--bg-main)', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1000px', paddingTop: '3rem' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
                        <ArrowLeft size={18} /> {t('back', 'Retour')}
                    </button>
                    <button onClick={() => window.print()} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Printer size={18} /> {t('print', 'Imprimer')}
                    </button>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    {/* Header Image */}
                    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                        <img src={imageUrl} alt={complaint.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', color: 'white' }}>
                            <span className={`badge badge-${complaint.status?.toLowerCase().replace(' ', '-')}`} style={{ marginBottom: '1rem' }}>
                                {complaint.status}
                            </span>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{complaint.title}</h1>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                        <div>
                            <section style={{ marginBottom: '3rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 700 }}>
                                    <FileText color="var(--primary)" /> {t('description_label', 'Description')}
                                </h3>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                                    {complaint.description}
                                </p>
                            </section>

                            <section>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 700 }}>
                                    <History color="var(--primary)" /> {t('processing_history', 'Historique du traitement')}
                                </h3>
                                <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                                    {complaint.history && complaint.history.length > 0 ? complaint.history.map((h, i) => (
                                        <div key={i} style={{ marginBottom: '2rem', position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: '-1.9rem', top: '0.2rem', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', border: '2px solid white' }}></div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontWeight: 700 }}>{h.status}</span>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(h.created_at).toLocaleString()}</span>
                                            </div>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{h.note}</p>
                                        </div>
                                    )) : (
                                        <p style={{ color: 'var(--text-muted)' }}>{t('no_history', 'Aucun historique disponible.')}</p>
                                    )}
                                </div>
                            </section>
                        </div>

                        <aside>
                            <div className="card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
                                <h4 style={{ marginBottom: '1.5rem', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>{t('incident_details', "Détails de l'incident")}</h4>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <DetailItem icon={<MapPin size={18} />} label={t('location', 'Localisation')} value={`${complaint.city}, ${complaint.address}`} />
                                    <DetailItem icon={<Tag size={18} />} label={t('category_label', 'Catégorie')} value={complaint.category} />
                                    <DetailItem icon={<User size={18} />} label={t('author', 'Auteur')} value={`${complaint.user?.first_name} ${complaint.user?.last_name}`} />
                                    <DetailItem icon={<Clock size={18} />} label={t('submitted_on', 'Soumis le')} value={new Date(complaint.created_at).toLocaleDateString()} />
                                </div>

                                {complaint.latitude && complaint.longitude && (
                                    <div style={{ marginTop: '2rem', height: '200px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                        <MapContainer center={[complaint.latitude, complaint.longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            <Marker position={[complaint.latitude, complaint.longitude]}>
                                                <Popup>{complaint.title}</Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon, label, value }) => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
        <div style={{ color: 'var(--primary)', marginTop: '0.1rem' }}>{icon}</div>
        <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{value}</div>
        </div>
    </div>
);

export default ComplaintDetails;
