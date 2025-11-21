import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import Layout from '../components/Layout';
import TabNavigation from '../components/progress/TabNavigation';
import ProgressBar from '../components/progress/ProgressBar';
import StatsCard from '../components/progress/StatsCard';
import { problems } from '../lib/data/problemsData';
import { theoryItems } from '../lib/data/theoryData';
import { TabType, Problem, TheoryItem } from '../types/progress';

export default function Progress() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Problems state
  const [completedProblems, setCompletedProblems] = useState<Set<number>>(new Set());
  const [completionDates, setCompletionDates] = useState<Record<number, string>>({});
  const [problemFilter, setProblemFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  
  // Theory state
  const [checkedTheory, setCheckedTheory] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProblems = localStorage.getItem('leetcode-progress');
      if (savedProblems) {
        setCompletedProblems(new Set(JSON.parse(savedProblems)));
      }
      
      const savedDates = localStorage.getItem('leetcode-progress-dates');
      if (savedDates) {
        setCompletionDates(JSON.parse(savedDates));
      }
      
      const savedTheory = localStorage.getItem('interview-prep-checklist-v1');
      if (savedTheory) {
        setCheckedTheory(new Set(JSON.parse(savedTheory)));
      }
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save problems to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('leetcode-progress', JSON.stringify(Array.from(completedProblems)));
    }
  }, [completedProblems, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('leetcode-progress-dates', JSON.stringify(completionDates));
    }
  }, [completionDates, isLoading]);

  // Save theory to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('interview-prep-checklist-v1', JSON.stringify(Array.from(checkedTheory)));
    }
  }, [checkedTheory, isLoading]);

  // Sync tab with URL query param
  useEffect(() => {
    const tabParam = router.query.tab as TabType;
    if (tabParam && ['overview', 'problems', 'theory'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [router.query.tab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.push(`/progress?tab=${tab}`, undefined, { shallow: true });
  };

  // Problem handlers
  const toggleProblem = (id: number) => {
    const newCompleted = new Set(completedProblems);
    const newDates = { ...completionDates };
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
      delete newDates[id];
    } else {
      newCompleted.add(id);
      newDates[id] = new Date().toLocaleDateString();
    }
    setCompletedProblems(newCompleted);
    setCompletionDates(newDates);
  };

  // Theory handlers
  const toggleTheoryItem = (id: string) => {
    const next = new Set(checkedTheory);
    next.has(id) ? next.delete(id) : next.add(id);
    setCheckedTheory(next);
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const markCategory = (cat: string, value: boolean) => {
    const items = theoryCategories[cat];
    const next = new Set(checkedTheory);
    items.forEach(i => {
      if (value) next.add(i.id); else next.delete(i.id);
    });
    setCheckedTheory(next);
  };

  const resetAllTheory = () => {
    if (confirm('Reset all interview prep progress?')) {
      setCheckedTheory(new Set());
    }
  };

  // Calculate stats
  const problemStats = {
    total: problems.length,
    completed: completedProblems.size,
    easy: problems.filter(p => p.difficulty === 'Easy' && completedProblems.has(p.id)).length,
    medium: problems.filter(p => p.difficulty === 'Medium' && completedProblems.has(p.id)).length,
    hard: problems.filter(p => p.difficulty === 'Hard' && completedProblems.has(p.id)).length,
  };

  const theoryStats = {
    total: theoryItems.length,
    completed: checkedTheory.size,
  };

  const problemPercentage = Math.round((problemStats.completed / problemStats.total) * 100);
  const theoryPercentage = Math.round((theoryStats.completed / theoryStats.total) * 100);

  // Group problems by section
  const problemSections = problems.reduce((acc, problem) => {
    if (!acc[problem.section]) acc[problem.section] = [];
    acc[problem.section].push(problem);
    return acc;
  }, {} as Record<string, Problem[]>);

  // Group theory by category
  const theoryCategories = theoryItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, TheoryItem[]>);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return '';
    }
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: '📊' },
    { id: 'problems' as TabType, label: 'Problems', icon: '💻' },
    { id: 'theory' as TabType, label: 'Theory', icon: '📚' },
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Progress Tracker</h1>
          <p className="text-gray-600">Track your progress through coding problems and theory concepts</p>
        </div>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Overall Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problems Overview */}
              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">💻 Coding Problems</h2>
                  <button
                    onClick={() => handleTabChange('problems')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Details →
                  </button>
                </div>
                <div className="mb-4">
                  <ProgressBar 
                    percentage={problemPercentage} 
                    colorFrom="blue-500" 
                    colorTo="purple-600"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{problemStats.easy}</div>
                    <div className="text-xs text-gray-600">Easy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{problemStats.medium}</div>
                    <div className="text-xs text-gray-600">Medium</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{problemStats.hard}</div>
                    <div className="text-xs text-gray-600">Hard</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <span className="text-sm text-gray-600">
                    {problemStats.completed} of {problemStats.total} completed
                  </span>
                </div>
              </div>

              {/* Theory Overview */}
              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">📚 Theory & Concepts</h2>
                  <button
                    onClick={() => handleTabChange('theory')}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    View Details →
                  </button>
                </div>
                <div className="mb-4">
                  <ProgressBar 
                    percentage={theoryPercentage} 
                    colorFrom="green-500" 
                    colorTo="purple-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(theoryCategories).slice(0, 4).map(([cat, items]) => {
                    const catDone = items.filter(i => checkedTheory.has(i.id)).length;
                    return (
                      <div key={cat} className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          {catDone}/{items.length}
                        </div>
                        <div className="text-xs text-gray-600">{cat}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <span className="text-sm text-gray-600">
                    {theoryStats.completed} of {theoryStats.total} completed
                  </span>
                </div>
              </div>
            </div>

            {/* Combined Stats */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4">Overall Readiness</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard
                  value={`${problemStats.completed + theoryStats.completed}`}
                  label="Total Completed"
                  sublabel={`of ${problemStats.total + theoryStats.total} items`}
                  color="indigo"
                />
                <StatsCard
                  value={`${problemPercentage}%`}
                  label="Problems"
                  sublabel={`${problemStats.completed}/${problemStats.total}`}
                  color="blue"
                />
                <StatsCard
                  value={`${theoryPercentage}%`}
                  label="Theory"
                  sublabel={`${theoryStats.completed}/${theoryStats.total}`}
                  color="purple"
                />
                <StatsCard
                  value={`${Math.round(((problemStats.completed + theoryStats.completed) / (problemStats.total + theoryStats.total)) * 100)}%`}
                  label="Combined"
                  sublabel="Overall Progress"
                  color="green"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleTabChange('problems')}
                  className="flex items-center justify-between p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Continue Problems</div>
                    <div className="text-sm text-gray-600">
                      {problemStats.total - problemStats.completed} remaining
                    </div>
                  </div>
                  <span className="text-2xl">💻</span>
                </button>
                <button
                  onClick={() => handleTabChange('theory')}
                  className="flex items-center justify-between p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:shadow-md transition-all"
                >
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Review Theory</div>
                    <div className="text-sm text-gray-600">
                      {theoryStats.total - theoryStats.completed} remaining
                    </div>
                  </div>
                  <span className="text-2xl">📚</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Problems Tab */}
        {activeTab === 'problems' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <StatsCard
                value={`${problemStats.completed}/${problemStats.total}`}
                label="Total Progress"
                sublabel={`${problemPercentage}%`}
                color="blue"
              />
              <StatsCard value={problemStats.easy} label="Easy" color="green" />
              <StatsCard value={problemStats.medium} label="Medium" color="orange" />
              <StatsCard value={problemStats.hard} label="Hard" color="red" />
              <StatsCard value={problemStats.total - problemStats.completed} label="Remaining" color="purple" />
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <ProgressBar 
                percentage={problemPercentage} 
                label="Overall Progress"
                colorFrom="blue-500" 
                colorTo="purple-600"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setProblemFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  problemFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setProblemFilter('Easy')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  problemFilter === 'Easy' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => setProblemFilter('Medium')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  problemFilter === 'Medium' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setProblemFilter('Hard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  problemFilter === 'Hard' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Hard
              </button>
            </div>

            {/* Problems List by Section */}
            {Object.entries(problemSections).map(([sectionName, sectionProblems]) => {
              const sectionCompleted = sectionProblems.filter(p => completedProblems.has(p.id)).length;
              const sectionFiltered = problemFilter === 'all' ? sectionProblems : sectionProblems.filter(p => p.difficulty === problemFilter);
              
              if (sectionFiltered.length === 0) return null;

              return (
                <div key={sectionName} className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{sectionName}</h2>
                    <span className="text-sm text-gray-600">
                      {sectionCompleted}/{sectionProblems.length} completed
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sectionFiltered.map((problem) => (
                      <button
                        key={problem.id}
                        onClick={() => toggleProblem(problem.id)}
                        className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          completedProblems.has(problem.id)
                            ? 'bg-blue-50 border-blue-500 shadow-sm'
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-gray-500">#{problem.id}</span>
                              <span className={`text-xs px-2 py-0.5 rounded border font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                              </span>
                            </div>
                            <div className="font-medium text-gray-900">{problem.title}</div>
                            {completedProblems.has(problem.id) && completionDates[problem.id] && (
                              <div className="text-xs text-blue-700 mt-1">Completed: {completionDates[problem.id]}</div>
                            )}
                          </div>
                          <div className="ml-2">
                            {completedProblems.has(problem.id) ? (
                              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Theory Tracker</h2>
                <p className="text-gray-600 text-sm">Track your understanding of core concepts, patterns, and design principles</p>
              </div>
              <button 
                onClick={resetAllTheory} 
                className="text-xs px-3 py-1 rounded bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
              >
                Reset All
              </button>
            </div>

            {/* Overall Progress */}
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
                <span>Overall Readiness</span>
                <span>{theoryPercentage}%</span>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 transition-all duration-500" 
                  style={{ width: `${theoryPercentage}%` }} 
                />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {theoryStats.completed} / {theoryStats.total} items completed
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              {Object.entries(theoryCategories).map(([cat, items]) => {
                const catDone = items.filter(i => checkedTheory.has(i.id)).length;
                const catPercent = Math.round((catDone / items.length) * 100);
                const isOpen = expandedCategories[cat] ?? true;
                return (
                  <div key={cat} className="border border-gray-200 rounded-lg bg-white shadow-sm">
                    <button
                      onClick={() => toggleCategory(cat)}
                      className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-gray-900">{cat}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {catDone}/{items.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-2 bg-blue-500" style={{ width: `${catPercent}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-10 text-right">{catPercent}%</span>
                        <svg 
                          className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="border-t border-gray-200 px-4 py-3">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <button 
                            onClick={() => markCategory(cat, true)} 
                            className="text-xs px-2 py-1 rounded bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                          >
                            Mark All
                          </button>
                          <button 
                            onClick={() => markCategory(cat, false)} 
                            className="text-xs px-2 py-1 rounded bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100"
                          >
                            Unmark All
                          </button>
                        </div>
                        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {items.map(item => (
                            <li key={item.id}>
                              <div className={`flex items-start gap-3 p-3 rounded-lg border text-sm transition-all ${
                                checkedTheory.has(item.id) ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'
                              } ${item.slug ? 'hover:border-blue-400 hover:shadow-md' : ''}`}>
                                <input
                                  type="checkbox"
                                  checked={checkedTheory.has(item.id)}
                                  onChange={() => toggleTheoryItem(item.id)}
                                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                />
                                {item.slug ? (
                                  <Link
                                    href={`/categories/${item.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 cursor-pointer group"
                                    aria-label={`View ${item.label} documentation`}
                                  >
                                    <span className="flex items-center gap-1.5 font-medium text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors">
                                      <span className="text-base">📖</span>
                                      <span>{item.label}</span>
                                    </span>
                                    {item.description && (
                                      <span className="text-xs text-gray-600 leading-snug block">{item.description}</span>
                                    )}
                                  </Link>
                                ) : (
                                  <div
                                    className="flex-1 cursor-not-allowed opacity-60"
                                    data-tooltip-id="content-soon"
                                    data-tooltip-content="Content coming soon"
                                  >
                                    <span className="font-medium text-gray-900 block mb-0.5">{item.label}</span>
                                    {item.description && (
                                      <span className="text-xs text-gray-600 leading-snug block">{item.description}</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Guidance Box */}
            <div className="mt-10 p-5 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
              <h3 className="font-semibold text-indigo-900 mb-2">How to Use</h3>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Treat this as a holistic readiness checklist. Aim for &gt;80% before scheduling on-sites. 
                Each item should be backed by at least one concrete example or recent practice session. 
                Revisit categories where confidence drops after mocks.
              </p>
            </div>

            {/* Tooltip */}
            <Tooltip id="content-soon" place="top" />
          </div>
        )}
      </div>
    </Layout>
  );
}
