'use client'

import React, { useState, useEffect } from 'react';
import { 
  Plus, Building2, Users, Search, Eye, Edit2, Trash2, X, Save, ArrowRight, FileText, RotateCcw
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

// Simple Restaurant Registration Modal
const RestaurantRegistrationModal = ({ isOpen, onClose, onSave, editingRestaurant = null }) => {
  const [formData, setFormData] = useState({
    name: editingRestaurant?.name || '',
    code: editingRestaurant?.code || '',
    location: editingRestaurant?.location || '',
    address: editingRestaurant?.address || '',
    phone: editingRestaurant?.phone || '(248) 555-0123',
    email: editingRestaurant?.email || 'john.olenski@chilis.com',
    timezone: editingRestaurant?.timezone || 'America/Detroit'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const restaurantData = {
        ...formData,
        settings: {}
      };

      if (editingRestaurant) {
        // Update existing restaurant
        const response = await fetch(`/api/restaurants?id=${editingRestaurant.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(restaurantData)
        });

        if (!response.ok) {
          throw new Error('Failed to update restaurant');
        }

        const updatedRestaurant = await response.json();
        onSave(updatedRestaurant);
      } else {
        // Create new restaurant
        const response = await fetch('/api/restaurants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(restaurantData)
        });

        if (!response.ok) {
          throw new Error('Failed to create restaurant');
        }

        const newRestaurant = await response.json();
        onSave(newRestaurant);
      }

      onClose();
    } catch (error) {
      console.error('Error saving restaurant:', error);
      alert('Failed to save restaurant. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full transition-colors duration-200">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
            {editingRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Restaurant Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., Chili's #605"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Code *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., 605"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Location *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., Auburn Hills, MI"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Address *</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., 123 Main St"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Phone *</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="(248) 555-0123"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="john.olenski@chilis.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Timezone *</label>
            <input
              type="text"
              value={formData.timezone}
              onChange={(e) => setFormData({...formData, timezone: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="America/Detroit"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {editingRestaurant ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AreaManagerDashboard = ({ onRestaurantSelect, onBack }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportLoading, setReportLoading] = useState(false);

  // Fetch restaurants from API
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/restaurants');
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const data = await response.json();
      setRestaurants(data);
      console.log('✅ Fetched restaurants:', data.length);
    } catch (error) {
      console.error('❌ Error fetching restaurants:', error);
      alert('Failed to load restaurants. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleAddRestaurant = (restaurantData) => {
    setRestaurants(prev => [...prev, restaurantData]);
    console.log('Restaurant added:', restaurantData);
  };

  const handleEditRestaurant = (restaurantData) => {
    setRestaurants(prev => 
      prev.map(restaurant => 
        restaurant.id === restaurantData.id ? restaurantData : restaurant
      )
    );
    setEditingRestaurant(null);
    console.log('Restaurant updated:', restaurantData);
  };

  const openEditModal = (restaurant) => {
    setEditingRestaurant(restaurant);
    setShowRegistrationModal(true);
    console.log('Editing restaurant:', restaurant);
  };

  const handleViewDashboard = (restaurant) => {
    console.log('Viewing dashboard for:', restaurant);
    if (onRestaurantSelect) {
      onRestaurantSelect(restaurant);
    } else {
      alert(`Opening dashboard for ${restaurant.name}`);
    }
  };

  // Function to reset all data (for deployment)
  const handleResetAllData = () => {
    if (window.confirm('⚠️ WARNING: This will reset ALL data across ALL restaurants. This action cannot be undone. Are you sure you want to proceed?')) {
      if (window.confirm('This will delete all team members, progress, and statistics. Final confirmation required.')) {
        // Reset all restaurant data
        setRestaurants(prev => prev.map(restaurant => ({
          ...restaurant,
          stats: {
            totalMembers: 0,
            completed: 0,
            inProgress: 0,
            notStarted: 0,
            avgCompletionTime: 0,
            lastActivity: 'Never'
          },
          recentActivity: []
        })));
        
        console.log('All data has been reset for deployment');
        alert('✅ All data has been reset successfully! Ready for deployment.');
      }
    }
  };

  // Function to generate area manager report and email it
  const generateAreaReport = async () => {
    setReportLoading(true);
    try {
    const reportData = {
      reportDate: new Date().toLocaleDateString(),
      totalRestaurants: restaurants.length,
      restaurants: restaurants.map(restaurant => {
        // Calculate restaurant statistics
        const totalMembers = restaurant.stats?.totalMembers || 0;
        const completedMembers = restaurant.stats?.completed || 0;
        const inProgressMembers = restaurant.stats?.inProgress || 0;
        const notStartedMembers = restaurant.stats?.notStarted || 0;
        const completionRate = totalMembers > 0 ? Math.round((completedMembers / totalMembers) * 100) : 0;
        const avgCompletionTime = restaurant.stats?.avgCompletionTime || 0;
        const lastActivity = restaurant.stats?.lastActivity || 'Never';

        return {
          restaurantName: restaurant.name,
          restaurantCode: restaurant.code,
          location: restaurant.location,
          manager: restaurant.manager || 'N/A',
          totalMembers: totalMembers,
          completedMembers: completedMembers,
          inProgressMembers: inProgressMembers,
          notStartedMembers: notStartedMembers,
          completionRate: completionRate,
          avgCompletionTime: avgCompletionTime,
          lastActivity: lastActivity,
          status: restaurant.status || 'active'
        };
      })
    };

    // Create CSV content
    const csvHeaders = [
      'Restaurant Name',
      'Restaurant Code',
      'Location',
      'Manager',
      'Total Team Members',
      'Completed',
      'In Progress',
      'Not Started',
      'Completion Rate %',
      'Avg Completion Time (days)',
      'Last Activity',
      'Status'
    ];

    const csvRows = reportData.restaurants.map(restaurant => [
      restaurant.restaurantName,
      restaurant.restaurantCode,
      restaurant.location,
      restaurant.manager,
      restaurant.totalMembers,
      restaurant.completedMembers,
      restaurant.inProgressMembers,
      restaurant.notStartedMembers,
      `${restaurant.completionRate}%`,
      restaurant.avgCompletionTime,
      restaurant.lastActivity,
      restaurant.status
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Area_Manager_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Also email the report
    try {
      console.log('📧 Sending report via email...');
      const emailResponse = await fetch('/api/email-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportData,
          csvContent
        })
      });

      if (emailResponse.ok) {
        const emailResult = await emailResponse.json();
        console.log('✅ Report emailed successfully:', emailResult.message);
        alert('Area Manager report generated and emailed successfully! 📧');
      } else {
        console.error('❌ Failed to email report');
        alert('Report generated successfully, but email failed to send.');
      }
    } catch (error) {
      console.error('❌ Error emailing report:', error);
      alert('Report generated successfully, but email failed to send.');
    }

    console.log('Area manager report generated:', reportData);
    } catch (error) {
      console.error('❌ Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setReportLoading(false);
    }
  };

  const areaStats = restaurants.reduce((acc, restaurant) => {
    acc.totalRestaurants += 1;
    acc.totalMembers += restaurant.stats?.totalMembers || 0;
    acc.totalCompleted += restaurant.stats?.completed || 0;
    acc.totalInProgress += restaurant.stats?.inProgress || 0;
    acc.totalNotStarted += restaurant.stats?.notStarted || 0;
    return acc;
  }, {
    totalRestaurants: 0,
    totalMembers: 0,
    totalCompleted: 0,
    totalInProgress: 0,
    totalNotStarted: 0
  });

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (restaurant.manager && restaurant.manager.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <button 
                  onClick={onBack}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-lg transition-colors"
                >
                  <ArrowRight size={20} className="rotate-180" />
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Area Manager Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Multi-Restaurant Onboarding Overview</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button 
                onClick={handleResetAllData}
                className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                title="Reset All Data for Deployment"
              >
                <RotateCcw size={20} />
                Reset Data
              </button>
              <button 
                onClick={generateAreaReport}
                disabled={reportLoading}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {reportLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FileText size={20} />
                    Generate Report
                  </>
                )}
              </button>
              <button 
                onClick={() => {
                  console.log('Add restaurant clicked');
                  setShowRegistrationModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                Add Restaurant
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Restaurants</p>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{areaStats.totalRestaurants}</p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 rounded-lg p-6 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
            <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Team Members</p>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{areaStats.totalMembers}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6 cursor-pointer hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">Completed</p>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">{areaStats.totalCompleted}</p>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900 border border-orange-200 dark:border-orange-700 rounded-lg p-6 cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors">
            <p className="text-sm font-medium text-orange-800 dark:text-orange-200">In Progress</p>
            <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{areaStats.totalInProgress}</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6 cursor-pointer hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">Not Started</p>
            <p className="text-3xl font-bold text-red-900 dark:text-red-100">{areaStats.totalNotStarted}</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-colors duration-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full max-w-md border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg transition-colors duration-200">
                      <Building2 className="text-red-600 dark:text-red-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">{restaurant.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">{restaurant.location}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">Code: {restaurant.code}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{restaurant.stats?.totalMembers || 0}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900 rounded-lg cursor-pointer hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{restaurant.stats?.completed || 0}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Completed</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900 rounded-lg cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors">
                    <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{restaurant.stats?.inProgress || 0}</p>
                    <p className="text-xs text-orange-600 dark:text-orange-400">In Progress</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-900 rounded-lg cursor-pointer hover:bg-red-100 dark:hover:bg-red-800 transition-colors">
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">{restaurant.stats?.notStarted || 0}</p>
                    <p className="text-xs text-red-600 dark:text-red-400">Not Started</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600 flex gap-2">
                <button 
                  onClick={() => handleViewDashboard(restaurant)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye size={16} />
                  View Dashboard
                </button>
                <button 
                  onClick={() => openEditModal(restaurant)}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
            <p className="text-gray-600 dark:text-gray-400">
              {restaurants.length === 0 ? 'No restaurants found. Add your first restaurant to get started.' : 'No restaurants found matching your search.'}
            </p>
          </div>
        )}
      </div>

      <RestaurantRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => {
          console.log('Closing modal');
          setShowRegistrationModal(false);
          setEditingRestaurant(null);
        }}
        onSave={editingRestaurant ? handleEditRestaurant : handleAddRestaurant}
        editingRestaurant={editingRestaurant}
      />
    </div>
  );
};

export default AreaManagerDashboard;
