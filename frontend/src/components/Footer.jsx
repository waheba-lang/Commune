import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: 'white', borderTop: '1px solid #e5e7eb', padding: '3rem 0', marginTop: '4rem' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} Plateforme des Réclamations Citoyennes. Tous droits réservés.
                </p>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', color: '#9ca3af', fontSize: '0.75rem' }}>
                    <a href="#">Confidentialité</a>
                    <a href="#">Conditions d'utilisation</a>
                    <a href="#">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
