'use client'

import { useState, useEffect } from 'react'
import { Building2, Users, Search, ArrowRight, MapPin, User, Phone, Mail, Settings, Edit2, X, Save } from 'lucide-react'
import AreaManagerDashboard from '../components/AreaManagerDashboard'
import RestaurantDashboard from '../components/RestaurantDashboard'
import ThemeToggle from '../components/ThemeToggle'

// Restaurant Editing Modal Component
const RestaurantEditModal = ({ isOpen, onClose, restaurant, onSave }) => {
  const [formData, setFormData] = useState({
    name: restaurant?.name || '',
    code: restaurant?.code || '',
    location: restaurant?.location || '',
    manager: restaurant?.manager || '',
    email: restaurant?.email || '',
    phone: restaurant?.phone || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Save to database
      const response = await fetch(`/api/restaurants/${restaurant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedRestaurant = await response.json();
        onSave(updatedRestaurant);
        onClose();
      } else {
        console.error('Failed to update restaurant');
        alert('Failed to update restaurant. Please try again.');
      }
    } catch (error) {
      console.error('Error updating restaurant:', error);
      alert('Error updating restaurant. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full transition-colors duration-200">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
            Edit Restaurant
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
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., Chili's Auburn Hills"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Restaurant Code *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
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
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., Auburn Hills, MI"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Manager Name *</label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) => setFormData({...formData, manager: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., John Olenski"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Manager Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., john.olenski@chilis.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Manager Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., (248) 555-0123"
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
              className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <Save size={16} className="inline mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Restaurant Selection Landing Page Component
const RestaurantSelectionPage = ({ onRestaurantSelect, onAreaManagerSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingRestaurant, setEditingRestaurant] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Fetch restaurants from database
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('/api/restaurants');
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        } else {
          console.error('Failed to fetch restaurants');
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (restaurant.settings?.manager || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.code.includes(searchTerm)
  )

  const handleEditRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant);
    setShowEditModal(true);
  };

  const handleSaveRestaurant = async (updatedRestaurant) => {
    // Update local state
    setRestaurants(prev => 
      prev.map(restaurant => 
        restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
      )
    );
    setShowEditModal(false);
    setEditingRestaurant(null);
    
    // Refresh data from database to ensure consistency
    try {
      const response = await fetch('/api/restaurants');
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      }
    } catch (error) {
      console.error('Error refreshing restaurants:', error);
    }
  };

  const handleDeleteRestaurant = async (restaurant) => {
    if (!confirm(`Are you sure you want to delete ${restaurant.name}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/restaurants?id=${restaurant.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setRestaurants(prev => prev.filter(r => r.id !== restaurant.id));
        alert('Restaurant deleted successfully');
      } else {
        const error = await response.json();
        alert(`Failed to delete restaurant: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Error deleting restaurant. Please try again.');
    }
  };

  const handleRestaurantClick = (restaurant) => {
    console.log('Restaurant selected:', restaurant)
    setSelectedRestaurant(restaurant)
    if (onRestaurantSelect) {
      onRestaurantSelect(restaurant)
    }
  }

  const handleAreaManagerClick = () => {
    console.log('Area Manager selected')
    if (onAreaManagerSelect) {
      onAreaManagerSelect()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">🍔 Restaurant Onboarding System</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-200">Select your restaurant to manage team member onboarding</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg transition-colors duration-200">
                <Building2 className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search restaurants by name, location, or manager..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Area Manager Option */}
        <div className="mb-8">
                      <div
              onClick={handleAreaManagerClick}
              className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-6 cursor-pointer hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                    <Users className="text-white" size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Area Manager Dashboard</h2>
                    <p className="text-blue-100 dark:text-blue-200">Manage all restaurants and view multi-location overview</p>
                  </div>
                </div>
                <ArrowRight className="text-white" size={24} />
              </div>
            </div>
        </div>

        {/* Restaurant Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading restaurants...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <div
                  key={restaurant.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-red-300 dark:hover:border-red-500 transition-all duration-200 transform hover:scale-105"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg transition-colors duration-200">
                        <Building2 className="text-red-600 dark:text-red-400" size={24} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-bold px-2 py-1 rounded-full transition-colors duration-200">
                          #{restaurant.code}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRestaurant(restaurant);
                          }}
                          className="text-gray-400 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 p-1 rounded transition-colors duration-200"
                          title="Edit Restaurant"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRestaurant(restaurant);
                          }}
                          className="text-gray-400 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 p-1 rounded transition-colors duration-200"
                          title="Delete Restaurant"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => handleRestaurantClick(restaurant)}
                      className="cursor-pointer"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">{restaurant.name}</h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                          <MapPin size={14} />
                          {restaurant.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                          <User size={14} />
                          {restaurant.settings?.manager || 'Not set'}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                          <Phone size={14} />
                          {restaurant.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                          <Mail size={14} />
                          {restaurant.email}
                        </div>
                      </div>

                      <button className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <ArrowRight size={16} />
                        Enter Restaurant
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
                <p className="text-gray-600 dark:text-gray-400">No restaurants found matching your search.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Restaurant Edit Modal */}
      <RestaurantEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingRestaurant(null);
        }}
        restaurant={editingRestaurant}
        onSave={handleSaveRestaurant}
      />
    </div>
  );
}

export default function HomePage() {
  const [currentView, setCurrentView] = useState('selection') // 'selection', 'restaurant', 'area'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  // Mock session - in real app this comes from NextAuth
  const session = {
    user: {
      id: 'user_1',
      name: 'Area Manager',
      email: 'area@chilis.com',
      role: 'AREA_MANAGER'
    }
  }

  const handleRestaurantSelect = (restaurant) => {
    console.log('Navigating to restaurant:', restaurant)
    setSelectedRestaurant(restaurant)
    setCurrentView('restaurant')
  }

  const handleAreaManagerSelect = () => {
    console.log('Navigating to area manager')
    setCurrentView('area')
  }

  const handleBackToSelection = () => {
    console.log('Going back to restaurant selection')
    setCurrentView('selection')
    setSelectedRestaurant(null)
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Restaurant Onboarding System
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to access the system.
          </p>
          <button className="btn-primary">
            Sign In
          </button>
        </div>
      </div>
    )
  }

  // Render different views based on current state
  if (currentView === 'restaurant' && selectedRestaurant) {
    return (
      <RestaurantDashboard 
        restaurant={selectedRestaurant}
        onBack={handleBackToSelection}
      />
    )
  }

  if (currentView === 'area') {
    return (
      <AreaManagerDashboard 
        onRestaurantSelect={handleRestaurantSelect}
        onBack={handleBackToSelection}
      />
    )
  }

  // Default to restaurant selection page
  return (
    <RestaurantSelectionPage
      onRestaurantSelect={handleRestaurantSelect}
      onAreaManagerSelect={handleAreaManagerSelect}
    />
  )
}
