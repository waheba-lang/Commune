import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, FileText, CheckCircle, Clock, AlertCircle, Trash2, Shield, Filter, Settings, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('overview');
    const [complaints, setComplaints] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('All');
    
    // Stats for overview
    const [stats, setStats] = useState({
        users_total: 0,
        users_admins: 0,
        complaints_total: 0,
        complaints_pending: 0,
        complaints_progress: 0,
        complaints_resolved: 0
    });

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchData();
        }
    }, [user, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'overview') {
                const res = await api.get('/admin/stats');
                setStats(res.data);
            } else if (activeTab === 'complaints') {
                const res = await api.get('/complaints');
                setComplaints(res.data.data || res.data);
            } else if (activeTab === 'users') {
                const res = await api.get('/admin/users');
                setUsersList(res.data.data || res.data);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    // --- Complaint Actions ---
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            // Corrected API endpoint to match update route
            await api.put(`/complaints/${id}`, { status: newStatus });
            setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        } catch (error) {
            console.error('Status update failed', error);
            alert(t('status_update_error', 'Échec de la mise à jour du statut'));
        }
    };

    const handleDeleteComplaint = async (id) => {
        if (!window.confirm(t('confirm_delete_complaint', 'Êtes-vous sûr de vouloir supprimer cette réclamation ?'))) return;
        try {
            await api.delete(`/complaints/${id}`);
            setComplaints(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            alert(t('delete_error', 'Échec de la suppression'));
        }
    };

    // --- User Actions ---
    const handleRoleUpdate = async (id, newRole) => {
        try {
            await api.put(`/admin/users/${id}`, { role: newRole });
            setUsersList(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
        } catch (error) {
            alert(t('role_update_error', 'Échec de la mise à jour du rôle'));
        }
    };

    const handleDeleteUser = async (id) => {
        if (id === user.id) {
            alert(t('cannot_delete_self', 'Vous ne pouvez pas vous supprimer vous-même.'));
            return;
        }
        if (!window.confirm(t('confirm_delete_user', 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?'))) return;
        try {
            await api.delete(`/admin/users/${id}`);
            setUsersList(prev => prev.filter(u => u.id !== id));
        } catch (error) {
            alert(t('delete_error', 'Échec de la suppression'));
        }
    };

    const filteredComplaints = filterStatus === 'All'
        ? complaints
        : complaints.filter(c => c.status === filterStatus);

    if (user?.role !== 'admin') {
        return (
            <div className="container" style={{ padding: '5rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <ShieldAlert size={64} color="#dc2626" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{t('access_denied', 'Accès Refusé')}</h2>
                <p style={{ color: '#6b7280' }}>{t('no_permission', "Vous n'avez pas les permissions nécessaires pour accéder à cette page.")}</p>
            </div>
        );
    }

    const tabStyle = (isActive) => ({
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'pointer',
        borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
        background: isActive ? '#f3f4f6' : 'transparent',
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? 'var(--primary)' : '#4b5563',
        transition: 'all 0.2s ease',
    });

    return (
        <div className="admin-dashboard" style={{ display: 'flex', minHeight: 'calc(100vh - 64px)', background: '#f9fafb' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: 'white', borderRight: '1px solid var(--border)', padding: '2rem 0' }}>
                <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Shield size={24} color="var(--primary)" />
                        {t('admin_panel', 'Admin Panel')}
                    </h2>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={tabStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>
                        <LayoutDashboard size={20} /> {t('admin_overview', "Vue d'ensemble")}
                    </div>
                    <div style={tabStyle(activeTab === 'complaints')} onClick={() => setActiveTab('complaints')}>
                        <FileText size={20} /> {t('admin_complaints', 'Réclamations')}
                    </div>
                    <div style={tabStyle(activeTab === 'users')} onClick={() => setActiveTab('users')}>
                        <Users size={20} /> {t('admin_users', 'Utilisateurs')}
                    </div>
                    <div style={tabStyle(activeTab === 'settings')} onClick={() => setActiveTab('settings')}>
                        <Settings size={20} /> {t('admin_settings', 'Paramètres')}
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
                {activeTab === 'overview' && (
                    <div className="fade-in">
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>{t('admin_overview', "Vue d'ensemble")}</h1>
                        {loading ? <p>{t('loading_stats', 'Chargement des statistiques...')}</p> : (
                            <>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>{t('admin_complaints', 'Réclamations')}</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.75rem' }}><FileText size={28} /></div>
                                        <div><h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stats.complaints_total}</h3><p style={{ color: '#6b7280' }}>{t('all', 'Total')}</p></div>
                                    </div>
                                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ background: 'var(--status-pending)', color: 'var(--status-pending-text)', padding: '1rem', borderRadius: '0.75rem' }}><Clock size={28} /></div>
                                        <div><h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stats.complaints_pending}</h3><p style={{ color: '#6b7280' }}>{t('status_pending', 'En attente')}</p></div>
                                    </div>
                                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ background: 'var(--status-progress)', color: 'var(--status-progress-text)', padding: '1rem', borderRadius: '0.75rem' }}><AlertCircle size={28} /></div>
                                        <div><h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stats.complaints_progress}</h3><p style={{ color: '#6b7280' }}>{t('status_in_progress', 'En cours')}</p></div>
                                    </div>
                                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ background: 'var(--status-resolved)', color: 'var(--status-resolved-text)', padding: '1rem', borderRadius: '0.75rem' }}><CheckCircle size={28} /></div>
                                        <div><h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stats.complaints_resolved}</h3><p style={{ color: '#6b7280' }}>{t('status_resolved', 'Résolues')}</p></div>
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>{t('admin_users', 'Utilisateurs')}</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ background: '#e0e7ff', color: '#4338ca', padding: '1rem', borderRadius: '0.75rem' }}><Users size={28} /></div>
                                        <div><h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stats.users_total}</h3><p style={{ color: '#6b7280' }}>{t('registered_users', 'Total Inscrits')}</p></div>
                                    </div>
                                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ background: '#fce7f3', color: '#be185d', padding: '1rem', borderRadius: '0.75rem' }}><Shield size={28} /></div>
                                        <div><h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stats.users_admins}</h3><p style={{ color: '#6b7280' }}>{t('administrators', 'Administrateurs')}</p></div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {activeTab === 'complaints' && (
                    <div className="fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{t('manage_complaints', 'Gestion des Réclamations')}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Filter size={18} /> {t('filter_by', 'Filtrer :')}
                                </span>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', outline: 'none' }}
                                >
                                    <option value="All">{t('all', 'Tous')}</option>
                                    <option value="Pending">{t('status_pending', 'En attente')}</option>
                                    <option value="In Progress">{t('status_in_progress', 'En cours')}</option>
                                    <option value="Resolved">{t('status_resolved', 'Résolues')}</option>
                                </select>
                            </div>
                        </div>

                        <div className="card" style={{ overflowX: 'auto', background: 'white' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ background: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                                    <tr>
                                        <th style={{ padding: '1rem 1.5rem', color: '#4b5563', fontWeight: '600' }}>{t('complaint_label', 'Réclamation')}</th>
                                        <th style={{ padding: '1rem 1.5rem', color: '#4b5563', fontWeight: '600' }}>{t('citizen_label', 'Citoyen')}</th>
                                        <th style={{ padding: '1rem 1.5rem', color: '#4b5563', fontWeight: '600' }}>{t('category_label', 'Catégorie')}</th>
                                        <th style={{ padding: '1rem 1.5rem', color: '#4b5563', fontWeight: '600' }}>{t('status_label', 'Statut')}</th>
                                        <th style={{ padding: '1rem 1.5rem', color: '#4b5563', fontWeight: '600' }}>{t('actions_label', 'Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>{t('loading_generic', 'Chargement...')}</td></tr>
                                    ) : filteredComplaints.length === 0 ? (
                                        <tr><td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>{t('no_complaints_found', 'Aucune réclamation trouvée.')}</td></tr>
                                    ) : filteredComplaints.map(c => (
                                        <tr key={c.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <div style={{ fontWeight: '600', color: '#111827' }}>{c.title}</div>
                                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>{c.city} • {new Date(c.created_at).toLocaleDateString()}</div>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <div style={{ fontWeight: '500' }}>{c.user?.first_name} {c.user?.last_name}</div>
                                                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{c.user?.email}</div>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <span style={{ background: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500' }}>
                                                    {c.category}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <select
                                                    value={c.status}
                                                    onChange={(e) => handleStatusUpdate(c.id, e.target.value)}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.875rem',
                                                        border: '1px solid transparent',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        background: c.status === 'Pending' ? 'var(--status-pending)' : (c.status === 'In Progress' ? 'var(--status-progress)' : 'var(--status-resolved)'),
                                                        color: c.status === 'Pending' ? 'var(--status-pending-text)' : (c.status === 'In Progress' ? 'var(--status-progress-text)' : 'var(--status-resolved-text)')
                                                    }}
                                                >
                                                    <option value="Pending">{t('status_pending', 'En attente')}</option>
                                                    <option value="In Progress">{t('status_in_progress', 'En cours')}</option>
                                                    <option value="Resolved">{t('status_resolved', 'Résolue')}</option>
                                                </select>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <div style={{ display: 'flex', gap: '1rem' }}>
                                                    <button onClick={() => handleDeleteComplaint(c.id)} style={{ color: '#ef4444', background: '#fee2e2', padding: '0.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }} title={t('delete_label', 'Supprimer')}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="fade-in">
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>{t('manage_users', 'Gestion des Utilisateurs')}</h1>
                        <div className="card" style={{ overflowX: 'auto', background: 'white' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ background: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                                    <tr>
                                        <th style={{ padding: '1rem 1.5rem', color: '#4b5563', fontWeight: '600' }}>{t('user_label', 'Utilisateur')}</th>
                                        <th style={{ padding: '1rem 1.5rem', color: '#4b5563', fontWeight: '600' }}>{t('email_phone_label', 'Email & Tél')}</th>
                                        <th style={{ padding: '1rem 1.5rem', color: '#4b5563', fontWeight: '600' }}>{t('role_label', 'Rôle')}</th>
                                        <th style={{ padding: '1rem 1.5rem', color: '#4b5563', fontWeight: '600' }}>{t('actions_label', 'Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>{t('loading_generic', 'Chargement...')}</td></tr>
                                    ) : usersList.length === 0 ? (
                                        <tr><td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>{t('no_users_found', 'Aucun utilisateur trouvé.')}</td></tr>
                                    ) : usersList.map(u => (
                                        <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <div style={{ fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #4338ca)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                        {u.first_name?.[0]}{u.last_name?.[0]}
                                                    </div>
                                                    <div>
                                                        <div>{u.first_name} {u.last_name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 'normal' }}>ID: {u.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <div style={{ fontWeight: '500' }}>{u.email}</div>
                                                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{u.phone || t('not_specified', 'Non renseigné')}</div>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleRoleUpdate(u.id, e.target.value)}
                                                    disabled={u.id === user.id}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.875rem',
                                                        border: '1px solid transparent',
                                                        fontWeight: '600',
                                                        cursor: u.id === user.id ? 'not-allowed' : 'pointer',
                                                        background: u.role === 'admin' ? '#fce7f3' : '#e0e7ff',
                                                        color: u.role === 'admin' ? '#be185d' : '#4338ca',
                                                        opacity: u.id === user.id ? 0.7 : 1
                                                    }}
                                                >
                                                    <option value="user">{t('user_role', 'Utilisateur')}</option>
                                                    <option value="admin">{t('admin_role', 'Administrateur')}</option>
                                                </select>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <button onClick={() => handleDeleteUser(u.id)} disabled={u.id === user.id} style={{ color: '#ef4444', background: '#fee2e2', padding: '0.5rem', borderRadius: '0.375rem', border: 'none', cursor: u.id === user.id ? 'not-allowed' : 'pointer', opacity: u.id === user.id ? 0.5 : 1, display: 'flex', alignItems: 'center' }}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="fade-in">
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>{t('platform_settings', 'Paramètres de la Plateforme')}</h1>
                        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                            <Settings size={48} style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>{t('settings_coming_soon', 'Paramètres à venir')}</h3>
                            <p>{t('settings_desc', 'Les paramètres globaux seront disponibles prochainement.')}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
