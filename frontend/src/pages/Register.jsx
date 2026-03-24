import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, CreditCard, MapPin, AlertCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        cin: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: 'Une erreur est survenue lors de l\'inscription' });
            }
        } finally {
            setLoading(false);
        }
    };

    const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
    const inputStyle = { width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', outline: 'none' };
    const iconStyle = { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0' }}>
            <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e3c72' }}>Créer un compte</h2>
                    <p style={{ color: '#ff8c42', marginTop: '0.5rem' }}>Rejoignez notre communauté citoyenne</p>
                </div>

                {errors.general && (
                    <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div style={inputGroupStyle}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Prénom</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={iconStyle} />
                            <input name="first_name" value={formData.first_name} onChange={handleChange} required placeholder="votre prénom" style={inputStyle} />
                        </div>
                        {errors.first_name && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.first_name[0]}</span>}
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Nom</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={iconStyle} />
                            <input name="last_name" value={formData.last_name} onChange={handleChange} required placeholder="votre nom" style={inputStyle} />
                        </div>
                        {errors.last_name && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.last_name[0]}</span>}
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>CIN</label>
                        <div style={{ position: 'relative' }}>
                            <CreditCard size={18} style={iconStyle} />
                            <input name="cin" value={formData.cin} onChange={handleChange} required placeholder="AB123456" style={inputStyle} />
                        </div>
                        {errors.cin && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.cin[0]}</span>}
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Téléphone</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={iconStyle} />
                            <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="0600000000" style={inputStyle} />
                        </div>
                        {errors.phone && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.phone[0]}</span>}
                    </div>

                    <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={iconStyle} />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="votre email" style={inputStyle} />
                        </div>
                        {errors.email && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.email[0]}</span>}
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Mot de passe</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={iconStyle} />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" style={inputStyle} />
                        </div>
                        {errors.password && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.password[0]}</span>}
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Confirmer</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={iconStyle} />
                            <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required placeholder="••••••••" style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Adresse</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ ...iconStyle, top: '1.2rem' }} />
                            <textarea name="address" value={formData.address} onChange={handleChange} required placeholder="123 Rue de  Nakhile, Oujda" style={{ ...inputStyle, height: '80px', paddingLeft: '2.5rem', resize: 'none' }} />
                        </div>
                        {errors.address && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.address[0]}</span>}
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ gridColumn: 'span 2', padding: '0.75rem', marginTop: '1rem', background: '#1e3c72' }}>
                        {loading ? 'Création en cours...' : 'S\'inscrire'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#1e3c72' }}>
                    Déjà un compte ? <Link to="/login" style={{ color: '#ff8c42', fontWeight: '600' }}>Se connecter</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
