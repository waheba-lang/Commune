import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useTranslation } from 'react-i18next';
import { FileText, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const EServices = () => {
    const { t } = useTranslation();
    const [documentType, setDocumentType] = useState('');
    const [notes, setNotes] = useState('');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get('/my-requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            } finally {
                setFetching(false);
            }
        };
        fetchRequests();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/document-requests', { type: documentType, notes });
            setRequests([response.data, ...requests]);
            setDocumentType('');
            setNotes('');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            alert(t('error_submit', { defaultValue: 'Erreur lors de la demande' }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '4rem 0', minHeight: '80vh', background: '#f8fafc' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3c72', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <FileText size={36} />
                        {t('services')}
                    </h1>
                    <p style={{ color: '#64748b', marginTop: '1rem', fontSize: '1.2rem' }}>
                        {t('services_subtitle', { defaultValue: 'Demandes administratives simplifiées' })}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    {/* Request Form */}
                    <div className="card" style={{ padding: '2.5rem', height: 'fit-content' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1e3c72' }}>
                            {t('new_request', { defaultValue: 'Nouvelle demande de document' })}
                        </h2>
                        
                        {success && (
                            <div style={{ background: '#ecfdf5', color: '#059669', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={20} />
                                <span>{t('request_success', { defaultValue: 'Demande envoyée avec succès !' })}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: '600' }}>{t('document_type', { defaultValue: 'Type de document' })}</label>
                                <select 
                                    value={documentType} 
                                    onChange={(e) => setDocumentType(e.target.value)} 
                                    required
                                    style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', outline: 'none' }}
                                >
                                    <option value="">-- {t('select_document', { defaultValue: 'Sélectionner un document' })} --</option>
                                    <option value="Acte de Naissance">Acte de Naissance (Document Original)</option>
                                    <option value="Certificat de Résidence">Certificat de Résidence</option>
                                    <option value="Attestation Administrative">Attestation Administrative</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: '600' }}>{t('notes', { defaultValue: 'Notes (Optionnel)' })}</label>
                                <textarea 
                                    value={notes} 
                                    onChange={(e) => setNotes(e.target.value)} 
                                    placeholder={t('request_notes_placeholder', { defaultValue: 'Précisez l\'objet de votre demande...' })}
                                    style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', minHeight: '100px', resize: 'none' }}
                                />
                            </div>

                            <button type="submit" disabled={loading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#1e3c72', padding: '0.75rem' }}>
                                <Send size={20} />
                                {loading ? t('loading', { defaultValue: 'Envoi...' }) : t('submit_request', { defaultValue: 'Envoyer la demande' })}
                            </button>
                        </form>
                    </div>

                    {/* History */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1e3c72' }}>
                            {t('my_requests', { defaultValue: 'Mes demandes récentes' })}
                        </h2>

                        {fetching ? (
                            <p>{t('loading', { defaultValue: 'Chargement...' })}</p>
                        ) : requests.length === 0 ? (
                            <div style={{ padding: '3rem', textAlign: 'center', background: 'white', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
                                <AlertCircle size={48} style={{ color: '#94a3b8', margin: '0 auto 1rem' }} />
                                <p style={{ color: '#64748b' }}>{t('no_requests', { defaultValue: 'Aucune demande effectuée.' })}</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {requests.map(req => (
                                    <div key={req.id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h3 style={{ fontWeight: 'bold', color: '#1e3c72' }}>{req.type}</h3>
                                            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                                                {new Date(req.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div style={{ 
                                            padding: '0.5rem 1rem', 
                                            borderRadius: '2rem', 
                                            fontSize: '0.875rem', 
                                            fontWeight: 'bold',
                                            background: req.status === 'pending' ? '#fef3c7' : (req.status === 'approved' ? '#d1fae5' : '#fee2e2'),
                                            color: req.status === 'pending' ? '#92400e' : (req.status === 'approved' ? '#065f46' : '#991b1b'),
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem'
                                        }}>
                                            {req.status === 'pending' ? <Clock size={16} /> : (req.status === 'approved' ? <CheckCircle size={16} /> : <AlertCircle size={16} />)}
                                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EServices;
