import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ComplaintsList from './pages/ComplaintsList';
import ComplaintDetails from './pages/ComplaintDetails';
import AddComplaint from './pages/AddComplaint';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Chargement...</div>;
    
    if (!user) return <Navigate to="/login" />;
    
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar />
                    <main style={{ flex: '1' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/complaints" element={<ComplaintsList />} />
                            <Route path="/complaints/:id" element={<ComplaintDetails />} />
                            
                            <Route path="/add-complaint" element={
                                <ProtectedRoute>
                                    <AddComplaint />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="/admin" element={
                                <ProtectedRoute adminOnly={true}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
