import React, { useState } from 'react';
import { Clock, Pill, Check, Pause, X, TrendingUp, CheckCircle2, XCircle, MinusCircle, Bell, User, Settings, Menu, BarChart3 } from 'lucide-react';

export default function HistoryTracker() {
  const [activeTab, setActiveTab] = useState('today');
  const [medications, setMedications] = useState([
    { id: 1, name: 'Lisinopril', dose: '10mg', time: '08:00', status: 'pending' },
    { id: 2, name: 'Lisinopril', dose: '10mg', time: '08:00', status: 'pending' },
    { id: 3, name: 'Lisinopril', dose: '10mg', time: '08:00', status: 'pending' },
  ]);

  const [historyData] = useState({
    compliance: 'Compliant',
    complianceRate: 56,
    taken: 4,
    missed: 2,
    totalMissed: 3,
    missedDoses: [
      { id: 1, name: 'Lisinopril', date: 'Aug 1', time: '10:30AM' }
    ]
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setMedications(meds =>
      meds.map(med =>
        med.id === id ? { ...med, status: newStatus } : med
      )
    );
  };

  const renderToday = () => (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
      </div>

      <div className="space-y-3">
        {medications.map(med => (
          <div key={med.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                  <Pill className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{med.name}</h3>
                  <p className="text-sm text-gray-500">{med.dose} • {med.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(med.id, 'taken')}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    med.status === 'taken'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-500'
                  }`}
                  aria-label="Mark as taken"
                >
                  <Check className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleStatusChange(med.id, 'paused')}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    med.status === 'paused'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-400 hover:bg-orange-50 hover:text-orange-500'
                  }`}
                  aria-label="Pause"
                >
                  <Pause className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleStatusChange(med.id, 'skipped')}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    med.status === 'skipped'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                  }`}
                  aria-label="Skip"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-800">History</h2>
      </div>

      {/* Compliance Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-semibold text-gray-900">Compliance</h3>
              <p className="text-sm text-gray-500">{historyData.compliance}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{historyData.complianceRate}%</div>
            <p className="text-xs text-gray-500">Average</p>
          </div>
        </div>
      </div>

      {/* Taken Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <div>
            <h3 className="font-semibold text-gray-900">Taken</h3>
            <p className="text-2xl font-bold text-gray-900">{historyData.taken}</p>
          </div>
        </div>
      </div>

      {/* Missed Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3">
        <div className="flex items-center gap-3">
          <XCircle className="w-5 h-5 text-orange-500" />
          <div>
            <h3 className="font-semibold text-gray-900">Missed</h3>
            <p className="text-2xl font-bold text-gray-900">{historyData.missed}</p>
          </div>
        </div>
      </div>

      {/* Total Missed Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-3">
          <MinusCircle className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="font-semibold text-gray-900">Missed</h3>
            <p className="text-2xl font-bold text-gray-900">{historyData.totalMissed}</p>
          </div>
        </div>
      </div>

      {/* Missed Doses List */}
      <div className="space-y-3">
        {historyData.missedDoses.map(dose => (
          <div key={dose.id} className="bg-red-50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Pill className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{dose.name}</h4>
                <p className="text-sm text-gray-600">Missed</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{dose.date}</p>
              <p className="text-sm text-gray-600">{dose.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-8">
        <BarChart3 className="w-5 h-5 text-gray-800" />
        <h2 className="text-lg font-semibold text-gray-800">Analytics</h2>
      </div>

      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-8">
          <BarChart3 className="w-8 h-8 text-gray-400" />
        </div>

        <div className="text-center mb-2">
          <div className="text-6xl font-bold text-gray-900 mb-2">{historyData.complianceRate}%</div>
          <p className="text-base font-medium text-gray-900 mb-1">Overall Compliance Rate</p>
        </div>

        <p className="text-sm text-gray-600 text-center max-w-xs">
          Based on 9 medication doses<br />in the selected period
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-white to-red-50 min-h-screen">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white">
        <span className="text-sm font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-gray-800 rounded"></div>
            <div className="w-0.5 h-3 bg-gray-800 rounded"></div>
            <div className="w-0.5 h-3 bg-gray-800 rounded"></div>
            <div className="w-0.5 h-3 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>

      {/* Header with icons - only show on Analytics */}
      {activeTab === 'analytics' && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <Menu className="w-6 h-6 text-gray-700" />
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-gray-700" />
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <Settings className="w-6 h-6 text-red-500" />
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'today'
              ? 'text-red-600'
              : 'text-gray-400'
          }`}
        >
          Today
          {activeTab === 'today' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'history'
              ? 'text-red-600'
              : 'text-gray-400'
          }`}
        >
          History
          {activeTab === 'history' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'analytics'
              ? 'text-red-600'
              : 'text-gray-400'
          }`}
        >
          Analytics
          {activeTab === 'analytics' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="pb-6">
        {activeTab === 'today' && renderToday()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
}