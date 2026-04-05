import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { LogOut, User, LayoutDashboard, PlusCircle, Home as HomeIcon, Map as MapIcon, BarChart3, List as ListIcon, ShieldAlert } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-content">
                    <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
                        <img src="/logo-oujda.jpg" alt="Commune d'Oujda" style={{ height: '70px', width: 'auto', borderRadius: '6px', background: 'white', padding: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                        <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1e3c72', marginLeft: '10px' }}>Recla<span style={{ color: '#ff8c42' }}>Plus</span></span>
                    </Link>

                    <div className="nav-links">
                        <Link to="/" className="nav-item">
                            <HomeIcon size={18} />
                            <span>{t('home')}</span>
                        </Link>
                        <Link to="/carte" className="nav-item">
                            <MapIcon size={18} />
                            <span>{t('map')}</span>
                        </Link>
                        <Link to="/statistiques" className="nav-item">
                            <BarChart3 size={18} />
                            <span>{t('statistics')}</span>
                        </Link>
                        <Link to="/complaints" className="nav-item">
                            <span>{t('complaints')}</span>
                        </Link>

                        {user ? (
                            <div className="nav-auth">
                                <Link to="/mes-reclamations" className="nav-item">
                                    <ListIcon size={18} />
                                    <span>{t('my_complaints')}</span>
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="nav-item" style={{ color: '#be185d' }}>
                                        <ShieldAlert size={18} />
                                        <span>{t('admin_panel', 'Admin Panel')}</span>
                                    </Link>
                                )}
                                <Link to="/add-complaint" className="btn btn-primary">
                                    {/* <PlusCircle size={18} /> */}
                                    <span>{t('submit_complaint')}</span>
                                </Link>
                                <Link to="/profile" className="user-profile-nav" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                                    <User size={18} />
                                    <span>{user.first_name}</span>
                                </Link>
                                <button onClick={handleLogout} className="btn-logout">
                                    <LogOut size={18} />
                                    <span>{t('logout', { defaultValue: 'Quitter' })}</span>
                                </button>
                            </div>
                        ) : (
                            <div className="nav-auth">
                                <Link to="/login" className="nav-link">{t('login')}</Link>
                                <Link to="/register" className="btn btn-primary">{t('register')}</Link>
                            </div>
                        )}

                        <div className="lang-switcher">
                            <button onClick={() => changeLanguage('fr')} className={i18n.language === 'fr' ? 'active' : ''}>FR</button>
                            <button onClick={() => changeLanguage('ar')} className={i18n.language === 'ar' ? 'active' : ''}>AR</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
