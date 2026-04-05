import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ComplaintCard from '../components/ComplaintCard';
import { useTranslation } from 'react-i18next';
import { PackageOpen } from 'lucide-react';

const MyComplaints = () => {
    const { t } = useTranslation();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyComplaints = async () => {
            try {
                const response = await api.get('/my-complaints');
                setComplaints(response.data.data || []);
            } catch (error) {
                console.error('Error fetching personal complaints', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyComplaints();
    }, []);

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#1e3c72' }}>
                    {t('my_complaints_title', 'Mes Réclamations')}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    {t('my_complaints_desc', 'Suivez l\'état d\'avancement de vos demandes et interventions.')}
                </p>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
                    <div className="spinner"></div>
                </div>
            ) : complaints.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '5rem', background: 'transparent', borderStyle: 'dashed' }}>
                    <PackageOpen size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem', opacity: 0.5 }} />
                    <div style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1.2rem' }}>
                        {t('no_personal_complaints', 'Vous n\'avez soumis aucune réclamation pour le moment.')}
                    </div>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {complaints.map(complaint => (
                        <div key={complaint.id} className="fade-in">
                            <ComplaintCard complaint={complaint} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyComplaints;
