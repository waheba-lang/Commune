import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { LogOut, User, LayoutDashboard, PlusCircle, Home as HomeIcon, BarChart3, List as ListIcon, ShieldAlert, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
        navigate('/login');
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-content">
                    <Link to="/" className="logo" onClick={closeMenu}>
                        <img src="/logo-oujda.jpg" alt="Commune d'Oujda" className="logo-img" />
                        <span className="logo-text">Recla<span className="logo-accent">Plus</span></span>
                    </Link>

                    <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>

                        <Link to="/statistiques" className="nav-item" onClick={closeMenu}>
                            <BarChart3 size={18} />
                            <span>{t('statistics')}</span>
                        </Link>
                        <Link to="/complaints" className="nav-item" onClick={closeMenu}>
                            <span>{t('complaints')}</span>
                        </Link>

                        {user ? (
                            <div className="nav-auth">
                                <Link to="/mes-reclamations" className="nav-item" onClick={closeMenu}>
                                    <ListIcon size={18} />
                                    <span>{t('my_complaints')}</span>
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="nav-item admin-link" onClick={closeMenu}>
                                        <ShieldAlert size={18} />
                                        <span>{t('admin_panel', 'Admin Panel')}</span>
                                    </Link>
                                )}
                                <Link to="/add-complaint" className="btn btn-primary nav-submit-btn" onClick={closeMenu}>
                                    {/* <PlusCircle size={18} /> */}
                                    <span>{t('submit_complaint')}</span>
                                </Link>
                                <Link to="/profile" className="user-profile-nav" onClick={closeMenu}>
                                    <User size={18} />
                                    <span>{user.first_name}</span>
                                </Link>
                                <button onClick={handleLogout} className="btn-logout">
                                    <LogOut size={18} />
                                    {/* <span>{t('logout', { defaultValue: 'Quitter' })}</span> */}
                                </button>
                            </div>
                        ) : (
                            <div className="nav-auth">
                                <Link to="/login" className="nav-link" onClick={closeMenu}>{t('login')}</Link>
                                <Link to="/register" className="btn btn-primary" onClick={closeMenu}>{t('register')}</Link>
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
