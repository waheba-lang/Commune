import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { MapPin, Tag, User, Clock, ArrowLeft, FileText } from 'lucide-react';

const ComplaintDetails = () => {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const response = await api.get(`/complaints/${id}`);
                setComplaint(response.data);
            } catch (error) {
                console.error('Error fetching complaint', error);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaint();
    }, [id]);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
            <div style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 'bold' }}>Chargement...</div>
        </div>
    );

    if (!complaint) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
            <div style={{ fontSize: '1.25rem', color: '#64748b', fontWeight: 'bold' }}>Réclamation introuvable.</div>
        </div>
    );

    const imageUrl = complaint.image
        ? `http://localhost:8000/storage/${complaint.image}`
        : 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&q=80&w=1200';

    return (
        <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
            padding: '2rem 1rem',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ 
                        display: 'flex', alignItems: 'center', gap: '0.4rem', 
                        background: 'rgba(255, 255, 255, 0.7)', 
                        backdropFilter: 'blur(10px)',
                        color: 'var(--primary)', fontWeight: '600', 
                        padding: '0.5rem 1rem', borderRadius: '9999px',
                        marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.8)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                    }}
                >
                    <ArrowLeft size={16} /> Retour aux réclamations
                </button>

                <div style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Hero Image Section */}
                    <div style={{ position: 'relative', height: '280px', width: '100%' }}>
                        <img 
                            src={imageUrl} 
                            alt={complaint.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'
                        }} />
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            padding: '2rem', color: 'white'
                        }}>
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                <span className={`badge badge-${complaint.status?.toLowerCase().replace(' ', '-') || 'pending'}`} 
                                    style={{ fontSize: '0.75rem', padding: '0.4rem 1rem', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                    {complaint.status}
                                </span>
                                <span style={{ 
                                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                                    padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.75rem',
                                    display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(255,255,255,0.3)'
                                }}>
                                    <Tag size={14} /> {complaint.category}
                                </span>
                            </div>
                            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', lineHeight: '1.2', textShadow: '0 2px 8px rgba(0,0,0,0.4)', maxWidth: '700px' }}>
                                {complaint.title}
                            </h1>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div style={{ 
                        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', 
                        padding: '2rem',
                        '@media (max-width: 768px)': {
                            display: 'flex', flexDirection: 'column'
                        }
                    }}>
                        
                        {/* Main Info */}
                        <div style={{ gridColumn: 'span 7' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <FileText color="var(--primary)" size={24} />
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>Détails de la Réclamation</h2>
                            </div>
                            <div style={{ 
                                background: '#f8fafc', padding: '1.5rem',
                                borderRadius: '12px', border: '1px solid #e2e8f0',
                                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
                            }}>
                                <p style={{ 
                                    fontSize: '1rem', color: '#334155', lineHeight: '1.6', 
                                    whiteSpace: 'pre-wrap', margin: 0
                                }}>
                                    {complaint.description}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ 
                                background: '#ffffff', borderRadius: '12px', padding: '1.5rem',
                                border: '1px solid #e2e8f0', boxShadow: '0 4px 15px -5px rgba(0,0,0,0.03)'
                            }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.25rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                                    Informations Clés
                                </h3>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                        <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '10px' }}>
                                            <MapPin color="var(--primary)" size={18} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lieu</p>
                                            <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.95rem' }}>{complaint.city}</p>
                                            <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: '0.15rem' }}>{complaint.address}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                        <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '10px' }}>
                                            <User color="var(--primary)" size={18} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Signalé par</p>
                                            <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.95rem' }}>{complaint.user?.first_name} {complaint.user?.last_name}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                        <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '10px' }}>
                                            <Clock color="var(--primary)" size={18} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date de création</p>
                                            <p style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.95rem' }}>
                                                {new Date(complaint.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetails;
