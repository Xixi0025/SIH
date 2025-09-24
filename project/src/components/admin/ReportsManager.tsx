import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';

export function ReportsManager() {
  const [dateRange, setDateRange] = useState('semester');
  const [reportType, setReportType] = useState('comprehensive');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTemplates = [
    {
      id: 'naac',
      title: 'NAAC Accreditation Report',
      description: 'Comprehensive report for NAAC accreditation requirements',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      id: 'aicte',
      title: 'AICTE Compliance Report',
      description: 'Student activity report for AICTE submissions',
      icon: BarChart3,
      color: 'bg-green-500'
    },
    {
      id: 'nirf',
      title: 'NIRF Ranking Report',
      description: 'Performance metrics for NIRF ranking process',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      id: 'department',
      title: 'Department Performance',
      description: 'Individual department activity analysis',
      icon: Users,
      color: 'bg-yellow-500'
    }
  ];

  const recentReports = [
    {
      name: 'NAAC Report - Q2 2024',
      type: 'NAAC',
      date: '2024-06-15',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      name: 'Student Activity Summary',
      type: 'Department',
      date: '2024-06-10',
      size: '1.8 MB',
      status: 'completed'
    },
    {
      name: 'AICTE Compliance - May 2024',
      type: 'AICTE',
      date: '2024-05-28',
      size: '3.1 MB',
      status: 'completed'
    }
  ];

  const handleGenerateReport = async (templateId: string) => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    
    // In a real app, this would trigger the actual report generation
    alert(`${templateId.toUpperCase()} report generated successfully!`);
  };

  const quickStats = [
    { title: 'Total Students', value: '2,456', icon: Users },
    { title: 'Activities This Semester', value: '1,234', icon: Award },
    { title: 'Departments', value: '8', icon: BarChart3 },
    { title: 'Faculty Members', value: '245', icon: TrendingUp }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate compliance reports and analytics</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Generate Reports</h2>
          <p className="text-gray-600 mt-1">Choose from predefined report templates</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`${template.color} rounded-lg p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                      <button
                        onClick={() => handleGenerateReport(template.id)}
                        disabled={isGenerating}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            <span>Generate</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Custom Report Builder</h2>
          <p className="text-gray-600 mt-1">Create customized reports with specific filters</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="month">This Month</option>
                <option value="semester">This Semester</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="h-4 w-4 inline mr-1" />
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="comprehensive">Comprehensive</option>
                <option value="academic">Academic Only</option>
                <option value="extracurricular">Extracurricular Only</option>
                <option value="professional">Professional Only</option>
              </select>
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Generate Custom Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
          <p className="text-gray-600 mt-1">Download or view previously generated reports</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-600">{report.type} • {report.size} • {new Date(report.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {report.status}
                  </span>
                  <button className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <FileText className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">PDF Report</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <BarChart3 className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">Excel Data</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <TrendingUp className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">CSV Export</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
            <Users className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">JSON Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}