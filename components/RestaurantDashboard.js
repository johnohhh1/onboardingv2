import React, { useState, useEffect } from 'react';
import { 
  Plus, User, Calendar, Phone, CheckCircle, Circle, Printer, Trash2, Edit2, Save, 
  Mail, Download, Clock, AlertCircle, Filter, Search, MoreVertical, Bell,
  TrendingUp, Users, Target, Award, MessageSquare, FileText, Settings,
  ChevronDown, ChevronRight, Star, Flag, Archive, AlertTriangle,
  X, ExternalLink, Copy, ArrowRight, Trophy, RotateCcw
} from 'lucide-react';
import ChecklistModal from './ChecklistModal';
import ThemeToggle from './ThemeToggle';

// Team Member Registration Modal
const TeamMemberRegistrationModal = ({ isOpen, onClose, onSave, editingMember = null }) => {
  const [formData, setFormData] = useState({
    name: editingMember?.name || '',
    email: editingMember?.email || '',
    phone: editingMember?.phone || '',
    position: editingMember?.position || '',
    startDate: editingMember?.startDate || '',
    startTime: editingMember?.startTime || '09:00',
    employeeId: editingMember?.employeeId || '',
    priority: editingMember?.priority || 'normal',
    assignedTrainer: editingMember?.assignedTrainer || 'Unassigned'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberData = {
      ...formData,
      id: editingMember?.id || `tm_${Date.now()}`,
      status: 'NOT_STARTED',
      daysInOnboarding: 0,
      completionPercentage: 0,
      lastActivity: 'Never',
      estimatedCompletion: '7 days',
      checklistData: {},
      notes: []
    };
    onSave(memberData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full transition-colors duration-200">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
            {editingMember ? 'Edit Team Member' : 'Add Team Member'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., John Doe"
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
              placeholder="e.g., john.doe@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., 555-0123"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Position *</label>
            <select
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              required
            >
              <option value="">Select Position</option>
              <option value="Server">Server</option>
              <option value="Host">Host</option>
              <option value="Cook">Cook</option>
              <option value="Bartender">Bartender</option>
              <option value="Runner">Runner</option>
              <option value="QA">QA</option>
              <option value="To-Go Prep">To-Go Prep</option>
              <option value="Dishwasher">Dishwasher</option>
              <option value="Busser">Busser</option>
              <option value="Manager">Manager</option>
              <option value="Trainer">Trainer</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Start Time *</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Employee ID</label>
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., EMP001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-200">Assigned Trainer</label>
            <input
              type="text"
              value={formData.assignedTrainer}
              onChange={(e) => setFormData({...formData, assignedTrainer: e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              placeholder="e.g., Mike Smith"
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
              {editingMember ? 'Update' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



const RestaurantDashboard = ({ restaurant, onBack }) => {
  // Use the restaurant prop passed from parent component
  const [currentRestaurant] = useState(restaurant || {
    id: "rest_605",
    name: "Chili's #605", 
    code: "605",
    location: "Auburn Hills, MI",
    manager: "Sarah Johnson",
    email: "sarah.johnson@chilis.com"
  });

  // Function to get progress color based on completion percentage
  const getProgressColor = (percent) => {
    if (percent === 100) return "bg-green-500"
    if (percent >= 75) return "bg-blue-500"
    if (percent >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Function to get dynamic status text based on completion percentage
  const getStatusText = (progress) => {
    if (progress === 100) return "COMPLETED"
    if (progress > 0) return "IN PROGRESS"
    return "NOT STARTED"
  }

  // Function to get dynamic status color based on completion percentage
  const getDynamicStatusColor = (progress) => {
    if (progress === 100) return "bg-green-500 text-white"
    if (progress > 0) return "bg-blue-500 text-white"
    return "bg-gray-400 text-gray-800"
  }

  // Helper function to calculate days since start date
  const calculateDaysInOnboarding = (startDate) => {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Helper function to get last activity timestamp
  const getLastActivity = (member) => {
    const checklistData = member.checklistData || {};
    const completedTasks = Object.values(checklistData).filter(task => task.completed);
    
    if (completedTasks.length === 0) return "Never";
    
    // Find the most recent completion
    const lastCompleted = completedTasks.reduce((latest, task) => {
      if (!task.completedAt) return latest;
      const taskDate = new Date(task.completedAt);
      if (!latest || taskDate > latest) return taskDate;
      return latest;
    }, null);
    
    if (!lastCompleted) return "Never";
    
    // Format as relative time
    const now = new Date();
    const diffMs = now - lastCompleted;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return "Just now";
  }

  // Helper function to calculate estimated completion
  const calculateEstimatedCompletion = (startDate, estimatedDays = 7) => {
    if (!startDate) return "N/A";
    const start = new Date(startDate);
    const estimatedDate = new Date(start.getTime() + (estimatedDays * 24 * 60 * 60 * 1000));
    return estimatedDate.toLocaleDateString();
  }

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "tm_1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "555-0123",
      position: "Server",
      startDate: "2024-07-15",
      startTime: "09:00",
      employeeId: "EMP001",
      status: "IN_PROGRESS",
      assignedTo: "trainer_1",
      assignedTrainer: "Mike Smith",
      priority: "normal",
      daysInOnboarding: 3,
      completionPercentage: 65,
      lastActivity: "2 hours ago",
      estimatedCompletion: "2 days",
      checklistData: {}, // This will store the checklist progress
      notes: [
        { id: 1, content: "Great attitude, picks up quickly", type: "SUCCESS", timestamp: "1 hour ago" },
        { id: 2, content: "Needs more practice with POS system", type: "REMINDER", timestamp: "3 hours ago" }
      ],
      checklist: {
        "call_offer": true,
        "start_date": true,
        "zoom_app": true,
        "krow_hire": true,
        "new_hire_app": true,
        "oracle_offer": true,
        "person_number": false,
        "onboarding_journey": false,
        "schedule_vfdo": true,
        "i9_documents": true,
        "headphones_phone": true,
        "dress_code": true,
        "verify_onboarding": false,
        "assign_job_code": false
      }
    },
    {
      id: "tm_2", 
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "555-0124",
      position: "Host",
      startDate: "2024-07-20",
      startTime: "10:00",
      employeeId: "EMP002",
      status: "COMPLETED",
      assignedTo: "trainer_2",
      assignedTrainer: "Lisa Chen",
      priority: "normal",
      daysInOnboarding: 8,
      completionPercentage: 100,
      lastActivity: "Completed 1 day ago",
      completedDate: "2024-07-19",
      checklistData: {},
      notes: [
        { id: 3, content: "Excellent performance throughout onboarding", type: "SUCCESS", timestamp: "1 day ago" }
      ],
      checklist: {}
    },
    {
      id: "tm_3",
      name: "Bob Wilson", 
      email: "bob.wilson@email.com",
      phone: "555-0125",
      position: "Cook",
      startDate: "2024-07-22",
      startTime: "08:00",
      employeeId: "EMP003",
      status: "NOT_STARTED",
      assignedTo: null,
      assignedTrainer: "Unassigned",
      priority: "high",
      daysInOnboarding: 0,
      completionPercentage: 0,
      lastActivity: "Never",
      estimatedCompletion: "7 days",
      checklistData: {},
      notes: [],
      checklist: {}
    }
  ]);

  const [selectedView, setSelectedView] = useState('dashboard');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [checklistMember, setChecklistMember] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [successStats, setSuccessStats] = useState({
    totalCompleted: 0,
    totalStarted: 0,
    successRate: 0
  });

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Function to open checklist modal
  const openChecklist = (member) => {
    setChecklistMember(member);
    setShowChecklistModal(true);
  };

  // Function to update checklist data
  const updateChecklistData = async (memberId, checklistData, fields = {}) => {
    try {
      // Calculate completion percentage based on checklist data
      const completedTasks = Object.values(checklistData).filter(task => task.completed);
      const totalTasks = 41; // Total number of tasks in the checklist
      const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
      
      // Update local state immediately for responsive UI
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === memberId 
            ? {
                ...member,
                checklistData,
                completionPercentage,
                ...(fields.trainerName !== undefined ? { assignedTrainer: fields.trainerName } : {}),
                ...(fields.employeeId !== undefined ? { employeeId: fields.employeeId } : {})
              }
            : member
        )
      );

      // Save to database
      const body = {
        checklistData: checklistData,
        ...(fields.trainerName !== undefined ? { assignedTrainer: fields.trainerName } : {}),
        ...(fields.employeeId !== undefined ? { employeeId: fields.employeeId } : {})
      };
      const response = await fetch(`/api/team-members/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to save checklist progress');
      }

      console.log('Checklist progress saved to database:', checklistData, fields);
    } catch (error) {
      console.error('Error saving checklist progress:', error);
      alert('Failed to save checklist progress. Please try again.');
    }
  };

  // Function to add new team member
  const handleAddTeamMember = async (memberData) => {
    try {
      // Save to database
      const response = await fetch('/api/team-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...memberData,
          restaurantId: restaurant.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save team member');
      }

      const savedMember = await response.json();
      
      // Transform the saved member to match frontend expectations
      const transformedMember = {
        id: savedMember.id,
        name: savedMember.name,
        email: savedMember.email,
        phone: savedMember.phone,
        position: savedMember.position,
        startDate: savedMember.start_date ? new Date(savedMember.start_date).toLocaleDateString() : '',
        startTime: '09:00', // Default time since not stored in DB
        employeeId: savedMember.employee_id || memberData.employeeId || '',
        status: savedMember.status,
        priority: savedMember.priority,
        notes: savedMember.notes ? JSON.parse(savedMember.notes) : [],
        checklistData: savedMember.checklist_data || {},
        // Add computed fields that don't exist in DB
        daysInOnboarding: 0,
        completionPercentage: savedMember.status === 'COMPLETED' ? 100 : 0,
        lastActivity: 'Never',
        estimatedCompletion: '7 days',
        assignedTrainer: savedMember.assigned_trainer || memberData.assignedTrainer || 'Unassigned'
      };
      
      // Update local state with the transformed member
      setTeamMembers(prev => [...prev, transformedMember]);
      console.log('Team member saved to database:', transformedMember);
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Failed to save team member. Please try again.');
    }
  };

  // Function to edit team member
  const handleEditTeamMember = async (memberData) => {
    try {
      // Save to database
      const response = await fetch(`/api/team-members/${memberData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...memberData,
          restaurantId: restaurant.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update team member');
      }

      const updatedMember = await response.json();
      
      // Update local state
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === memberData.id ? updatedMember : member
        )
      );
      setEditingMember(null);
      console.log('Team member updated in database:', updatedMember);
    } catch (error) {
      console.error('Error updating team member:', error);
      alert('Failed to update team member. Please try again.');
    }
  };

  // Function to delete team member (for quitters)
  const handleDeleteTeamMember = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this team member? This action cannot be undone.')) {
      try {
        // Delete from database
        const response = await fetch(`/api/team-members/${memberId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete team member');
        }

        // Update local state
        setTeamMembers(prev => prev.filter(member => member.id !== memberId));
        console.log('Team member deleted from database:', memberId);
      } catch (error) {
        console.error('Error deleting team member:', error);
        alert('Failed to delete team member. Please try again.');
      }
    }
  };

  // Function to mark complete and remove from queue
  const handleCompleteAndRemove = (memberId) => {
    if (window.confirm('Mark this team member as completed and remove from active queue?')) {
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === memberId 
            ? { ...member, status: 'COMPLETED', completionPercentage: 100 }
            : member
        )
      );
      
      // Update success stats
      setSuccessStats(prev => ({
        totalCompleted: prev.totalCompleted + 1,
        totalStarted: prev.totalStarted,
        successRate: Math.round(((prev.totalCompleted + 1) / prev.totalStarted) * 100)
      }));
      
      console.log('Team member completed and removed from queue:', memberId);
    }
  };

  // Function to load team members from database
  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`/api/team-members?restaurantId=${restaurant.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      
      // Transform database response to match frontend expectations
      const transformedData = data.map(member => {
        // Calculate completion percentage based on checklist data
        const checklistData = member.checklist_data || {};
        const completedTasks = Object.values(checklistData).filter(task => task.completed);
        const totalTasks = 41; // Total number of tasks in the checklist
        const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
        
        return {
          id: member.id,
          name: member.name,
          email: member.email,
          phone: member.phone,
          position: member.position,
          startDate: member.start_date ? new Date(member.start_date).toLocaleDateString() : '',
          startTime: '09:00', // Default time since not stored in DB
          employeeId: member.employee_id || '',
          status: member.status,
          priority: member.priority,
          notes: member.notes ? JSON.parse(member.notes) : [],
          checklistData: checklistData,
          // Add computed fields that don't exist in DB
          daysInOnboarding: calculateDaysInOnboarding(member.start_date),
          completionPercentage: completionPercentage,
          lastActivity: getLastActivity({ checklistData }),
          estimatedCompletion: calculateEstimatedCompletion(member.start_date),
          assignedTrainer: member.assigned_trainer || 'Unassigned'
        };
      });
      
      setTeamMembers(transformedData);
      console.log('Team members loaded from database:', transformedData);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  // Load team members when component mounts
  useEffect(() => {
    fetchTeamMembers();
  }, [restaurant.id]);

  // Function to update success stats
  const updateSuccessStats = () => {
    console.log('Updating success stats with team members:', teamMembers);
    
    // Calculate based on actual checklist progress
    const totalStarted = teamMembers.filter(m => {
      const checklistData = m.checklistData || {};
      const completedTasks = Object.values(checklistData).filter(task => task.completed);
      const hasStarted = completedTasks.length > 0;
      console.log(`${m.name}: ${completedTasks.length} completed tasks, hasStarted: ${hasStarted}`);
      return hasStarted; // Has started checklist
    }).length;
    
    const completed = teamMembers.filter(m => {
      const checklistData = m.checklistData || {};
      const completedTasks = Object.values(checklistData).filter(task => task.completed);
      const totalTasks = 41; // Total number of tasks
      const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
      const isCompleted = completionPercentage >= 80;
      console.log(`${m.name}: ${completedTasks.length}/${totalTasks} = ${completionPercentage}%, isCompleted: ${isCompleted}`);
      return isCompleted; // Consider completed if 80% or more done
    }).length;
    
    const successRate = totalStarted > 0 ? Math.round((completed / totalStarted) * 100) : 0;
    
    console.log(`Final stats: totalStarted=${totalStarted}, completed=${completed}, successRate=${successRate}%`);
    
    setSuccessStats({
      totalCompleted: completed,
      totalStarted: totalStarted,
      successRate: successRate
    });
  };

  // Update stats when team members change
  useEffect(() => {
    updateSuccessStats();
  }, [teamMembers]);

  // Function to print team member information
  const handlePrintTeamMember = (member) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Calculate progress
    const checklistData = member.checklistData || {};
    const completedTasks = Object.values(checklistData).filter(task => task.completed);
    const totalTasks = 41;
    const progressPercentage = Math.round((completedTasks.length / totalTasks) * 100);
    
    // Function to get progress color for print CSS
    const getPrintProgressColor = (percent) => {
      if (percent === 100) return "#10b981" // green-500
      if (percent >= 75) return "#3b82f6" // blue-500
      if (percent >= 25) return "#eab308" // yellow-500
      return "#ef4444" // red-500
    }
    
    // Create print-friendly HTML
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Team Member Report - ${member.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          .section { margin-bottom: 20px; }
          .section h3 { color: #2563eb; margin-bottom: 10px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .info-item { margin-bottom: 10px; }
          .info-label { font-weight: bold; color: #374151; }
          .progress-bar { width: 100%; height: 20px; background-color: #e5e7eb; border-radius: 10px; overflow: hidden; }
          .progress-fill { height: 100%; transition: width 0.3s; }
          .status-badge { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; }
          .status-completed { background-color: #d1fae5; color: #065f46; }
          .status-progress { background-color: #fef3c7; color: #92400e; }
          .status-not-started { background-color: #fee2e2; color: #991b1b; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Team Member Onboarding Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
        
        <div class="section">
          <h3>Team Member Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Name:</span> ${member.name}
            </div>
            <div class="info-item">
              <span class="info-label">Position:</span> ${member.position}
            </div>
            <div class="info-item">
              <span class="info-label">Employee ID:</span> ${member.employeeId || 'N/A'}
            </div>
            <div class="info-item">
              <span class="info-label">Phone:</span> ${member.phone}
            </div>
            <div class="info-item">
              <span class="info-label">Start Date:</span> ${member.startDate} at ${member.startTime}
            </div>
            <div class="info-item">
              <span class="info-label">Days in Onboarding:</span> ${member.daysInOnboarding}
            </div>
            <div class="info-item">
              <span class="info-label">Assigned Trainer:</span> ${member.assignedTrainer}
            </div>
            <div class="info-item">
              <span class="info-label">Last Activity:</span> ${member.lastActivity}
            </div>
          </div>
        </div>
        
        <div class="section">
          <h3>Progress Status</h3>
          <div class="info-item">
            <span class="info-label">Current Status:</span>
            <span class="status-badge status-${getStatusText(progressPercentage).toLowerCase().replace(' ', '-')}">${getStatusText(progressPercentage)}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Priority:</span>
            <span class="status-badge status-${member.priority}">${member.priority}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Progress:</span> ${progressPercentage}%
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercentage}%; background-color: ${getPrintProgressColor(progressPercentage)}"></div>
          </div>
          <p><small>${completedTasks.length} of ${totalTasks} tasks completed</small></p>
        </div>
        
        <div class="section">
          <h3>Restaurant Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Restaurant:</span> ${currentRestaurant.name}
            </div>
            <div class="info-item">
              <span class="info-label">Location:</span> ${currentRestaurant.location}
            </div>
            <div class="info-item">
              <span class="info-label">Manager:</span> ${currentRestaurant.manager}
            </div>
            <div class="info-item">
              <span class="info-label">Restaurant Code:</span> ${currentRestaurant.code}
            </div>
          </div>
        </div>
        
        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background-color: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer;">Print Report</button>
          <button onclick="window.close()" style="padding: 10px 20px; background-color: #6b7280; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">Close</button>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = function() {
      printWindow.print();
    };
    
    console.log('Printing team member info:', member.name);
  };

  // Function to email team member using default email client
  const handleEmailTeamMember = (member) => {
    // Create email subject and body
    const subject = encodeURIComponent(`Onboarding Update - ${member.name} - ${currentRestaurant.name}`);
    
    // Calculate progress for email
    const checklistData = member.checklistData || {};
    const completedTasks = Object.values(checklistData).filter(task => task.completed);
    const totalTasks = 41;
    const progressPercentage = Math.round((completedTasks.length / totalTasks) * 100);
    
    const body = encodeURIComponent(`
Hello ${member.name},

This is an update on your onboarding progress at ${currentRestaurant.name}.

Current Status:
- Position: ${member.position}
- Start Date: ${member.startDate}
- Days in Onboarding: ${member.daysInOnboarding}
- Progress: ${progressPercentage}% (${completedTasks.length} of ${totalTasks} tasks completed)
- Status: ${getStatusText(progressPercentage)}
- Assigned Trainer: ${member.assignedTrainer}
- Last Activity: ${member.lastActivity}

If you have any questions about your onboarding progress, please don't hesitate to reach out.

Best regards,
${currentRestaurant.manager}
${currentRestaurant.name}
    `.trim());
    
    // Open default email client
    const mailtoLink = `mailto:${member.email || ''}?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
    
    console.log('Opening email client for:', member.name);
  };

  // Function to generate restaurant report
  const generateRestaurantReport = () => {
    const reportData = {
      restaurantName: currentRestaurant.name,
      restaurantCode: currentRestaurant.code,
      location: currentRestaurant.location,
      manager: currentRestaurant.manager,
      reportDate: new Date().toLocaleDateString(),
      teamMembers: teamMembers.map(member => {
        // Calculate last completed step
        const checklistData = member.checklistData || {};
        const completedTasks = Object.values(checklistData).filter(task => task.completed);
        const totalTasks = 41; // Total tasks in the checklist
        const progressPercentage = Math.round((completedTasks.length / totalTasks) * 100);
        
        // Find last completed step
        let lastCompletedStep = 'Not Started';
        if (completedTasks.length > 0) {
          if (progressPercentage >= 100) {
            lastCompletedStep = 'Completed';
          } else if (progressPercentage >= 80) {
            lastCompletedStep = 'Step 5: Post First Day';
          } else if (progressPercentage >= 60) {
            lastCompletedStep = 'Step 4: First Day';
          } else if (progressPercentage >= 40) {
            lastCompletedStep = 'Step 3: Prepare Materials';
          } else if (progressPercentage >= 20) {
            lastCompletedStep = 'Step 2: Prior to First Day';
          } else {
            lastCompletedStep = 'Step 1: Setting Up New TM';
          }
        }

        return {
          name: member.name,
          position: member.position,
          employeeId: member.employeeId || 'N/A',
          startDate: member.startDate,
          status: getStatusText(progressPercentage),
          progressPercentage: progressPercentage,
          lastCompletedStep: lastCompletedStep,
          daysInOnboarding: calculateDaysInOnboarding(member.startDate),
          assignedTrainer: member.assignedTrainer || 'Unassigned',
          lastActivity: getLastActivity(member),
          estimatedCompletion: calculateEstimatedCompletion(member.startDate)
        };
      })
    };

    // Create CSV content
    const csvHeaders = [
      'Name',
      'Position', 
      'Employee ID',
      'Start Date',
      'Status',
      'Progress %',
      'Last Step Completed',
      'Days in Onboarding',
      'Assigned Trainer',
      'Last Activity',
      'Estimated Completion'
    ];

    const csvRows = reportData.teamMembers.map(member => [
      member.name,
      member.position,
      member.employeeId || '',          // <-- Pull from top-level team member field
      member.startDate,
      member.status,
      `${member.progressPercentage}%`,
      member.lastCompletedStep,
      member.daysInOnboarding,
      member.assignedTrainer || '',         // <-- Pull from top-level team member field
      member.lastActivity,
      member.estimatedCompletion
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
    a.download = `${currentRestaurant.name.replace(/\s+/g, '_')}_Team_Members_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    console.log('Restaurant report generated:', reportData);
    alert(`Report generated for ${currentRestaurant.name}!`);
  };

  // Function to generate detailed data export
  const generateDetailedExport = () => {
    const exportData = {
      restaurantInfo: {
        name: currentRestaurant.name,
        code: currentRestaurant.code,
        location: currentRestaurant.location,
        manager: currentRestaurant.manager,
        email: currentRestaurant.email
      },
      exportDate: new Date().toISOString(),
      teamMembers: teamMembers.map(member => {
        const checklistData = member.checklistData || {};
        const completedTasks = Object.values(checklistData).filter(task => task.completed);
        const totalTasks = 41;
        const progressPercentage = Math.round((completedTasks.length / totalTasks) * 100);

        return {
          // Basic Info
          id: member.id,
          name: member.name,
          email: member.email,
          phone: member.phone,
          position: member.position,
          employeeId: member.employeeId || 'N/A',
          
          // Dates & Timing
          startDate: member.startDate,
          startTime: member.startTime,
          daysInOnboarding: member.daysInOnboarding,
          estimatedCompletion: member.estimatedCompletion || 'N/A',
          
          // Status & Progress
          status: member.status,
          priority: member.priority,
          completionPercentage: progressPercentage,
          lastActivity: member.lastActivity,
          
          // Assignment
          assignedTo: member.assignedTo,
          assignedTrainer: member.assignedTrainer,
          
          // Detailed Checklist Data
          checklistData: checklistData,
          completedTasksCount: completedTasks.length,
          totalTasksCount: totalTasks,
          
          // Notes
          notes: member.notes || [],
          notesCount: (member.notes || []).length,
          
          // Raw Data
          rawChecklist: member.checklist || {},
          completionDate: member.completedDate || null
        };
      }),
      statistics: {
        totalMembers: teamMembers.length,
        completed: teamMembers.filter(tm => {
          const checklistData = tm.checklistData || {};
          const completedTasks = Object.values(checklistData).filter(task => task.completed);
          const totalTasks = 41;
          const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
          return completionPercentage === 100;
        }).length,
        inProgress: teamMembers.filter(tm => {
          const checklistData = tm.checklistData || {};
          const completedTasks = Object.values(checklistData).filter(task => task.completed);
          const totalTasks = 41;
          const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
          return completedTasks.length > 0 && completionPercentage < 100;
        }).length,
        notStarted: teamMembers.filter(tm => {
          const checklistData = tm.checklistData || {};
          const completedTasks = Object.values(checklistData).filter(task => task.completed);
          return completedTasks.length === 0;
        }).length,
        highPriority: teamMembers.filter(tm => tm.priority === 'high').length,
        avgCompletionTime: 6.2,
        completionRate: Math.round((teamMembers.filter(tm => {
          const checklistData = tm.checklistData || {};
          const completedTasks = Object.values(checklistData).filter(task => task.completed);
          const totalTasks = 41;
          const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
          return completionPercentage === 100;
        }).length / teamMembers.length) * 100)
      }
    };

    // Create JSON file for detailed export
    const jsonContent = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentRestaurant.name.replace(/\s+/g, '_')}_Detailed_Export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    console.log('Detailed export generated:', exportData);
    alert(`Detailed data export generated for ${currentRestaurant.name}!`);
  };

  // Calculate dashboard statistics based on actual checklist progress
  const stats = {
    total: teamMembers.length,
    completed: teamMembers.filter(tm => {
      const checklistData = tm.checklistData || {};
      const completedTasks = Object.values(checklistData).filter(task => task.completed);
      const totalTasks = 41;
      const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
      return completionPercentage >= 80; // Consider completed if 80% or more done
    }).length,
    inProgress: teamMembers.filter(tm => {
      const checklistData = tm.checklistData || {};
      const completedTasks = Object.values(checklistData).filter(task => task.completed);
      const totalTasks = 41;
      const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
      return completedTasks.length > 0 && completionPercentage < 80; // Has started but not completed
    }).length,
    notStarted: teamMembers.filter(tm => {
      const checklistData = tm.checklistData || {};
      const completedTasks = Object.values(checklistData).filter(task => task.completed);
      return completedTasks.length === 0; // No checklist progress
    }).length,
    highPriority: teamMembers.filter(tm => tm.priority === 'high').length,
    avgCompletionTime: 6.2,
    completionRate: Math.round((teamMembers.filter(tm => {
      const checklistData = tm.checklistData || {};
      const completedTasks = Object.values(checklistData).filter(task => task.completed);
      const totalTasks = 41;
      const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
      return completionPercentage >= 80;
    }).length / teamMembers.length) * 100)
  };

  // Recent activity feed based on actual team member data
  const recentActivity = teamMembers
    .filter(tm => {
      const checklistData = tm.checklistData || {};
      const completedTasks = Object.values(checklistData).filter(task => task.completed);
      return completedTasks.length > 0; // Only show team members with activity
    })
    .slice(0, 4) // Show up to 4 recent activities
    .map((tm, index) => {
      const checklistData = tm.checklistData || {};
      const completedTasks = Object.values(checklistData).filter(task => task.completed);
      const totalTasks = 41;
      const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
      
      let action, icon, color;
      if (completionPercentage >= 80) {
        action = 'completed onboarding';
        icon = CheckCircle;
        color = 'text-green-600';
      } else if (completedTasks.length > 0) {
        action = `completed ${completedTasks.length} tasks`;
        icon = Clock;
        color = 'text-blue-600';
      } else {
        action = 'started onboarding';
        icon = Clock;
        color = 'text-blue-600';
      }
      
      return {
        id: index + 1,
        type: completionPercentage >= 80 ? 'completed' : 'started',
        member: tm.name,
        action: action,
        timestamp: 'Recently',
        icon: icon,
        color: color
      };
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-200'; 
      case 'NOT_STARTED': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Calculate dynamic status based on completion percentage
    const checklistData = member.checklistData || {};
    const completedTasks = Object.values(checklistData).filter(task => task.completed);
    const totalTasks = 41;
    const completionPercentage = Math.round((completedTasks.length / totalTasks) * 100);
    const dynamicStatus = getStatusText(completionPercentage);
    
    const matchesStatus = filterStatus === 'all' || dynamicStatus === filterStatus;
    const matchesPriority = filterPriority === 'all' || member.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const QuickStatCard = ({ title, value, subtitle, color, icon: Icon, onClick, trend }) => (
    <div 
      className={`${color} rounded-lg p-3 sm:p-6 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Icon size={16} className="sm:w-5 sm:h-5 opacity-70 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-medium opacity-80 text-gray-900 dark:text-white truncate">{title}</p>
          </div>
          <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-xs sm:text-sm opacity-70 mt-1 text-gray-700 dark:text-gray-300 truncate">{subtitle}</p>}
        </div>
        {trend && (
          <div className="text-right flex-shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 opacity-60 ml-auto" />
            <p className="text-xs opacity-70 mt-1 text-gray-700 dark:text-gray-300">{trend}</p>
          </div>
        )}
      </div>
    </div>
  );

  const TeamMemberCard = ({ member }) => {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg transition-colors duration-200">
                <User className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200 truncate">{member.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDynamicStatusColor(member.completionPercentage)}`}>
                    {getStatusText(member.completionPercentage)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(member.priority)}`}>
                    {member.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200 truncate">{member.position} • {member.employeeId}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span className="truncate">{member.startDate} at {member.startTime}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={14} />
                    <span className="truncate">{member.phone}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openChecklist(member)}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
              >
                <span className="hidden sm:inline">View/Edit Progress</span>
                <span className="sm:hidden">Progress</span>
              </button>
              <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Progress</span>
              <span className="font-medium text-gray-900 dark:text-white transition-colors duration-200">{member.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(member.completionPercentage)}`}
                style={{ width: `${member.completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">Days Active</p>
              <p className="font-semibold text-gray-900 dark:text-white transition-colors duration-200">{member.daysInOnboarding}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">Trainer</p>
              <p className="font-semibold text-xs text-gray-900 dark:text-white transition-colors duration-200">{member.assignedTrainer}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">Last Activity</p>
              <p className="font-semibold text-xs text-gray-900 dark:text-white transition-colors duration-200">{member.lastActivity}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">Est. Completion</p>
              <p className="font-semibold text-xs text-gray-900 dark:text-white transition-colors duration-200">{member.estimatedCompletion || 'N/A'}</p>
            </div>
          </div>
        </div>



        {/* Action Footer */}
        <div className="px-4 sm:px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" size={16} />
            <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">Priority: {member.priority}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleCompleteAndRemove(member.id)}
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-2 transition-colors duration-200"
              title="Mark Complete & Remove"
            >
              <CheckCircle size={16} />
            </button>
            <button 
              onClick={() => handleDeleteTeamMember(member.id)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 transition-colors duration-200"
              title="Delete Team Member"
            >
              <Trash2 size={16} />
            </button>
            <button 
              onClick={() => handlePrintTeamMember(member)}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 p-2 transition-colors duration-200"
              title="Print Team Member Info"
            >
              <Printer size={16} />
            </button>
            <button 
              onClick={() => handleEmailTeamMember(member)}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 p-2 transition-colors duration-200"
              title="Email Team Member"
            >
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {onBack && (
                <button 
                  onClick={onBack}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-lg transition-colors"
                >
                  <ArrowRight size={20} className="rotate-180" />
                </button>
              )}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200 truncate">{currentRestaurant.name}</h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 transition-colors duration-200 truncate">{currentRestaurant.location} • Manager: {currentRestaurant.manager}</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:hidden">
              <ThemeToggle />
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-lg transition-colors"
              >
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <ThemeToggle />
              <button 
                onClick={() => {
                  console.log('Add team member clicked');
                  setShowAddMemberModal(true);
                }}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                <span className="hidden lg:inline">Add Team Member</span>
                <span className="lg:hidden">Add</span>
              </button>
              <button 
                onClick={() => {
                  console.log('Export data clicked');
                  generateDetailedExport();
                }}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Download size={20} />
                <span className="hidden lg:inline">Export Data</span>
                <span className="lg:hidden">Export</span>
              </button>
              <button 
                onClick={() => {
                  console.log('Notifications clicked');
                  alert('Notifications coming soon!');
                }}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-lg transition-colors"
              >
                <Bell size={20} />
              </button>
              <button 
                onClick={() => {
                  console.log('Settings clicked');
                  alert('Settings coming soon!');
                }}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-lg transition-colors"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="sm:hidden bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4 space-y-3">
              <button 
                onClick={() => {
                  setShowAddMemberModal(true);
                  setShowMobileMenu(false);
                }}
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Plus size={20} />
                Add Team Member
              </button>
              <button 
                onClick={() => {
                  generateDetailedExport();
                  setShowMobileMenu(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={20} />
                Export Data
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    alert('Notifications coming soon!');
                    setShowMobileMenu(false);
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Bell size={20} />
                  <span className="text-sm">Notifications</span>
                </button>
                <button 
                  onClick={() => {
                    alert('Settings coming soon!');
                    setShowMobileMenu(false);
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Settings size={20} />
                  <span className="text-sm">Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <QuickStatCard
            title="Total Members"
            value={stats.total}
            color="bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700"
            icon={Users}
            onClick={() => setFilterStatus('all')}
          />
          <QuickStatCard
            title="Completed"
            value={stats.completed}
            subtitle={`${stats.completionRate}% rate`}
            color="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700"
            icon={CheckCircle}
            onClick={() => setFilterStatus('COMPLETED')}
            trend="+2 this week"
          />
          <QuickStatCard
            title="In Progress"
            value={stats.inProgress}
            subtitle="Active onboarding"
            color="bg-orange-100 dark:bg-orange-900 border border-orange-200 dark:border-orange-700"
            icon={Clock}
            onClick={() => setFilterStatus('IN_PROGRESS')}
          />
          <QuickStatCard
            title="Needs Attention"
            value={stats.notStarted}
            subtitle="Not yet started"
            color="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700"
            icon={AlertTriangle}
            onClick={() => setFilterStatus('NOT_STARTED')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6 transition-colors duration-200">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                      <input
                        type="text"
                        placeholder="Search team members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter size={20} className="text-gray-400 dark:text-gray-500" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    >
                      <option value="all">All Status</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="NOT_STARTED">Not Started</option>
                      <option value="ON_HOLD">On Hold</option>
                    </select>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    >
                      <option value="all">All Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members List */}
            <div className="space-y-6">
              {filteredMembers.map(member => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <User className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
                <p className="text-gray-600 dark:text-gray-400">No team members found matching your filters.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Success Stats */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-lg shadow-sm p-6 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="text-yellow-600 dark:text-yellow-400" size={24} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">Success Tracker</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Completed</span>
                  <span className="font-bold text-lg text-green-600 dark:text-green-400">{successStats.totalCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Started</span>
                  <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{successStats.totalStarted}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Success Rate</span>
                    <span className="font-bold text-lg text-yellow-600 dark:text-yellow-400">{successStats.successRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className={`${getProgressColor(successStats.successRate)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${successStats.successRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <activity.icon className={activity.color} size={16} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white transition-colors duration-200">
                        <span className="font-medium">{activity.member}</span>{' '}
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200">
                View All Activity
              </button>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">Completion Rate</span>
                    <span className="font-medium text-gray-900 dark:text-white transition-colors duration-200">{stats.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`${getProgressColor(stats.completionRate)} h-2 rounded-full transition-all duration-300`} style={{ width: `${stats.completionRate}%` }}></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Completion Time</p>
                  <p className="text-lg font-semibold">{stats.avgCompletionTime} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">High Priority Items</p>
                  <p className="text-lg font-semibold text-red-600">{stats.highPriority}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={generateRestaurantReport}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  <FileText size={16} />
                  Generate Report
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2">
                  <Mail size={16} />
                  Email Summary
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2">
                  <Settings size={16} />
                  Customize Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Member Registration Modal */}
      <TeamMemberRegistrationModal
        isOpen={showAddMemberModal}
        onClose={() => {
          console.log('Closing team member modal');
          setShowAddMemberModal(false);
          setEditingMember(null);
        }}
        onSave={editingMember ? handleEditTeamMember : handleAddTeamMember}
        editingMember={editingMember}
      />

      {/* Interactive Checklist Modal */}
      <ChecklistModal
        isOpen={showChecklistModal}
        onClose={() => setShowChecklistModal(false)}
        teamMember={checklistMember}
        onUpdate={updateChecklistData}
      />
    </div>
  );
};

export default RestaurantDashboard;

