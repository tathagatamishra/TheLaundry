"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaTshirt, 
  FaUser, 
  FaSignOutAlt, 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt,
  FaTimes,
  FaClipboardList,
  FaUsers,
  FaTags,
  FaTag,
  FaChartBar,
  FaBell,
  FaEye,
  FaEdit,
  FaClock,
  FaShoppingBag,
  FaPhoneAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';

export default function Customers() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - replace with real data from your API
  const [orders] = useState([
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      phone: '+91 98765 43210',
      address: '123 Main St, Jaleshwar',
      items: ['Shirts - 3', 'Pants - 2'],
      source: 'walk-in',
      status: 'new',
      amount: 250,
      date: '2025-01-05',
      time: '10:30 AM'
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      phone: '+91 87654 32109',
      address: '456 Oak Ave, Jaleshwar',
      items: ['Bedsheet - 1', 'Curtains - 2'],
      source: 'phone',
      status: 'processing',
      amount: 180,
      date: '2025-01-05',
      time: '11:15 AM'
    },
    {
      id: 'ORD-003',
      customerName: 'Rajesh Kumar',
      phone: '+91 76543 21098',
      address: '789 Pine Rd, Jaleshwar',
      items: ['Saree - 2', 'Shirt - 1'],
      source: 'online',
      status: 'new',
      amount: 320,
      date: '2025-01-05',
      time: '12:00 PM'
    }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const getActiveFilters = () => {
    const filters = [];
    if (selectedSource !== 'all') filters.push({ type: 'source', value: selectedSource });
    if (selectedDateRange !== 'all') filters.push({ type: 'date', value: selectedDateRange });
    if (searchTerm) filters.push({ type: 'search', value: searchTerm });
    return filters;
  };

  const removeFilter = (filterType) => {
    if (filterType === 'source') setSelectedSource('all');
    if (filterType === 'date') setSelectedDateRange('all');
    if (filterType === 'search') setSearchTerm('');
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'all' || order.source === selectedSource;
    // Add date filtering logic here based on selectedDateRange
    return matchesSearch && matchesSource;
  });

  const newOrders = filteredOrders.filter(order => order.status === 'new');
  const processingOrders = filteredOrders.filter(order => order.status === 'processing');

  const getSourceIcon = (source) => {
    switch(source) {
      case 'walk-in': return '🚶';
      case 'phone': return '📞';
      case 'online': return '💻';
      default: return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Shop Name */}
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                <FaTshirt className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">The Laundry</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  activeTab === 'dashboard' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <FaClipboardList className="h-4 w-4 mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  activeTab === 'customers' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <FaUsers className="h-4 w-4 mr-2" />
                Customers
              </button>
              <button
                onClick={() => setActiveTab('prices')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  activeTab === 'prices' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <FaTags className="h-4 w-4 mr-2" />
                Prices
              </button>
              <button
                onClick={() => setActiveTab('coupons')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  activeTab === 'coupons' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <FaTag className="h-4 w-4 mr-2" />
                Coupons
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  activeTab === 'reports' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <FaChartBar className="h-4 w-4 mr-2" />
                Reports
              </button>
            </div>

            {/* Right Side - Notifications, Account, Logout */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition duration-200">
                <FaBell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  3
                </span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaUser className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition duration-200"
              >
                <FaSignOutAlt className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600 mt-1">Manage your laundry orders and business</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-200 shadow-md">
                <FaPlus className="h-4 w-4 mr-2" />
                Add New Order
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders by customer name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sources</option>
                <option value="walk-in">Walk-in</option>
                <option value="phone">Phone</option>
                <option value="online">Online</option>
              </select>

              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 flex items-center"
              >
                <FaFilter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {getActiveFilters().length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {getActiveFilters().map((filter, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {filter.type}: {filter.value}
                    <button
                      onClick={() => removeFilter(filter.type)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* New Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaShoppingBag className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">New Orders</h3>
                    <p className="text-sm text-gray-500">{newOrders.length} pending orders</p>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {newOrders.length}
                </span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {newOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">{order.id}</span>
                        <span className="text-lg">{getSourceIcon(order.source)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{order.customerName}</h4>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div className="flex items-center">
                          <FaPhoneAlt className="h-3 w-3 mr-2" />
                          {order.phone}
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="h-3 w-3 mr-2" />
                          {order.address}
                        </div>
                        <div className="flex items-center">
                          <FaClock className="h-3 w-3 mr-2" />
                          {order.time} - {order.date}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Items: {order.items.join(', ')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">₹{order.amount}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="text-blue-600 hover:text-blue-800 transition duration-200">
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 transition duration-200">
                          <FaEdit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {newOrders.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <FaShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No new orders found</p>
                </div>
              )}
            </div>
          </div>

          {/* Orders in Process */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaClock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Orders in Process</h3>
                    <p className="text-sm text-gray-500">{processingOrders.length} being processed</p>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {processingOrders.length}
                </span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {processingOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">{order.id}</span>
                        <span className="text-lg">{getSourceIcon(order.source)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{order.customerName}</h4>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div className="flex items-center">
                          <FaPhoneAlt className="h-3 w-3 mr-2" />
                          {order.phone}
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="h-3 w-3 mr-2" />
                          {order.address}
                        </div>
                        <div className="flex items-center">
                          <FaClock className="h-3 w-3 mr-2" />
                          {order.time} - {order.date}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Items: {order.items.join(', ')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">₹{order.amount}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="text-blue-600 hover:text-blue-800 transition duration-200">
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 transition duration-200">
                          <FaEdit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {processingOrders.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <FaClock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No orders in process</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}