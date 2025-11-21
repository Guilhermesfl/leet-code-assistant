import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

interface WeekData {
  week: number
  title: string
  days: DayData[]
  milestone?: string
}

interface DayData {
  day: number
  focus: string
  theory?: string[]
  problems?: string[]
  theoryLinks?: { label: string; slug: string }[]
  problemIds?: number[]
}

const studyPlanData: WeekData[] = [
  {
    week: 1,
    title: "Arrays, Strings & Hash Maps",
    days: [
      { day: 1, focus: "Theory: Arrays & Strings", theory: ["Arrays and Strings", "List Operations"], theoryLinks: [{ label: "Arrays & Strings", slug: "data-structures/arrays-and-strings" }] },
      { day: 2, focus: "Theory: Hash Maps & Sets", theory: ["Hash Maps and Sets", "Collections Module"], theoryLinks: [{ label: "Hash Maps & Sets", slug: "data-structures/hash-maps-and-sets" }] },
      { day: 3, focus: "Two Pointers Pattern", problems: ["Two Sum", "Valid Palindrome", "Move Zeroes"], problemIds: [1, 37, 20] },
      { day: 4, focus: "Two Pointers (Advanced)", problems: ["Container With Most Water", "3Sum"], problemIds: [35, 22] },
      { day: 5, focus: "Sliding Window", problems: ["Longest Substring Without Repeating", "Best Time to Buy/Sell Stock"], problemIds: [31, 4] },
      { day: 6, focus: "Sliding Window (Advanced)", problems: ["Minimum Window Substring"], problemIds: [114] },
      { day: 7, focus: "Hash Map Mastery", problems: ["Valid Anagram", "Group Anagrams", "Top K Frequent"], problemIds: [2, 43, 44] }
    ]
  },
  {
    week: 2,
    title: "Linked Lists & Stacks/Queues",
    days: [
      { day: 1, focus: "Theory: Linked Lists & Stacks", theory: ["Linked Lists", "Stacks and Queues"], theoryLinks: [{ label: "Linked Lists", slug: "data-structures/linked-lists" }, { label: "Stacks & Queues", slug: "data-structures/stacks-and-queues" }] },
      { day: 2, focus: "Linked List Basics", problems: ["Reverse Linked List", "Merge Two Sorted Lists"], problemIds: [13, 6] },
      { day: 3, focus: "Linked List Patterns", problems: ["Linked List Cycle", "Intersection of Lists"], problemIds: [25, 46] },
      { day: 4, focus: "Advanced Linked Lists", problems: ["Remove Nth Node", "Reorder List"], problemIds: [60, 124] },
      { day: 5, focus: "More Linked Lists", problems: ["Add Two Numbers", "Copy List with Random Pointer"], problemIds: [59, 123] },
      { day: 6, focus: "Stacks & Queues", problems: ["Valid Parentheses", "Min Stack"], problemIds: [5, 26] },
      { day: 7, focus: "Stack Patterns", problems: ["Daily Temperatures", "Largest Rectangle"], problemIds: [66, 149] }
    ]
  },
  {
    week: 3,
    title: "Binary Trees & BST",
    days: [
      { day: 1, focus: "Theory: Trees & BST", theory: ["Binary Trees", "Tree Traversals"], theoryLinks: [{ label: "Binary Trees & BST", slug: "data-structures/binary-trees-and-bst" }] },
      { day: 2, focus: "Tree Basics", problems: ["Invert Tree", "Maximum Depth", "Same Tree"], problemIds: [7, 8, 28] },
      { day: 3, focus: "Tree Traversals", problems: ["Symmetric Tree", "Level Order Traversal"], problemIds: [15, 70] },
      { day: 4, focus: "BST Operations", problems: ["Validate BST", "Kth Smallest in BST"], problemIds: [72, 73] },
      { day: 5, focus: "Tree Properties", problems: ["Lowest Common Ancestor", "Diameter"], problemIds: [74, 30] },
      { day: 6, focus: "Advanced Trees I", problems: ["Construct Tree from Traversals", "Path Sum"], problemIds: [78, 29] },
      { day: 7, focus: "Advanced Trees II", problems: ["Serialize/Deserialize", "Max Path Sum"], problemIds: [132, 133] }
    ]
  },
  {
    week: 4,
    title: "Recursion & DP Intro",
    days: [
      { day: 1, focus: "Theory: Recursion & DP", theory: ["Common Patterns", "Dynamic Programming"], theoryLinks: [{ label: "Dynamic Programming", slug: "algorithm-patterns/dynamic-programming" }] },
      { day: 2, focus: "Classic Recursion", problems: ["Climbing Stairs", "Generate Parentheses"], problemIds: [14, 91] },
      { day: 3, focus: "More Recursion", problems: ["Letter Combinations", "Permutations"], problemIds: [91, 88] },
      { day: 4, focus: "1D DP Basics", problems: ["House Robber", "Coin Change"], problemIds: [96, 95] },
      { day: 5, focus: "1D DP Advanced", problems: ["Longest Increasing Subsequence", "Word Break"], problemIds: [98, 93] },
      { day: 6, focus: "2D DP Introduction", problems: ["Unique Paths", "Minimum Path Sum"], problemIds: [63, 64] },
      { day: 7, focus: "Milestone 1 Checkpoint", problems: ["Review & Assessment"], milestone: "MILESTONE 1" }
    ],
    milestone: "Complete Milestone 1 Assessment"
  },
  {
    week: 5,
    title: "Graphs & BFS/DFS",
    days: [
      { day: 1, focus: "Theory: Graphs", theory: ["Graph Representations", "BFS/DFS"], theoryLinks: [{ label: "Graphs", slug: "data-structures/graphs" }, { label: "Graph Traversal", slug: "algorithm-patterns/graph-traversal" }] },
      { day: 2, focus: "Graph Basics & BFS", problems: ["Number of Islands", "Clone Graph"], problemIds: [80, 81] },
      { day: 3, focus: "More BFS", problems: ["Rotting Oranges", "Course Schedule"], problemIds: [142, 83] },
      { day: 4, focus: "DFS & Backtracking", problems: ["Course Schedule II", "Word Search"], problemIds: [84, 87] },
      { day: 5, focus: "Advanced Backtracking", problems: ["N-Queens", "Subsets"], problemIds: [87, 89] },
      { day: 6, focus: "Union Find", problems: ["Connected Components", "Graph Valid Tree"], problemIds: [85, 86] },
      { day: 7, focus: "Advanced Graphs", problems: ["Pacific Atlantic", "Alien Dictionary"], problemIds: [82, 144] }
    ]
  },
  {
    week: 6,
    title: "Heaps & Advanced Trees",
    days: [
      { day: 1, focus: "Theory: Heaps & Tries", theory: ["Heaps", "Tries"], theoryLinks: [{ label: "Heaps", slug: "data-structures/heaps-and-priority-queues" }, { label: "Tries", slug: "data-structures/tries" }] },
      { day: 2, focus: "Heap Basics", problems: ["Kth Largest", "Top K Frequent"], problemIds: [45, 44] },
      { day: 3, focus: "Advanced Heaps", problems: ["Merge K Sorted Lists", "Find Median"], problemIds: [125, 110] },
      { day: 4, focus: "Tries Basics", problems: ["Implement Trie", "Design Add/Search"], problemIds: [107, 108] },
      { day: 5, focus: "Advanced Tries", problems: ["Word Search II"], problemIds: [109] },
      { day: 6, focus: "Segment Trees (Optional)", problems: ["Range Sum Query"], problemIds: [58] },
      { day: 7, focus: "Review & Practice", problems: ["Mixed Review"] }
    ]
  },
  {
    week: 7,
    title: "Advanced Dynamic Programming",
    days: [
      { day: 1, focus: "Theory Review: DP Patterns", theory: ["Knapsack", "Palindromes", "String Matching"] },
      { day: 2, focus: "2D DP Mastery", problems: ["Edit Distance", "Interleaving String"], problemIds: [101, 101] },
      { day: 3, focus: "More 2D DP", problems: ["Distinct Subsequences", "Regular Expression"], problemIds: [101, 101] },
      { day: 4, focus: "Knapsack Variations", problems: ["Partition Equal Subset", "Target Sum"], problemIds: [99, 99] },
      { day: 5, focus: "More Knapsack", problems: ["Coin Change 2"], problemIds: [95] },
      { day: 6, focus: "Advanced DP I", problems: ["Longest Palindromic Subseq", "Palindrome Partitioning II"], problemIds: [32, 92] },
      { day: 7, focus: "Advanced DP II", problems: ["Burst Balloons", "Dungeon Game"], problemIds: [101, 101] }
    ]
  },
  {
    week: 8,
    title: "Binary Search & Greedy",
    days: [
      { day: 1, focus: "Theory: Binary Search & Greedy", theory: ["Binary Search Variants", "Greedy"], theoryLinks: [{ label: "Binary Search", slug: "algorithm-patterns/binary-search" }, { label: "Greedy", slug: "algorithm-patterns/greedy" }] },
      { day: 2, focus: "Binary Search Basics", problems: ["Binary Search", "First Bad Version"], problemIds: [12, 38] },
      { day: 3, focus: "Advanced Binary Search", problems: ["Search Rotated Array", "Find Min Rotated"], problemIds: [39, 40] },
      { day: 4, focus: "Greedy Basics", problems: ["Jump Game", "Jump Game II"], problemIds: [62, 104] },
      { day: 5, focus: "Greedy Patterns", problems: ["Gas Station", "Task Scheduler"], problemIds: [62, 112] },
      { day: 6, focus: "Intervals", problems: ["Merge Intervals", "Insert Interval"], problemIds: [48, 49] },
      { day: 7, focus: "Milestone 2 Checkpoint", problems: ["Assessment"], milestone: "MILESTONE 2" }
    ],
    milestone: "Complete Milestone 2 Assessment"
  },
  {
    week: 9,
    title: "Hard Problems & Optimization",
    days: [
      { day: 1, focus: "Hard DP", problems: ["Edit Distance", "Word Break II"], problemIds: [101, 93] },
      { day: 2, focus: "More Hard DP", problems: ["Distinct Subsequences"], problemIds: [101] },
      { day: 3, focus: "Hard Trees", problems: ["Max Path Sum", "Serialize Tree"], problemIds: [133, 132] },
      { day: 4, focus: "More Hard Trees", problems: ["Binary Tree Cameras"], problemIds: [133] },
      { day: 5, focus: "Hard Arrays", problems: ["First Missing Positive", "Median Two Arrays"], problemIds: [105, 105] },
      { day: 6, focus: "Hard Strings", problems: ["Minimum Window Substring"], problemIds: [114] },
      { day: 7, focus: "Mixed Hard Practice", problems: ["Your Choice"] }
    ]
  },
  {
    week: 10,
    title: "Mock Interviews & Pattern Review",
    days: [
      { day: 1, focus: "Mock Interview 1", problems: ["Timed: 1 Medium"] },
      { day: 2, focus: "Mock Interview 2", problems: ["Timed: 2 Easy"] },
      { day: 3, focus: "Mock Interview 3", problems: ["Timed: 1 Medium or Hard"] },
      { day: 4, focus: "Pattern Review: Arrays/Strings", problems: ["Weak areas"] },
      { day: 5, focus: "Pattern Review: Trees/Graphs", problems: ["Weak areas"] },
      { day: 6, focus: "Pattern Review: DP", problems: ["Weak areas"] },
      { day: 7, focus: "Rest & Light Review", problems: [] }
    ]
  },
  {
    week: 11,
    title: "Company-Specific Prep",
    days: [
      { day: 1, focus: "Research Target Companies", theory: ["Glassdoor", "Blind", "LeetCode Discuss"] },
      { day: 2, focus: "Company-Tagged Problems 1", problems: ["Google/Meta tagged"] },
      { day: 3, focus: "Company-Tagged Problems 2", problems: ["Amazon/Microsoft tagged"] },
      { day: 4, focus: "Company-Tagged Problems 3", problems: ["Apple/Netflix tagged"] },
      { day: 5, focus: "Behavioral Prep", theory: ["STAR Stories", "Project Deep-dives"] },
      { day: 6, focus: "System Design Basics", theory: ["Scalability", "Caching", "Databases"] },
      { day: 7, focus: "Mock with Friend/Mentor", problems: ["Full interview simulation"] }
    ]
  },
  {
    week: 12,
    title: "Final Sprint & Interview Readiness",
    days: [
      { day: 1, focus: "Daily Mock Interview", problems: ["Timed: Easy + Medium"] },
      { day: 2, focus: "Daily Mock Interview", problems: ["Timed: Medium + Hard"] },
      { day: 3, focus: "Daily Mock Interview", problems: ["Timed: Full 60min session"] },
      { day: 4, focus: "Problem Sprint", problems: ["5-7 problems daily"] },
      { day: 5, focus: "Speed & Accuracy", problems: ["Focus on timing"] },
      { day: 6, focus: "Rest Day", theory: ["Light review", "Prepare logistics"] },
      { day: 7, focus: "Final Milestone", problems: ["Final Assessment"], milestone: "FINAL" }
    ],
    milestone: "Final Milestone - Interview Ready!"
  }
]

const STORAGE_KEY = 'study-plan-progress-v1'
const START_DATE_KEY = 'study-plan-start-date'

export default function StudyPlan() {
  const [startDate, setStartDate] = useState<string>('')
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set())
  const [guidelinesOpen, setGuidelinesOpen] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setCompletedDays(new Set(JSON.parse(saved)))
    
    const savedDate = localStorage.getItem(START_DATE_KEY)
    if (savedDate) {
      setStartDate(savedDate)
    } else {
      // Set today as default
      const today = new Date().toISOString().split('T')[0]
      setStartDate(today)
      localStorage.setItem(START_DATE_KEY, today)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedDays)))
  }, [completedDays])

  const setStudyStartDate = (date: string) => {
    setStartDate(date)
    localStorage.setItem(START_DATE_KEY, date)
  }

  const toggleDay = (week: number, day: number) => {
    const key = `${week}-${day}`
    const next = new Set(completedDays)
    next.has(key) ? next.delete(key) : next.add(key)
    setCompletedDays(next)
  }

  const calculateStats = () => {
    const totalDays = studyPlanData.reduce((acc, week) => acc + week.days.length, 0)
    const completed = completedDays.size
    const percentage = Math.round((completed / totalDays) * 100)
    
    let daysElapsed = 0
    let daysRemaining = 84 // 12 weeks
    
    if (startDate) {
      const start = new Date(startDate)
      const today = new Date()
      daysElapsed = Math.max(0, Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
      daysRemaining = Math.max(0, 84 - daysElapsed)
    }
    
    const hoursPerDay = 3.5
    const totalHours = Math.round(daysElapsed * hoursPerDay)
    const remainingHours = Math.round(daysRemaining * hoursPerDay)
    
    return { totalDays, completed, percentage, daysElapsed, daysRemaining, totalHours, remainingHours }
  }

  const stats = calculateStats()

  const getExpectedDay = () => {
    if (!startDate) return null
    const start = new Date(startDate)
    const today = new Date()
    const daysSinceStart = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return Math.min(daysSinceStart + 1, 84)
  }

  const expectedDay = getExpectedDay()

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">12-Week FAANG Study Plan</h1>
          <p className="text-gray-600">Structured roadmap to interview readiness with theory, practice, and milestones</p>
        </div>

        {/* Study Plan Guidelines */}
        <div className="mb-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 overflow-hidden">
          <button
            onClick={() => setGuidelinesOpen(!guidelinesOpen)}
            className="w-full p-5 flex items-center justify-between hover:bg-blue-100 transition-colors"
          >
            <h3 className="font-semibold text-blue-900">Study Plan Guidelines</h3>
            <svg
              className={`w-5 h-5 text-blue-900 transition-transform ${guidelinesOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {guidelinesOpen && (
            <div className="px-5 pb-5">
              <ul className="text-sm text-blue-700 leading-relaxed space-y-1">
                <li>• <strong>Daily Commitment:</strong> 3-4 hours (2 hours minimum weekdays, 4+ hours weekends)</li>
                <li>• <strong>Theory Days:</strong> Read documentation thoroughly, take notes, understand core concepts</li>
                <li>• <strong>Practice Days:</strong> Solve problems without looking at solutions first, then review optimal approaches</li>
                <li>• <strong>Milestones:</strong> Complete assessment problems under time pressure to validate your progress</li>
                <li>• <strong>Flexibility:</strong> Adjust pace as needed, but maintain consistency</li>
              </ul>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-900">{stats.percentage}%</div>
            <div className="text-sm text-green-700">Overall Progress</div>
            <div className="text-xs text-green-600 mt-1">{stats.completed} / {stats.totalDays} days</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-900">{stats.daysElapsed}</div>
            <div className="text-sm text-blue-700">Days Elapsed</div>
            <div className="text-xs text-blue-600 mt-1">{stats.totalHours} hours invested</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-900">{stats.daysRemaining}</div>
            <div className="text-sm text-purple-700">Days Remaining</div>
            <div className="text-xs text-purple-600 mt-1">{stats.remainingHours} hours to go</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-900">Day {expectedDay || '?'}</div>
            <div className="text-sm text-orange-700">Expected Progress</div>
            <div className="text-xs text-orange-600 mt-1">
              {startDate ? new Date(startDate).toLocaleDateString() : 'Set start date'}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Study Plan Progress</span>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-600">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStudyStartDate(e.target.value)}
                className="text-xs px-2 py-1 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-5 mb-8">
          <h3 className="font-semibold text-indigo-900 mb-3">Quick Navigation</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/progress" className="px-3 py-1 bg-white text-indigo-700 rounded border border-indigo-200 hover:bg-indigo-50 text-sm">
              📊 Progress Tracker
            </Link>
            <Link href="/category/data-structures" className="px-3 py-1 bg-white text-gray-700 rounded border border-gray-200 hover:bg-gray-50 text-sm">
              📚 Documentation
            </Link>
          </div>
        </div>

        {/* Weekly Timeline */}
        <div className="space-y-6">
          {studyPlanData.map((week) => {
            const weekCompleted = week.days.filter(d => completedDays.has(`${week.week}-${d.day}`)).length
            const weekPercent = Math.round((weekCompleted / week.days.length) * 100)
            
            return (
              <div key={week.week} className="border border-gray-200 rounded-lg bg-white shadow-sm">
                {/* Week Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Week {week.week}: {week.title}</h2>
                      {week.milestone && (
                        <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                          🎯 {week.milestone}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-700">{weekCompleted}/{week.days.length} days</div>
                      <div className="text-xs text-gray-500">{weekPercent}%</div>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${weekPercent}%` }}
                    />
                  </div>
                </div>

                {/* Days Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {week.days.map((day) => {
                      const dayKey = `${week.week}-${day.day}`
                      const isCompleted = completedDays.has(dayKey)
                      
                      return (
                        <div
                          key={dayKey}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isCompleted
                              ? 'bg-green-50 border-green-500 shadow-sm'
                              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-gray-500">Day {day.day}</span>
                              </div>
                              <div className="font-semibold text-sm text-gray-900 mb-2">{day.focus}</div>
                            </div>
                            <button
                              onClick={() => toggleDay(week.week, day.day)}
                              className="ml-2"
                            >
                              {isCompleted ? (
                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                </svg>
                              )}
                            </button>
                          </div>

                          {/* Theory Links */}
                          {day.theoryLinks && day.theoryLinks.length > 0 && (
                            <div className="mb-2">
                              <div className="text-xs text-gray-500 mb-1">📚 Theory:</div>
                              {day.theoryLinks.map((link, idx) => (
                                <Link
                                  key={idx}
                                  href={`/categories/${link.slug}`}
                                  className="block text-xs text-purple-600 hover:text-purple-800 hover:underline"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          )}

                          {/* Theory Text */}
                          {day.theory && !day.theoryLinks && (
                            <div className="mb-2">
                              <div className="text-xs text-gray-500 mb-1">📖 Read:</div>
                              {day.theory.map((item, idx) => (
                                <div key={idx} className="text-xs text-gray-700">{item}</div>
                              ))}
                            </div>
                          )}

                          {/* Problems */}
                          {day.problems && day.problems.length > 0 && (
                            <div>
                              <div className="text-xs text-gray-500 mb-1">💻 Practice:</div>
                              {day.problems.map((problem, idx) => (
                                <div key={idx} className="text-xs text-gray-700">
                                  {day.problemIds && day.problemIds[idx] ? (
                                    <Link
                                      href="/problem-tracker"
                                      className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                      #{day.problemIds[idx]}: {problem}
                                    </Link>
                                  ) : (
                                    problem
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
