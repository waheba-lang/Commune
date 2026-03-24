import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ComplaintCard from '../components/ComplaintCard';
import { User, Mail, MapPin, CreditCard, Phone, List } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyComplaints = async () => {
            try {
                const response = await api.get('/my-complaints');
                setComplaints(response.data);
            } catch (error) {
                console.error('Error fetching my complaints', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyComplaints();
    }, []);

    if (!user) return null;

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Profile Section */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Mon Profil</h2>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ background: 'var(--primary)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {user.first_name[0]}{user.last_name[0]}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{user.first_name} {user.last_name}</h3>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Citoyen</span>
                                </div>
                            </div>
                            
                            <hr style={{ border: '0', borderTop: '1px solid var(--border)' }} />
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Mail size={16} color="#6b7280" />
                                    <span>{user.email}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Phone size={16} color="#6b7280" />
                                    <span>{user.phone}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <CreditCard size={16} color="#6b7280" />
                                    <span>CIN: {user.cin}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                    <MapPin size={16} color="#6b7280" style={{ marginTop: '2px' }} />
                                    <span>{user.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Complaints Section */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Mes Réclamations</h2>
                        <span style={{ background: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', color: '#4b5563' }}>
                            {complaints.length} au total
                        </span>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>Chargement...</div>
                    ) : complaints.length === 0 ? (
                        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <List size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                            <p>Vous n'avez pas encore déposé de réclamation.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {complaints.map(complaint => (
                                <ComplaintCard key={complaint.id} complaint={complaint} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
