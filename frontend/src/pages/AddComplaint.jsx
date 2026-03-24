import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Camera, MapPin, Tag, Type, AlignLeft, Send } from 'lucide-react';

const AddComplaint = () => {
    const [formData, setFormData] = useState({
        title: '',
        city: '',
        address: '',
        category: 'roads',
        description: '',
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const categories = [
        { id: 'roads', label: 'Routes' },
        { id: 'electricity', label: 'Électricité' },
        { id: 'water', label: 'Eau' },
        { id: 'administration', label: 'Administration' },
        { id: 'other', label: 'Autre' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            await api.post('/complaints', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/dashboard');
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else if (err.response?.status === 401) {
                setError('Session expirée. Veuillez vous reconnecter.');
            } else {
                setError('Échec de l\'envoi de la réclamation. Veuillez vérifier les champs.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
    const inputStyle = { width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', outline: 'none' };
    const iconStyle = { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' };

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e3c72' }}>Déposer une réclamation</h1>
                <p style={{ color: '#ff8c42', marginBottom: '2.5rem' }}>Fournissez les détails du problème pour une intervention rapide.</p>

                {error && (
                    <div style={{ background: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                        {error}
                    </div>
                )}

                <div className="card" style={{ padding: '2.5rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {/* Title - Full Width */}
                        <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Titre de la réclamation</label>
                            <div style={{ position: 'relative' }}>
                                <Type size={18} style={iconStyle} />
                                <input name="title" value={formData.title} onChange={handleChange} required placeholder="Ex: Lampadaire défectueux" style={inputStyle} />
                            </div>
                            {errors.title && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.title[0]}</span>}
                        </div>

                        {/* City */}
                        <div style={inputGroupStyle}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Ville</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={iconStyle} />
                                <input name="city" value={formData.city} onChange={handleChange} required placeholder="Oujda" style={inputStyle} />
                            </div>
                            {errors.city && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.city[0]}</span>}
                        </div>

                        {/* Category */}
                        <div style={inputGroupStyle}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Catégorie</label>
                            <div style={{ position: 'relative' }}>
                                <Tag size={18} style={iconStyle} />
                                <select name="category" value={formData.category} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' }}>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Address - Full Width */}
                        <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Adresse exacte</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={iconStyle} />
                                <input name="address" value={formData.address} onChange={handleChange} required placeholder="Rue 15, Quartier Qods" style={inputStyle} />
                            </div>
                            {errors.address && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.address[0]}</span>}
                        </div>

                        {/* Description - Full Width */}
                        <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Description détaillée</label>
                            <div style={{ position: 'relative' }}>
                                <AlignLeft size={18} style={{ ...iconStyle, top: '1.2rem' }} />
                                <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Décrivez le problème en détail..." style={{ ...inputStyle, height: '120px', paddingLeft: '2.5rem', resize: 'none', paddingTop: '0.75rem' }} />
                            </div>
                            {errors.description && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.description[0]}</span>}
                        </div>

                        {/* Image Upload - Full Width */}
                        <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Photo (Optionnel)</label>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', border: '2px dashed var(--border)', borderRadius: '0.5rem', cursor: 'pointer', flex: 1 }}>
                                    <Camera size={20} color="var(--text-muted)" />
                                    <span style={{ color: 'var(--text-muted)' }}>{image ? image.name : 'Choisir une image'}</span>
                                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                </label>
                                {preview && (
                                    <img src={preview} alt="Preview" style={{ width: '80px', height: '60px', borderRadius: '0.25rem', objectFit: 'cover' }} />
                                )}
                                {errors.image && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.image[0]}</span>}
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary" style={{ gridColumn: 'span 2', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem', marginTop: '1rem', backgroundColor: '#1e3c72' }}>
                            <Send size={20} />
                            {loading ? 'Envoi en cours...' : 'Envoyer la réclamation'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddComplaint;
