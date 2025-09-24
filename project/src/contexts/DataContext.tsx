import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Activity {
  id: string;
  studentId: string;
  title: string;
  category: 'academic' | 'extracurricular' | 'professional';
  description: string;
  date: string;
  duration: string;
  skills: string[];
  proofUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewDate?: string;
  reviewComments?: string;
  points: number;
}

export interface Portfolio {
  id: string;
  studentId: string;
  template: 'minimal' | 'professional' | 'creative';
  isPublic: boolean;
  shareLink: string;
  lastGenerated: string;
}

interface DataContextType {
  activities: Activity[];
  portfolios: Portfolio[];
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  updateActivity: (id: string, updates: Partial<Activity>) => void;
  generatePortfolio: (studentId: string, template: string) => Portfolio;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockActivities: Activity[] = [
  {
    id: '1',
    studentId: '1',
    title: 'React.js Certification',
    category: 'academic',
    description: 'Completed comprehensive React.js course with hands-on projects',
    date: '2024-01-15',
    duration: '40 hours',
    skills: ['React', 'JavaScript', 'Web Development'],
    status: 'approved',
    reviewedBy: 'Dr. Sarah Wilson',
    reviewDate: '2024-01-17',
    reviewComments: 'Excellent certification from a reputable platform.',
    points: 50
  },
  {
    id: '2',
    studentId: '1',
    title: 'Hackathon Winner',
    category: 'extracurricular',
    description: 'Won first place in university-wide hackathon with innovative healthcare app',
    date: '2024-02-20',
    duration: '48 hours',
    skills: ['Problem Solving', 'Team Leadership', 'Mobile Development'],
    status: 'approved',
    reviewedBy: 'Dr. Sarah Wilson',
    reviewDate: '2024-02-22',
    reviewComments: 'Outstanding achievement demonstrating technical and leadership skills.',
    points: 100
  },
  {
    id: '3',
    studentId: '1',
    title: 'Software Engineering Internship',
    category: 'professional',
    description: 'Full-stack development internship at TechCorp Solutions',
    date: '2024-06-01',
    duration: '12 weeks',
    skills: ['Full-Stack Development', 'Database Design', 'Agile Methodology'],
    status: 'pending',
    points: 75
  }
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  const addActivity = (activityData: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setActivities(prev => [...prev, newActivity]);
  };

  const updateActivity = (id: string, updates: Partial<Activity>) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id ? { ...activity, ...updates } : activity
    ));
  };

  const generatePortfolio = (studentId: string, template: string): Portfolio => {
    const portfolio: Portfolio = {
      id: Math.random().toString(36).substr(2, 9),
      studentId,
      template: template as 'minimal' | 'professional' | 'creative',
      isPublic: true,
      shareLink: `https://portfolio.university.edu/${Math.random().toString(36).substr(2, 9)}`,
      lastGenerated: new Date().toISOString()
    };
    
    setPortfolios(prev => [...prev, portfolio]);
    return portfolio;
  };

  return (
    <DataContext.Provider value={{
      activities,
      portfolios,
      addActivity,
      updateActivity,
      generatePortfolio
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}