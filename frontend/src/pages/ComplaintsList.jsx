import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ComplaintCard from '../components/ComplaintCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ComplaintsList = () => {
    const { t } = useTranslation();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await api.get('/complaints');
                setComplaints(response.data.data || []);
            } catch (error) {
                console.error('Error fetching complaints', error);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    const filteredComplaints = complaints.filter(c => {
        const title = c.title ? c.title.toLowerCase() : '';
        const city = c.city ? c.city.toLowerCase() : '';
        const search = searchTerm.toLowerCase();
        const matchesSearch = title.includes(search) || city.includes(search);
        const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                    {t('all_complaints_title')}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    {t('all_complaints_desc')}
                </p>
            </div>

            {/* Filters */}
            <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', background: 'white' }}>
                <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        className="form-input"
                        placeholder={t('search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '0.75rem 1rem 0.75rem 3rem', width: '100%', borderRadius: '0.5rem', border: '1px solid #e5e7eb', outline: 'none' }}
                    />
                </div>
                <div style={{ width: '240px', position: 'relative' }}>
                    <SlidersHorizontal size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <select
                        className="form-input"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ padding: '0.75rem 1rem 0.75rem 3rem', width: '100%', borderRadius: '0.5rem', border: '1px solid #e5e7eb', outline: 'none', cursor: 'pointer' }}
                    >
                        <option value="All">{t('all_categories')}</option>
                        <option value="roads">{t('cat_roads')}</option>
                        <option value="electricity">{t('cat_electricity')}</option>
                        <option value="water">{t('cat_water')}</option>
                        <option value="environment">{t('cat_environment')}</option>
                        <option value="security">{t('cat_security')}</option>
                        <option value="other">{t('cat_other')}</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem 0' }}>
                    <div className="spinner"></div>
                </div>
            ) : filteredComplaints.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '5rem', background: 'transparent', borderStyle: 'dashed' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{t('no_results')}</div>
                    <button className="btn btn-outline" onClick={() => {setSearchTerm(''); setSelectedCategory('All')}}>{t('reset_filters')}</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
                    {filteredComplaints.map(complaint => (
                        <div key={complaint.id} className="fade-in">
                            <ComplaintCard complaint={complaint} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComplaintsList;
