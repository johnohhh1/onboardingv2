'use client'

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Circle, X, Save, Copy, ExternalLink, AlertCircle, 
  ChevronDown, ChevronRight, Calendar, Clock, User, FileText,
  Phone, Mail, Download, Settings, Users, Target, Award
} from 'lucide-react';

const ChecklistModal = ({ isOpen, onClose, teamMember, onUpdate }) => {
  const [checklistData, setChecklistData] = useState({});
  const [expandedStep, setExpandedStep] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Function to get progress color based on completion percentage
  const getProgressColor = (percent) => {
    if (percent === 100) return "bg-green-500"
    if (percent >= 75) return "bg-blue-500"
    if (percent >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Load existing checklist data when modal opens
  useEffect(() => {
    if (isOpen && teamMember) {
      setChecklistData(teamMember.checklistData || {});
      console.log('Loading existing checklist data:', teamMember.checklistData);
    }
  }, [isOpen, teamMember]);

  // Complete checklist structure with all 40+ tasks
  const checklistSteps = [
    {
      step: 1,
      title: "Setting Up New TM",
      description: "Initial setup and system configuration",
      color: "bg-blue-100 border-blue-300 text-blue-800",
      tasks: [
        {
          id: 'call_offer',
          title: 'Call candidate, extend offer and welcome to team',
          type: 'checkbox',
          required: true,
          description: 'Make initial contact and extend formal offer'
        },
        {
          id: 'start_date_overview',
          title: 'Provide start date and First Day overview',
          type: 'input_required',
          required: true,
          fields: {
            startDate: { type: 'date', label: 'Start Date' },
            startTime: { type: 'time', label: 'Start Time' },
            overviewProvided: { type: 'select', label: 'Overview Status', options: ['Completed', 'Scheduled', 'Not Done'] }
          }
        },
        {
          id: 'zoom_app',
          title: 'Ask TM to download Zoom Workplace app',
          type: 'checkbox',
          required: true,
          description: 'Ensure TM has Zoom app installed for virtual meetings'
        },
        {
          id: 'krow_hire',
          title: 'Change candidate status to "Hire" in KROW',
          type: 'checkbox',
          required: true,
          description: 'Update candidate status in KROW system'
        },
        {
          id: 'new_hire_app',
          title: 'Complete New Hire Application',
          type: 'checkbox',
          required: true,
          description: 'Submit new hire application in system'
        },
        {
          id: 'oracle_offer',
          title: 'Login to Oracle to create offer and hire',
          type: 'checkbox',
          required: true,
          description: 'Create official offer in Oracle system'
        },
        {
          id: 'person_number',
          title: 'Obtain and provide TM Person Number',
          type: 'input_required',
          required: true,
          fields: {
            personNumber: { type: 'text', label: 'TM Person Number', placeholder: 'e.g., 12345678' },
            providedDate: { type: 'date', label: 'Date Provided to TM' },
            method: { type: 'select', label: 'How Provided', options: ['Phone', 'Email', 'Text', 'In Person'] }
          }
        },
        {
          id: 'onboarding_journey',
          title: 'Direct TM to complete Onboarding Journey',
          type: 'checkbox',
          required: true,
          description: 'Guide TM through digital onboarding process'
        },
        {
          id: 'schedule_vfdo',
          title: 'Schedule Virtual First Day Orientation (VFDO)',
          type: 'datetime_required',
          required: true,
          fields: {
            vfdoDate: { type: 'date', label: 'VFDO Date' },
            vfdoTime: { type: 'time', label: 'VFDO Time' },
            meetingId: { type: 'text', label: 'Meeting ID', placeholder: 'Zoom meeting ID' },
            duration: { type: 'select', label: 'Duration', options: ['60 minutes', '90 minutes', '120 minutes'] }
          }
        },
        {
          id: 'i9_documents',
          title: 'Remind TM to bring I-9 documents',
          type: 'checkbox',
          required: true,
          description: 'Ensure TM brings proper identification documents'
        },
        {
          id: 'headphones_phone',
          title: 'Ask TM to bring headphones and phone',
          type: 'checkbox',
          required: true,
          description: 'For virtual training and communication'
        },
        {
          id: 'dress_code',
          title: 'Discuss dress code and slip resistant shoes',
          type: 'checkbox',
          required: true,
          description: 'Review dress code requirements and safety footwear'
        }
      ]
    },
    {
      step: 2,
      title: "Prior to First Day",
      description: "Final preparations before TM starts",
      color: "bg-green-100 border-green-300 text-green-800",
      tasks: [
        {
          id: 'verify_onboarding',
          title: 'Verify TM completed Onboarding Journey',
          type: 'input_required',
          required: true,
          fields: {
            verificationDate: { type: 'date', label: 'Verification Date' },
            completionStatus: { type: 'select', label: 'Status', options: ['Completed', 'Partially Complete', 'Not Started'] },
            notes: { type: 'text', label: 'Verification Notes', placeholder: 'Any issues or concerns?' }
          }
        },
        {
          id: 'assign_job_code',
          title: 'Assign correct job codes and pay rate in Oracle',
          type: 'input_required',
          required: true,
          fields: {
            jobCode: { type: 'text', label: 'Job Code', placeholder: 'e.g., SRV001' },
            payRate: { type: 'text', label: 'Pay Rate', placeholder: 'e.g., $15.00' },
            assignedDate: { type: 'date', label: 'Date Assigned' }
          }
        }
      ]
    },
    {
      step: 3,
      title: "Prepare Materials",
      description: "Gather all necessary materials for first day",
      color: "bg-purple-100 border-purple-300 text-purple-800",
      tasks: [
        {
          id: 'vfd_par_guide',
          title: 'Ensure VFD Par Guide ready',
          type: 'checkbox',
          required: true,
          description: 'Virtual First Day orientation materials prepared'
        },
        {
          id: 'first_day_pin',
          title: 'Ensure First Day Pin ready',
          type: 'checkbox',
          required: true,
          description: 'PIN for system access on first day'
        },
        {
          id: 'hs_welcome_sheet',
          title: 'Print HotSchedules Welcome Sheet with login credentials',
          type: 'checkbox_with_link',
          required: true,
          link: 'https://app.hotschedules.com/login',
          linkText: 'HotSchedules Login Portal',
          fields: {
            userId: { type: 'text', label: 'HotSchedules User ID', placeholder: 'Generated user ID' },
            printedDate: { type: 'date', label: 'Date Printed' }
          }
        },
        {
          id: 'welcome_gift',
          title: 'Assemble Welcome Gift',
          type: 'checkbox',
          required: true,
          description: 'Prepare welcome package for new TM'
        },
        {
          id: 'assign_trainer',
          title: 'Assign Certified Trainer and print Training Schedule',
          type: 'input_required',
          required: true,
          fields: {
            trainerName: { type: 'text', label: 'Trainer Name', placeholder: 'e.g., Mike Smith' },
            trainerId: { type: 'text', label: 'Trainer ID', placeholder: 'e.g., TRN001' },
            schedulePrinted: { type: 'date', label: 'Schedule Printed Date' }
          }
        },
        {
          id: 'paycard',
          title: 'Gather unactivated Paycard if needed',
          type: 'checkbox',
          required: false,
          description: 'Prepare paycard for TM if requested'
        }
      ]
    },
    {
      step: 4,
      title: "First Day",
      description: "Complete all first day activities and training",
      color: "bg-orange-100 border-orange-300 text-orange-800",
      tasks: [
        {
          id: 'clock_in_demo',
          title: 'Demonstrate how to clock-in',
          type: 'checkbox',
          required: true,
          description: 'Show TM how to use time clock system'
        },
        {
          id: 'welcome_gift_given',
          title: 'Welcome TM with gift',
          type: 'checkbox',
          required: true,
          description: 'Present welcome gift to new TM'
        },
        {
          id: 'i9_verification',
          title: 'Complete I-9 verification',
          type: 'input_required',
          required: true,
          fields: {
            verificationDate: { type: 'date', label: 'Verification Date' },
            documentsReceived: { type: 'select', label: 'Documents Status', options: ['Complete', 'Incomplete', 'Pending'] },
            notes: { type: 'text', label: 'Verification Notes', placeholder: 'Any issues?' }
          }
        },
        {
          id: 'introduce_family',
          title: 'Introduce new TM to ChiliHead family',
          type: 'checkbox',
          required: true,
          description: 'Introduce TM to team members and staff'
        },
        {
          id: 'file_folder',
          title: 'Complete TM file folder',
          type: 'checkbox',
          required: true,
          description: 'Set up and organize TM personnel file'
        },
        {
          id: 'brinker_nation',
          title: 'Set up Brinker Nation login',
          type: 'input_required',
          required: true,
          fields: {
            loginCreated: { type: 'select', label: 'Login Status', options: ['Created', 'Pending', 'Issues'] },
            username: { type: 'text', label: 'Username', placeholder: 'Generated username' },
            setupDate: { type: 'date', label: 'Setup Date' }
          }
        },
        {
          id: 'activate_paycard',
          title: 'Activate Paycard in Oracle',
          type: 'checkbox',
          required: true,
          description: 'Activate paycard for TM in Oracle system'
        },
        {
          id: 'oracle_fusion',
          title: 'Download Oracle Fusion app and walkthrough',
          type: 'checkbox',
          required: true,
          description: 'Install and demonstrate Oracle Fusion app'
        },
        {
          id: 'hotschedules_availability',
          title: 'Fill out availability in HotSchedules',
          type: 'input_required',
          required: true,
          fields: {
            availabilitySet: { type: 'select', label: 'Availability Status', options: ['Complete', 'Partial', 'Not Set'] },
            setDate: { type: 'date', label: 'Date Set' },
            notes: { type: 'text', label: 'Availability Notes', placeholder: 'Any restrictions?' }
          }
        },
        {
          id: 'introduce_trainer',
          title: 'Introduce to Certified Trainer',
          type: 'checkbox',
          required: true,
          description: 'Formal introduction to assigned trainer'
        },
        {
          id: 'learning_path',
          title: 'Ensure TM can navigate Learning Path',
          type: 'checkbox',
          required: true,
          description: 'Verify TM can access and use learning platform'
        },
        {
          id: 'zoom_meeting_id',
          title: 'Provide Virtual Meeting ID for Zoom',
          type: 'input_required',
          required: true,
          fields: {
            meetingId: { type: 'text', label: 'Meeting ID', placeholder: 'Zoom meeting ID' },
            providedDate: { type: 'date', label: 'Date Provided' }
          }
        },
        {
          id: 'vfdo_setup',
          title: 'Set up for VFDO (90 minutes)',
          type: 'checkbox',
          required: true,
          description: 'Prepare for Virtual First Day Orientation'
        },
        {
          id: 'play_restaurant',
          title: 'Verify "Play Restaurant" activity completed',
          type: 'checkbox',
          required: true,
          description: 'Ensure TM completed restaurant simulation activity'
        },
        {
          id: 'scavenger_hunt',
          title: 'Verify "Scavenger Hunt" completed',
          type: 'checkbox',
          required: true,
          description: 'Confirm TM completed location scavenger hunt'
        },
        {
          id: 'new_crew_sign',
          title: 'Hang "New to the Crew" on Connection Board',
          type: 'checkbox',
          required: true,
          description: 'Add TM to team connection board'
        },
        {
          id: 'first_day_modules',
          title: 'Ensure all First Day modules complete',
          type: 'checkbox',
          required: true,
          description: 'Verify all required first day training completed'
        }
      ]
    },
    {
      step: 5,
      title: "Post First Day",
      description: "Follow-up activities after first day",
      color: "bg-red-100 border-red-300 text-red-800",
      tasks: [
        {
          id: 'gratshare_enable',
          title: 'Enable TM in Gratshare after 72 hours',
          type: 'input_required',
          required: true,
          fields: {
            enabledDate: { type: 'date', label: 'Date Enabled' },
            status: { type: 'select', label: 'Status', options: ['Enabled', 'Pending', 'Issues'] }
          }
        },
        {
          id: 'learning_path_complete',
          title: 'Ensure Learning Path complete upon graduation',
          type: 'checkbox',
          required: true,
          description: 'Verify all learning modules completed'
        },
        {
          id: 'job_webinar',
          title: 'Schedule job-specific webinar',
          type: 'input_required',
          required: true,
          fields: {
            webinarDate: { type: 'date', label: 'Webinar Date' },
            webinarTime: { type: 'time', label: 'Webinar Time' },
            webinarType: { type: 'select', label: 'Webinar Type', options: ['Server Training', 'Kitchen Training', 'Management Training'] }
          }
        },
        {
          id: 'thirty_day_survey',
          title: 'Complete 30-Day Survey',
          type: 'input_required',
          required: true,
          fields: {
            surveyDate: { type: 'date', label: 'Survey Date' },
            surveyStatus: { type: 'select', label: 'Survey Status', options: ['Completed', 'Scheduled', 'Not Done'] },
            feedback: { type: 'text', label: 'Survey Feedback', placeholder: 'Key feedback points' }
          }
        }
      ]
    }
  ];

  useEffect(() => {
    if (teamMember && isOpen) {
      setChecklistData(teamMember.checklistData || {});
    }
  }, [teamMember, isOpen]);

  const updateTaskData = (taskId, fieldName, value) => {
    setChecklistData(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [fieldName]: value,
        lastUpdated: new Date().toISOString()
      }
    }));
    setUnsavedChanges(true);
  };

  const toggleTaskCompletion = (taskId) => {
    setChecklistData(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        completed: !prev[taskId]?.completed,
        completedAt: !prev[taskId]?.completed ? new Date().toISOString() : null
      }
    }));
    setUnsavedChanges(true);
  };

  const saveProgress = () => {
    if (onUpdate) {
      // Copy trainerName and employeeId from checklistData if present
      const trainerName = checklistData['assign_trainer']?.trainerName || teamMember.trainerName;
      const employeeId = checklistData['person_number']?.personNumber || teamMember.employeeId;
      onUpdate(teamMember.id, checklistData, { trainerName, employeeId });
    }
    setUnsavedChanges(false);
    console.log('Progress saved:', checklistData);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  };

  const renderTaskField = (task, field, fieldConfig) => {
    const currentValue = checklistData[task.id]?.[field] || '';
    
    switch (fieldConfig.type) {
      case 'text':
        return (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => updateTaskData(task.id, field, e.target.value)}
            placeholder={fieldConfig.placeholder}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={currentValue}
            onChange={(e) => updateTaskData(task.id, field, e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          />
        );
      case 'time':
        return (
          <input
            type="time"
            value={currentValue}
            onChange={(e) => updateTaskData(task.id, field, e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          />
        );
      case 'select':
        return (
          <select
            value={currentValue}
            onChange={(e) => updateTaskData(task.id, field, e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="">Select...</option>
            {fieldConfig.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  const renderTask = (task) => {
    const isCompleted = checklistData[task.id]?.completed || false;
    const hasRequiredFields = task.fields && Object.keys(task.fields).length > 0;

    return (
      <div key={task.id} className={`border rounded-lg p-4 transition-colors duration-200 ${isCompleted ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
        <div className="flex items-start gap-3">
          <button
            onClick={() => toggleTaskCompletion(task.id)}
            className="mt-1 flex-shrink-0"
          >
            {isCompleted ? (
              <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
            ) : (
              <Circle className="text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400" size={20} />
            )}
          </button>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h4 className={`font-medium transition-colors duration-200 ${isCompleted ? 'text-green-800 dark:text-green-200 line-through' : 'text-gray-900 dark:text-white'}`}>
                {task.title}
                {task.required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
              </h4>
              {task.link && (
                <a
                  href={task.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm transition-colors duration-200"
                >
                  <ExternalLink size={14} />
                  {task.linkText}
                </a>
              )}
            </div>

            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-200">{task.description}</p>
            )}

            {hasRequiredFields && (
              <div className="mt-3 space-y-3">
                {Object.entries(task.fields).map(([fieldName, fieldConfig]) => (
                  <div key={fieldName}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
                      {fieldConfig.label}
                      {task.required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
                    </label>
                    {renderTaskField(task, fieldName, fieldConfig)}
                  </div>
                ))}
              </div>
            )}

            {task.id === 'person_number' && checklistData[task.id]?.personNumber && (
              <button
                onClick={() => copyToClipboard(checklistData[task.id].personNumber)}
                className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm transition-colors duration-200"
              >
                <Copy size={14} />
                Copy Person Number
              </button>
            )}

            {task.id === 'hs_welcome_sheet' && (
              <button
                onClick={() => copyToClipboard('https://app.hotschedules.com/login')}
                className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm transition-colors duration-200"
              >
                <Copy size={14} />
                Copy HotSchedules Link
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  const completedTasks = Object.values(checklistData).filter(task => task.completed).length;
  const totalTasks = checklistSteps.reduce((acc, step) => acc + step.tasks.length, 0);
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col transition-colors duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
              Onboarding Checklist - {teamMember?.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
              {completedTasks} of {totalTasks} tasks completed ({completionPercentage}%)
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unsavedChanges && (
              <button
                onClick={saveProgress}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              >
                <Save size={16} />
                Save Progress
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className={`${getProgressColor(completionPercentage)} h-3 rounded-full transition-all duration-300`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {checklistSteps.map(step => (
              <div key={step.step} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
                  className={`w-full p-4 text-left flex items-center justify-between ${step.color} rounded-t-lg`}
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-200">Step {step.step}: {step.title}</h3>
                    <p className="text-sm opacity-80 text-gray-700 dark:text-gray-300 transition-colors duration-200">{step.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">
                      {step.tasks.filter(task => checklistData[task.id]?.completed).length}/{step.tasks.length}
                    </span>
                    {expandedStep === step.step ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                </button>

                {expandedStep === step.step && (
                  <div className="p-4 space-y-4 bg-white dark:bg-gray-800 transition-colors duration-200">
                    {step.tasks.map(renderTask)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {unsavedChanges ? (
                <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 transition-colors duration-200">
                  <AlertCircle size={16} />
                  Unsaved changes
                </span>
              ) : (
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400 transition-colors duration-200">
                  <CheckCircle size={16} />
                  All changes saved
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={saveProgress}
                disabled={!unsavedChanges}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 ${
                  unsavedChanges
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save size={16} />
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistModal;
