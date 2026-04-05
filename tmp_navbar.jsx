import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, LogOut, PlusCircle, User, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="navbar" style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '0.5rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={28} />
                    <span style={{
                        color: '#1e3c72', fontSize: '2rem', fontWeight: 700,
                    }}>Recla<span style={{
                        color: '#ff8c42', fontSize: '2rem', fontWeight: 700,
                    }}>Plus</span></span>


                </Link>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '500', color: '#1e3c72' }}>Accueil</Link>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: '#1e3c72' }}>
                    <Link to="/complaints" style={{ fontWeight: '500' }}>Toutes les r├®clamations</Link>

                    {user ? (
                        <>
                            <Link to="/add-complaint" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '500', color: '#1e3c72' }}>
                                <PlusCircle size={20} />
                                <span>R├®clamer</span>
                            </Link>

                            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '500' }}>
                                <LayoutDashboard size={20} />
                                <span>Mon Profil</span>
                            </Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" style={{ fontWeight: '600', color: '#dc2626' }}>Admin</Link>
                            )}
                            <Link to="/Footer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '500' }}>Contact</Link>

                            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', color: '#4b5563', fontWeight: '500' }}>
                                <LogOut size={20} />
                                <span>D├®connexion</span>
                            </button>

                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline" style={{
                                background: 'transparent',
                                border: '2px solid #1e3c72',
                                color: '#1e3c72',
                                borderRadius: '50px',

                            }}>Se connecter</Link>
                            <Link to="/register" className="btn btn-primary" style={{
                                background: '#ff8c42',
                                color: 'white',
                                border: '2px solid #ff8c42',
                                borderRadius: '50px',
                            }}>S'inscrire</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
