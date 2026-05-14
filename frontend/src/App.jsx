import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetails from "./pages/InvoiceDetails";
import CreateInvoice from "./pages/CreateInvoice";
import EditInvoice from "./pages/EditInvoice";
import GSTCalculator from "./pages/GSTCalculator";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

// Help Center Imports
import HelpCenter from "./pages/HelpCenter";
import InvoiceManagementHelp from "./pages/help/InvoiceManagementHelp";
import GSTComplianceHelp from "./pages/help/GSTComplianceHelp";
import ReportsAnalyticsHelp from "./pages/help/ReportsAnalyticsHelp";
import AccountSettingsHelp from "./pages/help/AccountSettingsHelp";
import VideoTutorialsHelp from "./pages/help/VideoTutorialsHelp";
import DocumentationHelp from "./pages/help/DocumentationHelp";
import CommunityForumHelp from "./pages/help/CommunityForumHelp";
import CreateForumTopic from "./pages/help/CreateForumTopic";
import ForumTopicDetail from "./pages/help/ForumTopicDetail";

import { ThemeProvider } from "./context/ThemeContext";

// Layout component to responsibly show Navbar
const Layout = ({ children }) => {
    const location = useLocation();
    const publicPaths = ['/', '/login', '/register'];
    const showNavbar = !publicPaths.includes(location.pathname);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200 decorative-bg">
            {/* Animated gradient background overlay */}
            <div className="fixed inset-0 animated-gradient-subtle pointer-events-none z-0"></div>

            {/* Floating decorative shapes */}
            <div className="floating-shape bg-blue-500 w-64 h-64 top-10 -left-32 z-0" style={{ animationDelay: '0s' }}></div>
            <div className="floating-shape bg-purple-500 w-96 h-96 bottom-20 -right-48 z-0" style={{ animationDelay: '2s' }}></div>
            <div className="floating-shape-slow bg-cyan-400 w-48 h-48 top-1/3 right-10 z-0" style={{ animationDelay: '1s' }}></div>

            {showNavbar && <Navbar />}
            <div className={showNavbar ? "container mx-auto p-4 flex-grow relative z-10" : "flex-grow flex items-center justify-center bg-pattern-geometric relative z-10"}>
                {children}
            </div>
            {showNavbar && <Footer />}
        </div>
    );
};

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/invoices" element={<ProtectedRoute><InvoiceList /></ProtectedRoute>} />
                        <Route path="/invoices/create" element={<ProtectedRoute><CreateInvoice /></ProtectedRoute>} />
                        <Route path="/invoices/:id" element={<ProtectedRoute><InvoiceDetails /></ProtectedRoute>} />
                        <Route path="/invoices/:id/edit" element={<ProtectedRoute><EditInvoice /></ProtectedRoute>} />
                        <Route path="/gst-calculator" element={<ProtectedRoute><GSTCalculator /></ProtectedRoute>} />
                        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>} />

                        {/* Help Center Routes */}
                        <Route path="/help-center" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
                        <Route path="/help/invoices" element={<ProtectedRoute><InvoiceManagementHelp /></ProtectedRoute>} />
                        <Route path="/help/gst" element={<ProtectedRoute><GSTComplianceHelp /></ProtectedRoute>} />
                        <Route path="/help/reports" element={<ProtectedRoute><ReportsAnalyticsHelp /></ProtectedRoute>} />
                        <Route path="/help/account" element={<ProtectedRoute><AccountSettingsHelp /></ProtectedRoute>} />
                        <Route path="/help/tutorials" element={<ProtectedRoute><VideoTutorialsHelp /></ProtectedRoute>} />
                        <Route path="/help/documentation" element={<ProtectedRoute><DocumentationHelp /></ProtectedRoute>} />
                        <Route path="/help/forum" element={<ProtectedRoute><CommunityForumHelp /></ProtectedRoute>} />
                        <Route path="/help/forum/new" element={<ProtectedRoute><CreateForumTopic /></ProtectedRoute>} />
                        <Route path="/help/forum/:id" element={<ProtectedRoute><ForumTopicDetail /></ProtectedRoute>} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;
