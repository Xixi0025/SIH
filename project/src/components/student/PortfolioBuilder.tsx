import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Share, 
  Eye, 
  Settings,
  Palette,
  Layout,
  Globe,
  QrCode,
  Copy,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

interface PortfolioBuilderProps {
  onViewPortfolio: () => void;
}

export function PortfolioBuilder({ onViewPortfolio }: PortfolioBuilderProps) {
  const { user } = useAuth();
  const { activities, generatePortfolio } = useData();
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [generatedPortfolio, setGeneratedPortfolio] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const templates = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and simple design',
      preview: 'bg-gray-50 border-2 border-gray-200'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Business-ready layout',
      preview: 'bg-blue-50 border-2 border-blue-200'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Colorful and dynamic',
      preview: 'bg-purple-50 border-2 border-purple-200'
    }
  ];

  const userActivities = activities.filter(activity => 
    activity.studentId === user?.id && activity.status === 'approved'
  );

  const handleGeneratePortfolio = async () => {
    setIsGenerating(true);
    
    // Simulate portfolio generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const portfolio = generatePortfolio(user?.id || '', selectedTemplate);
    setGeneratedPortfolio(portfolio);
    setIsGenerating(false);
  };

  const handleCopyLink = () => {
    if (generatedPortfolio) {
      navigator.clipboard.writeText(generatedPortfolio.shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Builder</h1>
          <p className="text-gray-600">Create a professional showcase of your achievements</p>
        </div>

        {/* Template Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`h-32 rounded-md mb-3 ${template.preview} flex items-center justify-center`}>
                  <Layout className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Portfolio Preview</h2>
            <div className="flex space-x-2">
              <button
                onClick={onViewPortfolio}
                className="flex items-center space-x-2 px-3 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-4 w-4" />
                <span>Customize</span>
              </button>
            </div>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{userActivities.length}</div>
              <div className="text-sm text-blue-800">Verified Activities</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {userActivities.reduce((sum, activity) => sum + activity.points, 0)}
              </div>
              <div className="text-sm text-green-800">Achievement Points</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(userActivities.flatMap(activity => activity.skills)).size}
              </div>
              <div className="text-sm text-purple-800">Skills Demonstrated</div>
            </div>
          </div>

          {/* Sample Content */}
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                <p className="text-gray-600">{user?.department} • {user?.batch}</p>
                <p className="text-blue-600">{user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Recent Achievements</h4>
              {userActivities.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">{activity.title}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{activity.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generation Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Portfolio</h2>
          
          {!generatedPortfolio ? (
            <div className="text-center">
              <button
                onClick={handleGeneratePortfolio}
                disabled={isGenerating}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5" />
                    <span>Generate Portfolio</span>
                  </>
                )}
              </button>
              <p className="text-sm text-gray-600 mt-2">
                This will create a verified digital portfolio with QR authentication
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Portfolio Generated Successfully!</span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">Share Link:</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={generatedPortfolio.shareLink}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <QrCode className="h-4 w-4" />
                  <span>Get QR Code</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}