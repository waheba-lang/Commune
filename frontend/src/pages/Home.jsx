import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useTranslation } from 'react-i18next';

function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await api.get('/complaints');
                // API now uses JsonResource, so data is in response.data.data
                const data = response.data.data || response.data;
                setComplaints(data.slice(0, 3)); // Show only first 3 on home
            } catch (error) {
                console.error('Error fetching complaints', error);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    return (
        <div className="homepage" style={styles.homepage}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <div style={styles.heroText}>
                        <h1 style={styles.heroH1}>
                            {t('welcome_part_1')}                         <span style={{ color: '#a5beecff', }}>Recla<span style={{ color: '#ff8c42' }}>Plus</span></span>

                        </h1>
                        <h2 style={styles.heroH2}>{t('hero_description')}</h2>
                        <div style={styles.heroDescription}>
                            <p style={styles.heroDescriptionP}>
                                {t('hero_extended_desc')}
                            </p>
                            <p style={{ ...styles.heroDescriptionP, ...styles.heroCtaText }}>
                                {t('hero_cta_text')}
                            </p>
                        </div>
                        <div style={styles.heroButtons}>
                            <Link to="/add-complaint" style={{ textDecoration: 'none' }}>
                                <button style={{ ...styles.btn, ...styles.btnPrimary, ...styles.btnLarge }}>
                                    <i className="fas fa-plus-circle" style={styles.btnIcon}></i>
                                    {t('submit_complaint')}
                                </button>
                            </Link>
                            <Link to="/complaints" style={{ textDecoration: 'none' }}>
                                <button style={{ ...styles.btn, ...styles.btnOutline, ...styles.btnLarge }}>
                                    <i className="fas fa-list" style={styles.btnIcon}></i>
                                    {t('view_complaints')}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section style={styles.features}>
                <div style={styles.featuresContainer}>
                    <div style={styles.featureCard}>
                        <div style={{ ...styles.featureIcon, background: '#e3f2fd', color: '#1976d2' }}>
                            <i className="fas fa-clock"></i>
                        </div>
                        <h3 style={styles.featureTitle}>{t('step_1_title')}</h3>
                        <p style={styles.featureText}>{t('step_1_desc')}</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={{ ...styles.featureIcon, background: '#fff3e0', color: '#f57c00' }}>
                            <i className="fas fa-search"></i>
                        </div>
                        <h3 style={styles.featureTitle}>{t('step_2_title')}</h3>
                        <p style={styles.featureText}>{t('step_2_desc')}</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={{ ...styles.featureIcon, background: '#e8f5e8', color: '#388e3c' }}>
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h3 style={styles.featureTitle}>{t('step_3_title')}</h3>
                        <p style={styles.featureText}>{t('step_3_desc')}</p>
                    </div>
                </div>
            </section>

            {/* Latest Complaints */}
            <section style={styles.latestSection}>
                <div style={styles.latestContainer}>
                    <div style={styles.latestHeader}>
                        <h2 style={styles.latestTitle}>{t('latest_complaints')}</h2>
                        <Link to="/complaints" style={styles.latestLink}>
                            {t('view_all')} <i className="fas fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
                        </Link>
                    </div>

                    {loading ? (
                        <div style={styles.loadingContainer}>
                            <div style={styles.loadingSpinner}></div>
                            <p style={styles.loadingText}>{t('loading_complaints')}</p>
                        </div>
                    ) : (
                        <div style={styles.complaintsGrid}>
                            {complaints.map(complaint => (
                                <div key={complaint.id} style={styles.complaintCard}>
                                    <div style={styles.complaintHeader}>
                                        <span style={styles.complaintCategory}>{complaint.category}</span>
                                        <span style={{
                                            ...styles.complaintStatus,
                                            ...(complaint.status?.toLowerCase() === 'resolved' ? styles.statusResolved :
                                                complaint.status?.toLowerCase() === 'in progress' ? styles.statusProgress :
                                                    styles.statusPending)
                                        }}>
                                            {complaint.status === 'Pending' ? t('status_pending', 'En attente') : complaint.status === 'In Progress' ? t('status_in_progress', 'En cours') : t('status_resolved', 'Résolu')}
                                        </span>
                                    </div>
                                    <h3 style={styles.complaintTitle}>{complaint.title}</h3>
                                    <p style={styles.complaintDescription}>{complaint.description?.substring(0, 100)}...</p>
                                    <div style={styles.complaintFooter}>
                                        <span style={styles.complaintDate}>
                                            <i className="far fa-calendar" style={styles.complaintIcon}></i>
                                            {new Date(complaint.created_at).toLocaleDateString()}
                                        </span>
                                        <Link to={`/complaints/${complaint.id}`} style={styles.complaintDetails}>
                                            {t('details')} <i className="fas fa-chevron-right" style={{ fontSize: '0.8rem', marginLeft: '0.3rem' }}></i>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <div style={styles.footerContent}>
                    <p style={styles.footerText}>{t('footer_copyright')} {t('rights_reserved')}</p>
                    <div style={styles.footerLinks}>
                        <Link to="/mentions-legales" style={styles.footerLink}>{t('legal_notice')}</Link>
                        <Link to="/confidentialite" style={styles.footerLink}>{t('privacy_policy')}</Link>
                        <Link to="/accessibilite" style={styles.footerLink}>{t('accessibility')}</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const styles = {
    homepage: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
        background: '#f8fafc',
        minHeight: '100vh',
    },
    hero: {
        padding: '8rem 2rem',
        background: 'linear-gradient(rgba(30, 60, 114, 0.8), rgba(30, 60, 114, 0.6)), url("/hero-bg.jpg") center/cover no-repeat',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        marginTop: '-1px', // close gaps
    },
    heroContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    heroText: {
        flex: 1,
        maxWidth: '800px',
    },
    heroH1: {
        fontSize: '3.5rem',
        lineHeight: 1.2,
        marginBottom: '1rem',
        color: 'white',
        fontWeight: '800',
    },
    highlight: {
        color: '#ff8c42',
    },
    heroH2: {
        fontSize: '1.5rem',
        fontWeight: 400,
        color: '#e2e8f0',
        marginBottom: '2rem',
    },
    heroDescription: {
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2.5rem',
        borderLeft: '4px solid #ff8c42',
    },
    heroDescriptionP: {
        fontSize: '1.1rem',
        lineHeight: 1.6,
        color: 'white',
    },
    heroCtaText: {
        fontWeight: 600,
        color: '#ffb347',
        marginTop: '0.5rem',
    },
    heroButtons: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
    },
    btn: {
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
    },
    btnPrimary: {
        background: '#ff8c42',
        color: 'white',
    },
    btnOutline: {
        background: 'transparent',
        color: 'white',
        border: '2px solid white',
    },
    btnLarge: {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
    },

    features: {
        background: 'white',
        padding: '4rem 2rem',
    },
    featuresContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
    },
    featureCard: {
        textAlign: 'center',
        padding: '2rem',
    },
    featureIcon: {
        width: '64px',
        height: '64px',
        margin: '0 auto 1.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
    },
    featureTitle: {
        fontSize: '1.25rem',
        marginBottom: '1rem',
        color: '#1e3c72',
    },
    featureText: {
        color: '#6b7280',
        lineHeight: 1.6,
    },
    latestSection: {
        padding: '4rem 2rem',
    },
    latestContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    latestHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
    },
    latestTitle: {
        fontSize: '2rem',
        color: '#1e3c72',
    },
    latestLink: {
        color: '#ff8c42',
        textDecoration: 'none',
        fontWeight: 600,
    },
    complaintsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
    },
    complaintCard: {
        background: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    complaintHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
    },
    complaintCategory: {
        fontSize: '0.8rem',
        color: '#6b7280',
        textTransform: 'uppercase',
        fontWeight: 700,
    },
    complaintStatus: {
        fontSize: '0.75rem',
        padding: '0.25rem 0.75rem',
        borderRadius: '999px',
        fontWeight: 600,
    },
    statusPending: { background: '#fef3c7', color: '#92400e' },
    statusProgress: { background: '#dbeafe', color: '#1e40af' },
    statusResolved: { background: '#d1fae5', color: '#065f46' },
    complaintTitle: {
        fontSize: '1.25rem',
        color: '#1e3c72',
        marginBottom: '0.5rem',
    },
    complaintDescription: {
        fontSize: '0.9rem',
        color: '#4b5563',
        lineHeight: 1.5,
        marginBottom: '1.5rem',
    },
    complaintFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #f3f4f6',
        paddingTop: '1rem',
    },
    complaintDate: {
        fontSize: '0.8rem',
        color: '#9ca3af',
    },
    complaintDetails: {
        color: '#ff8c42',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: 600,
    },
    footer: {
        background: '#1e3c72',
        color: 'white',
        padding: '3rem 2rem',
        marginTop: 'auto',
    },
    footerContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
    },
    footerLinks: {
        display: 'flex',
        gap: '2rem',
    },
    footerLink: {
        color: 'white',
        textDecoration: 'none',
        opacity: 0.8,
    }
};

export default Home;