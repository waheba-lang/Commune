import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Phone, MapPin, Lock, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { user, setUser } = useAuth();
    const { showToast } = useToast();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        phone: user?.phone || '',
        address: user?.address || '',
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        setErrors({});

        try {
            const response = await api.put('/update-profile', formData);
            const updatedUser = response.data.data || response.data;
            setUser(updatedUser);
            showToast(t('profile_update_success', 'Profil mis à jour avec succès !'), 'success');
            setFormData(prev => ({ ...prev, password: '', password_confirmation: '' }));
        } catch (err) {
            console.error('Profile update error:', err.response?.data);
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                showToast(t('profile_update_error', 'Une erreur est survenue lors de la mise à jour.'), 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
    const inputStyle = { width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', outline: 'none' };
    const iconStyle = { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' };

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e3c72' }}>{t('edit_profile_title', 'Modifier mon profil')}</h1>
                <p style={{ color: '#ff8c42', marginBottom: '2.5rem' }}>{t('edit_profile_desc', 'Gérez vos informations personnelles et votre mot de passe.')}</p>

                {message.text && (
                    <div style={{ 
                        background: message.type === 'success' ? '#dcfce7' : '#fef2f2', 
                        color: message.type === 'success' ? '#166534' : '#dc2626', 
                        padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', 
                        display: 'flex', alignItems: 'center', gap: '0.75rem' 
                    }}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span>{message.text}</span>
                    </div>
                )}

                <div className="card" style={{ padding: '2.5rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={inputGroupStyle}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>{t('first_name', 'Prénom')}</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={iconStyle} />
                                <input name="first_name" value={formData.first_name} onChange={handleChange} required style={inputStyle} />
                            </div>
                            {errors.first_name && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.first_name[0]}</span>}
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>{t('last_name', 'Nom')}</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={iconStyle} />
                                <input name="last_name" value={formData.last_name} onChange={handleChange} required style={inputStyle} />
                            </div>
                            {errors.last_name && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.last_name[0]}</span>}
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>{t('phone', 'Téléphone')}</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={iconStyle} />
                                <input name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} />
                            </div>
                            {errors.phone && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.phone[0]}</span>}
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>{t('cin_readonly', 'CIN (Non modifiable)')}</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={iconStyle} />
                                <input value={user.cin} disabled style={{ ...inputStyle, background: '#f3f4f6', cursor: 'not-allowed' }} />
                            </div>
                        </div>

                        <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>{t('address_label', 'Adresse')}</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={iconStyle} />
                                <input name="address" value={formData.address} onChange={handleChange} style={inputStyle} />
                            </div>
                            {errors.address && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.address[0]}</span>}
                        </div>

                        <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>{t('change_password_title', 'Changer le mot de passe (Laisser vide pour ne pas modifier)')}</h3>
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>{t('new_password', 'Nouveau mot de passe')}</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={iconStyle} />
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" style={inputStyle} />
                            </div>
                            {errors.password && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.password[0]}</span>}
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>{t('confirm_password', 'Confirmer le mot de passe')}</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={iconStyle} />
                                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="••••••••" style={inputStyle} />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary" style={{ gridColumn: 'span 2', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', background: '#1e3c72' }}>
                            <Save size={20} />
                            {loading ? t('saving', 'Enregistrement...') : t('save_changes', 'Enregistrer les modifications')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
