// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../api/axios';
// import ComplaintCard from '../components/ComplaintCard';
// import { ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// const Home = () => {
//     const [complaints, setComplaints] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchComplaints = async () => {
//             try {
//                 const response = await api.get('/complaints');
//                 setComplaints(response.data.slice(0, 3)); // Show only first 3 on home
//             } catch (error) {
//                 console.error('Error fetching complaints', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchComplaints();
//     }, []);

//     return (
//         <div>
//             {/* Hero Section */}
//             <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1a56db 100%)', color: 'white', padding: '5rem 0' }}>
//                 <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
//                     <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', maxWidth: '800px' }}>
//                         Ensemble pour une ville meilleure et plus connect├®e.
//                     </h1>
//                     <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', opacity: 0.9 }}>
//                         D├®posez vos r├®clamations en quelques clics et suivez leur r├®solution en temps r├®el par les autorit├®s comp├®tentes.
//                     </p>
//                     <div style={{ display: 'flex', gap: '1rem' }}>
//                         <Link to="/add-complaint" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '0.75rem 2rem', fontWeight: 'bold' }}>
//                             D├®poser une plainte
//                         </Link>
//                         <Link to="/complaints" className="btn btn-outline" style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '0.75rem 2rem' }}>
//                             Voir les r├®clamations
//                         </Link>
//                     </div>
//                 </div>
//             </section>

//             {/* Stats / How it works */}
//             <section style={{ padding: '5rem 0', background: 'white' }}>
//                 <div className="container">
//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
//                         <div style={{ textAlign: 'center', padding: '2rem' }}>
//                             <div style={{ background: 'var(--status-pending)', color: 'var(--status-pending-text)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
//                                 <Clock size={32} />
//                             </div>
//                             <h3 style={{ marginBottom: '0.5rem' }}>D├®posez</h3>
//                             <p style={{ color: 'var(--text-muted)' }}>Signalez un probl├¿me avec photos et description pr├®cise.</p>
//                         </div>
//                         <div style={{ textAlign: 'center', padding: '2rem' }}>
//                             <div style={{ background: 'var(--status-progress)', color: 'var(--status-progress-text)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
//                                 <AlertCircle size={32} />
//                             </div>
//                             <h3 style={{ marginBottom: '0.5rem' }}>Suivez</h3>
//                             <p style={{ color: 'var(--text-muted)' }}>Soyez inform├® de l'avancement du traitement de votre demande.</p>
//                         </div>
//                         <div style={{ textAlign: 'center', padding: '2rem' }}>
//                             <div style={{ background: 'var(--status-resolved)', color: 'var(--status-resolved-text)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
//                                 <CheckCircle size={32} />
//                             </div>
//                             <h3 style={{ marginBottom: '0.5rem' }}>R├®solu</h3>
//                             <p style={{ color: 'var(--text-muted)' }}>Recevez une confirmation d├¿s que le probl├¿me est r├®gl├®.</p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Latest Complaints */}
//             <section style={{ padding: '5rem 0' }}>
//                 <div className="container">
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
//                         <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>R├®clamations r├®centes</h2>
//                         <Link to="/complaints" style={{ color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                             Tout voir <ArrowRight size={18} />
//                         </Link>
//                     </div>

//                     {loading ? (
//                         <div style={{ textAlign: 'center', padding: '3rem' }}>Chargement...</div>
//                     ) : (
//                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
//                             {complaints.map(complaint => (
//                                 <ComplaintCard key={complaint.id} complaint={complaint} />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

function Home() {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await api.get('/complaints');
                setComplaints(response.data.slice(0, 3)); // Show only first 3 on home
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
            {/* Menu de navigation */}
            {/* <nav style={styles.navbar}>
                <div style={styles.navContainer}>
                    <div style={styles.logo}>
                        <i className="fas fa-map-marker-alt" style={styles.logoIcon}></i>
                        <span>Recla<span style={styles.logoPlus}>Plus</span></span>
                    </div>
                    <ul style={styles.navMenu}>
                        <li style={{ ...styles.navItem, ...styles.navItemActive }}>
                            <Link to="/" style={styles.navLink}><i className="fas fa-home" style={styles.navIcon}></i> Accueil</Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/recla" style={styles.navLink}>
                                <i className="fas fa-file-alt" style={styles.navIcon}></i>
                                R├®clamer
                            </Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/reclamations" style={styles.navLink}>
                                <i className="fas fa-list" style={styles.navIcon}></i>
                                R├®clamations
                            </Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/suivi" style={styles.navLink}>
                                <i className="fas fa-search" style={styles.navIcon}></i>
                                Suivi
                            </Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/contact" style={styles.navLink}>
                                <i className="fas fa-envelope" style={styles.navIcon}></i>
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div style={styles.navButtons}>
                        <button onClick={() => navigate("/login")} style={{ ...styles.btn, ...styles.btnOutline }}>Se connecter</button>
                        <button onClick={() => navigate("/Inscription")} style={{ ...styles.btn, ...styles.btnPrimary }}>S'inscrire</button>
                    </div>
                </div>
            </nav> */}

            {/* Hero Section - Logic from AI but style from you */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <div style={styles.heroText}>
                        <h1 style={styles.heroH1}>
                            Bienvenue sur <span style={styles.highlight}>ReclaPlus</span>
                        </h1>
                        <h2 style={styles.heroH2}>la plateforme de  de r├®clamations de la ville d'Oujda.</h2>
                        <div style={styles.heroDescription}>
                            <p style={styles.heroDescriptionP}>
                                Bienvenue sur ReclaPlus, la plateforme de gestion des r├®clamations de la ville d'Oujda.
                                cette plateforme est d├®di├®e ├á la gestion des r├®clamations des citoyens de la ville d'Oujda
                                D├®posez vos r├®clamations en quelques clics et suivez leur r├®solution
                                en temps r├®el par les autorit├®s comp├®tentes de la ville d'Oujda.
                            </p>
                            <p style={{ ...styles.heroDescriptionP, ...styles.heroCtaText }}>
                                Plus de 500 probl├¿mes r├®solus depuis le lancement.
                            </p>
                        </div>
                        <div style={styles.heroButtons}>
                            <Link to="/add-complaint">
                                <button style={{ ...styles.btn, ...styles.btnPrimary, ...styles.btnLarge }}>
                                    <i className="fas fa-plus-circle" style={styles.btnIcon}></i>
                                    D├®poser une r├®clamation
                                </button>
                            </Link>
                            <Link to="/complaints">
                                <button style={{ ...styles.btn, ...styles.btnOutline, ...styles.btnLarge }}>
                                    <i className="fas fa-list" style={styles.btnIcon}></i>
                                    Voir les r├®clamations
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div style={styles.heroImage}>
                        <i className="fas fa-city" style={styles.heroImageIcon}></i>
                    </div>
                </div>
            </section>

            {/* How it works - Logic from AI but style from you */}
            <section style={styles.features}>
                <div style={styles.featuresContainer}>
                    <div style={styles.featureCard}>
                        <div style={{ ...styles.featureIcon, background: '#e3f2fd', color: '#1976d2' }}>
                            <i className="fas fa-clock"></i>
                        </div>
                        <h3 style={styles.featureTitle}>D├®posez</h3>
                        <p style={styles.featureText}>Signalez un probl├¿me avec photos et description pr├®cise en quelques clics.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={{ ...styles.featureIcon, background: '#fff3e0', color: '#f57c00' }}>
                            <i className="fas fa-search"></i>
                        </div>
                        <h3 style={styles.featureTitle}>Suivez</h3>
                        <p style={styles.featureText}>Soyez inform├® en temps r├®el de l'avancement du traitement de votre demande.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={{ ...styles.featureIcon, background: '#e8f5e8', color: '#388e3c' }}>
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h3 style={styles.featureTitle}>R├®solu</h3>
                        <p style={styles.featureText}>Recevez une confirmation d├¿s que le probl├¿me est r├®gl├® par les services comp├®tents.</p>
                    </div>
                </div>
            </section>

            {/* Latest Complaints - New dynamic section with your style */}
            <section style={styles.latestSection}>
                <div style={styles.latestContainer}>
                    <div style={styles.latestHeader}>
                        <h2 style={styles.latestTitle}>R├®clamations r├®centes</h2>
                        <Link to="/reclamations" style={styles.latestLink}>
                            Tout voir <i className="fas fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
                        </Link>
                    </div>

                    {loading ? (
                        <div style={styles.loadingContainer}>
                            <div style={styles.loadingSpinner}></div>
                            <p style={styles.loadingText}>Chargement des r├®clamations...</p>
                        </div>
                    ) : (
                        <div style={styles.complaintsGrid}>
                            {complaints.map(complaint => (
                                <div key={complaint.id} style={styles.complaintCard}>
                                    <div style={styles.complaintHeader}>
                                        <span style={styles.complaintCategory}>{complaint.category}</span>
                                        <span style={{
                                            ...styles.complaintStatus,
                                            ...(complaint.status === 'r├®solu' ? styles.statusResolved :
                                                complaint.status === 'en cours' ? styles.statusProgress :
                                                    styles.statusPending)
                                        }}>
                                            {complaint.status}
                                        </span>
                                    </div>
                                    <h3 style={styles.complaintTitle}>{complaint.title}</h3>
                                    <p style={styles.complaintDescription}>{complaint.description}</p>
                                    <div style={styles.complaintFooter}>
                                        <span style={styles.complaintDate}>
                                            <i className="far fa-calendar" style={styles.complaintIcon}></i>
                                            {new Date(complaint.date).toLocaleDateString()}
                                        </span>
                                        <Link to={`/reclamation/${complaint.id}`} style={styles.complaintDetails}>
                                            D├®tails <i className="fas fa-chevron-right" style={{ fontSize: '0.8rem', marginLeft: '0.3rem' }}></i>
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
                    <p style={styles.footerText}>┬® 2026 ReclaPlus - Ville d'Oujda. Tous droits r├®serv├®s.</p>
                    <div style={styles.footerLinks}>
                        <Link to="/mentions-legales" style={styles.footerLink}>Mentions l├®gales</Link>
                        <Link to="/confidentialite" style={styles.footerLink}>Confidentialit├®</Link>
                        <Link to="/accessibilite" style={styles.footerLink}>Accessibilit├®</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const styles = {
    // Global
    homepage: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e9edf5 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },

    // Navbar (100% your style)
    // navbar: {
    //     background: 'white',
    //     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    //     padding: '0.8rem 2rem',
    //     position: 'sticky',
    //     top: 0,
    //     zIndex: 1000,
    // },
    // navContainer: {
    //     maxWidth: '1400px',
    //     margin: '0 auto',
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.8rem',
        fontWeight: 700,
        color: '#1e3c72',
    },
    logoIcon: {
        color: '#ff8c42',
        fontSize: '2rem',
    },
    logoPlus: {
        color: '#ff8c42',
    },
    navMenu: {
        display: 'flex',
        listStyle: 'none',
        gap: '2rem',
        margin: 0,
        padding: 0,
    },
    navItem: {
        listStyle: 'none',
    },
    navItemActive: {
        borderBottom: '2px solid #ff8c42',
    },
    navLink: {
        textDecoration: 'none',
        color: '#2c3e50',
        fontWeight: 500,
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 0',
        cursor: 'pointer',
    },
    navIcon: {
        fontSize: '1rem',
        color: '#ff8c42',
    },
    navButtons: {
        display: 'flex',
        gap: '1rem',
    },

    // Buttons (100% your style)
    btn: {
        padding: '0.6rem 1.2rem',
        border: 'none',
        borderRadius: '50px',
        fontWeight: 600,
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'all 0.3s',
        display: 'inlineFlex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    btnOutline: {
        background: 'transparent',
        border: '2px solid #1e3c72',
        color: '#1e3c72',
    },
    btnPrimary: {
        background: '#ff8c42',
        color: 'white',
        border: '2px solid #ff8c42',
    },
    btnLarge: {
        padding: '0.8rem 2rem',
        fontSize: '1.1rem',
    },
    btnIcon: {
        marginRight: '0.3rem',
    },

    // Hero (your style with AI text)
    hero: {
        padding: '2rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        flex: 1,
    },
    heroContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '4rem',
    },
    heroText: {
        flex: 1,
    },
    heroH1: {
        fontSize: '3.5rem',
        lineHeight: 1.2,
        marginBottom: '0.5rem',
        color: '#1e3c72',
    },
    highlight: {
        color: '#ff8c42',
        position: 'relative',
        display: 'inlineBlock',
    },
    heroH2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        color: '#4a6fa5',
        marginBottom: '1rem',
    },
    heroDescription: {
        background: 'white',
        padding: '1rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        margin: '1rem 0',
        borderLeft: '5px solid #ff8c42',
    },
    heroDescriptionP: {
        fontSize: '1rem',
        lineHeight: 1.6,
        color: '#2c3e50',
        marginBottom: '1rem',
    },
    heroCtaText: {
        fontWeight: 600,
        color: '#ff8c42',
        marginBottom: 0,
    },
    heroButtons: {
        display: 'flex',
        gap: '1.5rem',
        marginTop: '2rem',
        flexWrap: 'wrap',
    },
    heroImage: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(145deg, #1e3c72, #2a5298)',
        borderRadius: '30px',
        padding: '3rem',
        color: 'white',
        boxShadow: '20px 20px 40px rgba(0, 0, 0, 0.1)',
    },
    heroImageIcon: {
        fontSize: '15rem',
        opacity: 0.9,
        filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
    },

    // Features (your style with AI content)
    features: {
        background: 'white',
        padding: '4rem 2rem',
    },
    featuresContainer: {
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    },
    featureCard: {
        background: 'white',
        padding: '2rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        transition: 'transform 0.3s',
        border: '1px solid #f0f0f0',
    },
    featureIcon: {
        width: '80px',
        height: '80px',
        margin: '0 auto 1.5rem',
        background: '#fff5ed',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        color: '#ff8c42',
    },
    featureTitle: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: '#1e3c72',
    },
    featureText: {
        color: '#666',
        lineHeight: 1.6,
    },

    // Latest Complaints Section (new section with your styling)
    latestSection: {
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e9edf5 100%)',
    },
    latestContainer: {
        maxWidth: '1400px',
        margin: '0 auto',
    },
    latestHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
    },
    latestTitle: {
        fontSize: '2.5rem',
        color: '#1e3c72',
        margin: 0,
    },
    latestLink: {
        color: '#ff8c42',
        textDecoration: 'none',
        fontSize: '1.2rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.3s',
        cursor: 'pointer',
    },
    complaintsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
    },
    complaintCard: {
        background: 'white',
        borderRadius: '20px',
        padding: '1.5rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.3s, boxShadow 0.3s',
        border: '1px solid #f0f0f0',
    },
    complaintHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    complaintCategory: {
        background: '#f0f0f0',
        padding: '0.3rem 1rem',
        borderRadius: '50px',
        fontSize: '0.9rem',
        color: '#666',
    },
    complaintStatus: {
        padding: '0.3rem 1rem',
        borderRadius: '50px',
        fontSize: '0.9rem',
        fontWeight: 600,
    },
    statusPending: {
        background: '#fff3cd',
        color: '#856404',
    },
    statusProgress: {
        background: '#cce5ff',
        color: '#004085',
    },
    statusResolved: {
        background: '#d4edda',
        color: '#155724',
    },
    complaintTitle: {
        fontSize: '1.3rem',
        color: '#1e3c72',
        marginBottom: '0.5rem',
    },
    complaintDescription: {
        color: '#666',
        lineHeight: 1.6,
        marginBottom: '1rem',
    },
    complaintFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #f0f0f0',
    },
    complaintDate: {
        color: '#999',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    complaintIcon: {
        fontSize: '0.9rem',
    },
    complaintDetails: {
        color: '#ff8c42',
        textDecoration: 'none',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
    },
    loadingContainer: {
        textAlign: 'center',
        padding: '4rem',
        background: 'white',
        borderRadius: '20px',
    },
    loadingSpinner: {
        width: '50px',
        height: '50px',
        border: '3px solid #f0f0f0',
        borderTop: '3px solid #ff8c42',
        borderRadius: '50%',
        margin: '0 auto 1rem',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        color: '#666',
        fontSize: '1.1rem',
    },

    // Footer (100% your style)
    footer: {
        background: '#1e3c72',
        color: 'white',
        padding: '2rem',
        marginTop: 'auto',
    },
    footerContent: {
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerText: {
        margin: 0,
    },
    footerLinks: {
        display: 'flex',
        gap: '2rem',
    },
    footerLink: {
        color: 'white',
        textDecoration: 'none',
        opacity: 0.8,
        transition: 'opacity 0.3s',
    }
};

export default Home;
