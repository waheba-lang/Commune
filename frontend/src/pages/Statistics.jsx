import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';

const Statistics = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [total, setTotal] = useState(0);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ffc658'];

    useEffect(() => {
        const fetchAndProcessData = async () => {
            try {
                const response = await api.get('/complaints');
                const complaints = response.data.data || [];
                setTotal(complaints.length);

                // Process Category Data
                const catCounts = complaints.reduce((acc, curr) => {
                    acc[curr.category] = (acc[curr.category] || 0) + 1;
                    return acc;
                }, {});
                
                const processedCategoryData = Object.keys(catCounts).map(key => ({
                    name: key,
                    value: catCounts[key]
                }));
                setCategoryData(processedCategoryData);

                // Process Status Data
                const statusCounts = complaints.reduce((acc, curr) => {
                    const s = curr.status === 'Pending' ? t('status_pending', 'En attente') :
                              curr.status === 'In Progress' ? t('status_in_progress', 'En cours') : 
                              t('status_resolved', 'Résolu');
                    acc[s] = (acc[s] || 0) + 1;
                    return acc;
                }, {});

                const processedStatusData = Object.keys(statusCounts).map(key => ({
                    name: key,
                    count: statusCounts[key],
                    fill: key === t('status_resolved', 'Résolu') ? '#10b981' : 
                          key === t('status_pending', 'En attente') ? '#f59e0b' : '#3b82f6'
                }));
                setStatusData(processedStatusData);

            } catch (error) {
                console.error('Error fetching statistics', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndProcessData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: '#1e3c72' }}>
                    {t('stats_page_title', 'Transparence & Statistiques')}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    {t('stats_page_desc', 'Découvrez les chiffres clés concernant la gestion des requêtes citoyennes dans notre municipalité.')}
                </p>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
                    <div className="spinner"></div>
                </div>
            ) : total === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>Aucune donnée disponible pour le moment.</p>
                </div>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                        <div className="card fade-in" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderTop: '4px solid #1e3c72' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total des signalements</h3>
                            <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#1e3c72' }}>{total}</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                        
                        {/* Status Bar Chart */}
                        <div className="card fade-in" style={{ padding: '2rem' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '1.25rem', color: '#1e3c72' }}>
                                <BarChart3 size={24} color="#ff8c42" />
                                {t('stats_status_title', 'État de Résolution')}
                            </h3>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={statusData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <XAxis dataKey="name" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip cursor={{fill: 'transparent'}} />
                                        <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Category Pie Chart */}
                        <div className="card fade-in" style={{ padding: '2rem' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '1.25rem', color: '#1e3c72' }}>
                                <PieChartIcon size={24} color="#ff8c42" />
                                {t('stats_category_title', 'Répartition par Catégorie')}
                            </h3>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
};

export default Statistics;
