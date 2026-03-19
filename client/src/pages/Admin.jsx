import React, { useState, useMemo, useEffect } from 'react';
import { FiUsers, FiShoppingBag, FiGift, FiLogOut, FiDownload, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

// Utility for Exporting
const exportToCSV = (data, filename) => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
        Object.values(row).map(v => typeof v === 'string' ? `"${v.replace(/"/g, '""')}"` : v).join(',')
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Mock Data
const MOCK_ORDERS = [
    { id: 'ORD-1001', customer: 'Jane Doe', items: 'Ethereal Diamond Ring', total: 1250, status: 'Completed', date: '2026-03-15' },
    { id: 'ORD-1002', customer: 'John Smith', items: 'Golden Sun Necklace (x2)', total: 1780, status: 'Pending', date: '2026-03-18' },
    { id: 'ORD-1003', customer: 'Emily Chen', items: 'Pearl Drop Earrings', total: 450, status: 'Shipped', date: '2026-03-10' },
];

const MOCK_HAMPERS = [
    { name: 'Anniversary Special', items: 'Signature Black Box, Diamond Ring', creator: 'Jane Doe', date: '2026-03-12', status: 'Active' },
    { name: 'For Mom', items: 'Velvet Rose Box, Golden Sun Necklace', creator: 'Emily Chen', date: '2026-03-14', status: 'Draft' },
];

const MOCK_CUSTOMERS = [
    { name: 'Jane Doe', email: 'jane@example.com', registered: '2025-11-20', lastLogin: '2026-03-19' },
    { name: 'John Smith', email: 'john@example.com', registered: '2026-01-05', lastLogin: '2026-03-18' },
    { name: 'Emily Chen', email: 'emily@example.com', registered: '2025-06-12', lastLogin: '2026-03-15' },
    { name: 'Admin User', email: 'admin@aura.com', registered: '2025-01-01', lastLogin: '2026-03-19' },
];

const Admin = () => {
    const { token, handleAuthError } = useAuth();
    const [activeTab, setActiveTab] = useState('orders');

    const [realCustomers, setRealCustomers] = useState([]);

    useEffect(() => {
        if (activeTab === 'customers' && token) {
            fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) throw res;
                    throw new Error('Failed to fetch');
                }
                return res.json();
            })
            .then(data => {
                const formatted = data.map(u => ({
                    name: u.name,
                    email: u.email,
                    registered: new Date(u.createdAt).toLocaleDateString(),
                    lastLogin: 'Session Verified'
                }));
                setRealCustomers(formatted);
            })
            .catch(err => {
                console.error(err);
                handleAuthError(err);
            });
        }
    }, [activeTab, token, handleAuthError]);

    // Order Filters State
    const [orderSearch, setOrderSearch] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    
    // Filtered Orders
    const filteredOrders = useMemo(() => {
        return MOCK_ORDERS.filter(order => {
            const matchesSearch = order.customer.toLowerCase().includes(orderSearch.toLowerCase()) || order.id.toLowerCase().includes(orderSearch.toLowerCase());
            const matchesStatus = orderStatus ? order.status === orderStatus : true;
            return matchesSearch && matchesStatus;
        });
    }, [orderSearch, orderStatus]);

    return (
        <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white shadow-sm flex flex-col flex-shrink-0 min-h-screen">
                <div className="p-6 border-b border-neutral-100">
                    <h2 className="text-2xl font-serif font-bold text-charcoal tracking-tight">Admin Console</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                        <FiShoppingBag className="w-4 h-4" /> All Orders
                    </button>
                    <button onClick={() => setActiveTab('hampers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'hampers' ? 'bg-black text-white' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                        <FiGift className="w-4 h-4" /> Gift Hampers
                    </button>
                    <button onClick={() => setActiveTab('customers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'customers' ? 'bg-black text-white' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                        <FiUsers className="w-4 h-4" /> Customers
                    </button>
                </nav>
                <div className="p-4 border-t border-neutral-100">
                    <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-neutral-600 hover:bg-neutral-50">
                        <FiLogOut className="w-4 h-4" /> Exit Console
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    
                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-sm shadow-sm p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <h1 className="text-2xl font-serif font-bold">Customer Orders</h1>
                                <Button onClick={() => exportToCSV(filteredOrders, 'aura_orders_report.csv')} className="flex items-center gap-2" size="sm">
                                    <FiDownload /> Export Report
                                </Button>
                            </div>
                            
                            {/* Filters */}
                            <div className="flex flex-col md:flex-row gap-4 mb-6 bg-neutral-50 p-4 rounded-sm border border-neutral-200">
                                <div className="flex-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiSearch className="text-neutral-400" />
                                    </div>
                                    <input 
                                        type="text"
                                        className="w-full border border-neutral-200 rounded-sm pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal bg-white"
                                        placeholder="Search by Order ID or Customer..." 
                                        value={orderSearch} 
                                        onChange={(e) => setOrderSearch(e.target.value)} 
                                    />
                                </div>
                                <div className="w-full md:w-48">
                                    <select 
                                        className="w-full border border-neutral-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal bg-white"
                                        value={orderStatus} 
                                        onChange={(e) => setOrderStatus(e.target.value)}
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Shipped">Shipped</option>
                                    </select>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-neutral-50 text-xs tracking-wider uppercase font-semibold text-neutral-600 border-y border-neutral-200">
                                            <th className="p-4">Order ID</th>
                                            <th className="p-4">Customer</th>
                                            <th className="p-4">Items</th>
                                            <th className="p-4">Total</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {filteredOrders.length === 0 ? (
                                            <tr><td colSpan="6" className="p-8 text-center text-neutral-500">No matching orders found.</td></tr>
                                        ) : (
                                            filteredOrders.map(order => (
                                                <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                                                    <td className="p-4 font-medium text-charcoal">{order.id}</td>
                                                    <td className="p-4">{order.customer}</td>
                                                    <td className="p-4 truncate max-w-[200px] text-neutral-600">{order.items}</td>
                                                    <td className="p-4 font-bold">₹{order.total.toLocaleString()}</td>
                                                    <td className="p-4">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                            order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-neutral-500 text-right">{order.date}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'hampers' && (
                        <div className="bg-white rounded-sm shadow-sm p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <div>
                                    <h1 className="text-2xl font-serif font-bold">Gift Hampers</h1>
                                    <p className="text-neutral-500 text-sm mt-1">Hampers curated by customers</p>
                                </div>
                                <Button onClick={() => exportToCSV(MOCK_HAMPERS, 'aura_hampers_report.csv')} className="flex items-center gap-2" size="sm">
                                    <FiDownload /> Export Report
                                </Button>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-neutral-50 text-xs tracking-wider uppercase font-semibold text-neutral-600 border-y border-neutral-200">
                                            <th className="p-4">Hamper Name</th>
                                            <th className="p-4">Items Included</th>
                                            <th className="p-4">Created By</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {MOCK_HAMPERS.map((hamper, i) => (
                                            <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                                                <td className="p-4 font-medium text-charcoal">{hamper.name}</td>
                                                <td className="p-4 truncate max-w-[250px] text-neutral-600">{hamper.items}</td>
                                                <td className="p-4">{hamper.creator}</td>
                                                <td className="p-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${hamper.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-700'}`}>
                                                        {hamper.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-neutral-500 text-right">{hamper.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'customers' && (
                        <div className="bg-white rounded-sm shadow-sm p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <div>
                                    <h1 className="text-2xl font-serif font-bold">Registered Customers</h1>
                                    <p className="text-neutral-500 text-sm mt-1">Users currently registered on the platform</p>
                                </div>
                                <Button onClick={() => exportToCSV(realCustomers, 'aura_customers_report.csv')} className="flex items-center gap-2" size="sm">
                                    <FiDownload /> Export Report
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-neutral-50 text-xs tracking-wider uppercase font-semibold text-neutral-600 border-y border-neutral-200">
                                            <th className="p-4">Customer</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Registered On</th>
                                            <th className="p-4 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {realCustomers.length === 0 ? (
                                            <tr><td colSpan="4" className="p-8 text-center text-neutral-500">Loading customers...</td></tr>
                                        ) : (
                                            realCustomers.map((customer, i) => (
                                                <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                                                    <td className="p-4 font-medium flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                                                            {customer.name.charAt(0)}
                                                        </div>
                                                        <span className="text-charcoal">{customer.name}</span>
                                                    </td>
                                                    <td className="p-4 text-neutral-600">{customer.email}</td>
                                                    <td className="p-4 text-neutral-500">{customer.registered}</td>
                                                    <td className="p-4 text-neutral-500 text-right">{customer.lastLogin}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Admin;
