// import React from 'react';

// const Footer = () => {
//     return (
//         <footer style={{ background: 'white', borderTop: '1px solid #e5e7eb', padding: '3rem 0', marginTop: '4rem' }}>
//             <div className="container" style={{ textAlign: 'center' }}>
//                 <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
//                     &copy; {new Date().getFullYear()} Plateforme des Réclamations Citoyennes. Tous droits réservés.
//                 </p>
//                 <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', color: '#9ca3af', fontSize: '0.75rem' }}>
//                     <a href="#">Confidentialité</a>
//                     <a href="#">Conditions d'utilisation</a>
//                     <a href="#">Contact</a>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.8rem', margin: '0 0 1rem 0' }}>
              <img src="/logo-oujda.jpg" alt="Commune d'Oujda" style={{ height: '65px', borderRadius: '6px', background: 'white', padding: '4px' }} />
              <span style={{ color: '#a5beecff', }}>Recla<span style={{ color: '#ff8c42' }}>Plus</span></span>
            </h3>
            <p>
              {t('footer_description')}
            </p>
            <div className="social-icons">
              <a href="mailto:contact@reclaplus.ma" className="social-icon" aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-10 7L2 7"></path>
                </svg>
              </a>
              <a href="https://instagram.com/reclaplus" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com/reclaplus" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>{t('useful_links')}</h4>
            <ul>
              <li><Link to="/mentions-legales">{t('legal_notice')}</Link></li>
              <li><Link to="/confidentialite">{t('privacy_policy')}</Link></li>
              <li><Link to="/accessibilite">{t('accessibility')}</Link></li>
              <li><Link to="/complaints">{t('view_complaints')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('contact')}</h4>
            <p><strong>Email :</strong> contact@reclaplus.ma</p>
            <p>{t('follow_us_desc')}</p>
            <p className="stats">✅ {t('stats_resolved_count')}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ReclaPlus - Ville d'Oujda. {t('rights_reserved')}</p>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background-color: #1e3c72;
          color: #f0f0f0;
          padding: 2rem 1rem 1rem;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .footer-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          gap: 2rem;
        }

        .footer-section {
          flex: 1;
          min-width: 200px;
        }

        .footer-section h3,
        .footer-section h4 {
          margin-bottom: 1rem;
          color: #ff8c42;
        }

        .footer-section h3 {
          font-size: 1.5rem;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section li {
          margin-bottom: 0.75rem;
        }

        .footer-section a {
          color: #f0f0f0;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: #ffb347;
          text-decoration: underline;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background-color: #ffb347;
          transform: translateY(-3px);
        }

        .social-icon svg {
          width: 20px;
          height: 20px;
          stroke: white;
        }

        .stats {
          margin-top: 1rem;
          font-weight: bold;
          color: #ffb347;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #3a4a5a;
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            text-align: center;
          }

          .social-icons {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;