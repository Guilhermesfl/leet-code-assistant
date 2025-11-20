import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

interface Problem {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  section: string
}

const problems: Problem[] = [
  // Problems 1-30: Building Foundations
  { id: 1, title: "Two Sum", difficulty: "Easy", section: "Building Foundations" },
  { id: 2, title: "Valid Anagram", difficulty: "Easy", section: "Building Foundations" },
  { id: 3, title: "Contains Duplicate", difficulty: "Easy", section: "Building Foundations" },
  { id: 4, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", section: "Building Foundations" },
  { id: 5, title: "Valid Parentheses", difficulty: "Easy", section: "Building Foundations" },
  { id: 6, title: "Merge Two Sorted Lists", difficulty: "Easy", section: "Building Foundations" },
  { id: 7, title: "Invert Binary Tree", difficulty: "Easy", section: "Building Foundations" },
  { id: 8, title: "Maximum Depth of Binary Tree", difficulty: "Easy", section: "Building Foundations" },
  { id: 9, title: "Palindrome Number", difficulty: "Easy", section: "Building Foundations" },
  { id: 10, title: "Remove Duplicates from Sorted Array", difficulty: "Easy", section: "Building Foundations" },
  { id: 11, title: "Maximum Subarray", difficulty: "Easy", section: "Building Foundations" },
  { id: 12, title: "Binary Search", difficulty: "Easy", section: "Building Foundations" },
  { id: 13, title: "Reverse Linked List", difficulty: "Easy", section: "Building Foundations" },
  { id: 14, title: "Climbing Stairs", difficulty: "Easy", section: "Building Foundations" },
  { id: 15, title: "Symmetric Tree", difficulty: "Easy", section: "Building Foundations" },
  { id: 16, title: "Sqrt(x)", difficulty: "Easy", section: "Building Foundations" },
  { id: 17, title: "Single Number", difficulty: "Easy", section: "Building Foundations" },
  { id: 18, title: "Intersection of Two Arrays II", difficulty: "Easy", section: "Building Foundations" },
  { id: 19, title: "Plus One", difficulty: "Easy", section: "Building Foundations" },
  { id: 20, title: "Move Zeroes", difficulty: "Easy", section: "Building Foundations" },
  { id: 21, title: "Product of Array Except Self", difficulty: "Medium", section: "Building Foundations" },
  { id: 22, title: "3Sum", difficulty: "Medium", section: "Building Foundations" },
  { id: 23, title: "Majority Element", difficulty: "Easy", section: "Building Foundations" },
  { id: 24, title: "Happy Number", difficulty: "Easy", section: "Building Foundations" },
  { id: 25, title: "Linked List Cycle", difficulty: "Easy", section: "Building Foundations" },
  { id: 26, title: "Min Stack", difficulty: "Easy", section: "Building Foundations" },
  { id: 27, title: "Valid Sudoku", difficulty: "Medium", section: "Building Foundations" },
  { id: 28, title: "Same Tree", difficulty: "Easy", section: "Building Foundations" },
  { id: 29, title: "Path Sum", difficulty: "Easy", section: "Building Foundations" },
  { id: 30, title: "Diameter of Binary Tree", difficulty: "Easy", section: "Building Foundations" },
  
  // Problems 31-60: Expanding Techniques
  { id: 31, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 32, title: "Longest Palindromic Substring", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 33, title: "Merge Sorted Array", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 34, title: "Pascal's Triangle", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 35, title: "Container With Most Water", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 36, title: "3Sum Closest", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 37, title: "Valid Palindrome", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 38, title: "First Bad Version", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 39, title: "Search in Rotated Sorted Array", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 40, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 41, title: "Power of Two", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 42, title: "Power of Three", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 43, title: "Group Anagrams", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 44, title: "Top K Frequent Elements", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 45, title: "Kth Largest Element in an Array", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 46, title: "Intersection of Two Linked Lists", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 47, title: "Sort Colors", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 48, title: "Merge Intervals", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 49, title: "Insert Interval", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 50, title: "Spiral Matrix", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 51, title: "Set Matrix Zeroes", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 52, title: "Missing Number", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 53, title: "Find Peak Element", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 54, title: "Search a 2D Matrix", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 55, title: "Number of 1 Bits", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 56, title: "Reverse Bits", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 57, title: "Counting Bits", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 58, title: "Range Sum Query - Immutable", difficulty: "Easy", section: "Expanding Techniques" },
  { id: 59, title: "Add Two Numbers", difficulty: "Medium", section: "Expanding Techniques" },
  { id: 60, title: "Remove Nth Node From End of List", difficulty: "Medium", section: "Expanding Techniques" },
  
  // Problems 61-90: Intermediate Patterns
  { id: 61, title: "Rotate Image", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 62, title: "Jump Game", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 63, title: "Unique Paths", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 64, title: "Minimum Path Sum", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 65, title: "Maximum Product of Three Numbers", difficulty: "Easy", section: "Intermediate Patterns" },
  { id: 66, title: "Daily Temperatures", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 67, title: "Evaluate Reverse Polish Notation", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 68, title: "Implement Queue using Stacks", difficulty: "Easy", section: "Intermediate Patterns" },
  { id: 69, title: "Implement Stack using Queues", difficulty: "Easy", section: "Intermediate Patterns" },
  { id: 70, title: "Binary Tree Level Order Traversal", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 71, title: "Binary Tree Zigzag Level Order Traversal", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 72, title: "Validate Binary Search Tree", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 73, title: "Kth Smallest Element in a BST", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 74, title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 75, title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 76, title: "Binary Tree Right Side View", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 77, title: "Count Good Nodes in Binary Tree", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 78, title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 79, title: "Subtree of Another Tree", difficulty: "Easy", section: "Intermediate Patterns" },
  { id: 80, title: "Number of Islands", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 81, title: "Clone Graph", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 82, title: "Pacific Atlantic Water Flow", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 83, title: "Course Schedule", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 84, title: "Course Schedule II", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 85, title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 86, title: "Graph Valid Tree", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 87, title: "Word Search", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 88, title: "Permutations", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 89, title: "Subsets", difficulty: "Medium", section: "Intermediate Patterns" },
  { id: 90, title: "Combination Sum", difficulty: "Medium", section: "Intermediate Patterns" },
  
  // Problems 91-120: Advanced Challenges
  { id: 91, title: "Letter Combinations of a Phone Number", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 92, title: "Palindrome Partitioning", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 93, title: "Word Break", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 94, title: "Decode Ways", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 95, title: "Coin Change", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 96, title: "House Robber", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 97, title: "House Robber II", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 98, title: "Longest Increasing Subsequence", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 99, title: "Partition Equal Subset Sum", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 100, title: "Longest Common Subsequence", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 101, title: "Edit Distance", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 102, title: "Maximum Product Subarray", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 103, title: "Unique Paths II", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 104, title: "Jump Game II", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 105, title: "Isomorphic Strings", difficulty: "Easy", section: "Advanced Challenges" },
  { id: 106, title: "Word Pattern", difficulty: "Easy", section: "Advanced Challenges" },
  { id: 107, title: "Implement Trie (Prefix Tree)", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 108, title: "Design Add and Search Words Data Structure", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 109, title: "Word Search II", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 110, title: "Find Median from Data Stream", difficulty: "Hard", section: "Advanced Challenges" },
  { id: 111, title: "Kth Largest Element in a Stream", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 112, title: "Task Scheduler", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 113, title: "Longest Repeating Character Replacement", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 114, title: "Minimum Window Substring", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 115, title: "Sliding Window Maximum", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 116, title: "Maximum Sliding Window", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 117, title: "Find All Anagrams in a String", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 118, title: "Permutation in String", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 119, title: "Encode and Decode Strings", difficulty: "Medium", section: "Advanced Challenges" },
  { id: 120, title: "Design HashSet", difficulty: "Medium", section: "Advanced Challenges" },
  
  // Problems 121-150: Expert Level
  { id: 121, title: "Design HashMap", difficulty: "Medium", section: "Expert Level" },
  { id: 122, title: "LRU Cache", difficulty: "Medium", section: "Expert Level" },
  { id: 123, title: "Copy List with Random Pointer", difficulty: "Medium", section: "Expert Level" },
  { id: 124, title: "Reorder List", difficulty: "Medium", section: "Expert Level" },
  { id: 125, title: "Merge k Sorted Lists", difficulty: "Hard", section: "Expert Level" },
  { id: 126, title: "Reverse Nodes in k-Group", difficulty: "Hard", section: "Expert Level" },
  { id: 127, title: "Rotate List", difficulty: "Medium", section: "Expert Level" },
  { id: 128, title: "Swap Nodes in Pairs", difficulty: "Medium", section: "Expert Level" },
  { id: 129, title: "Odd Even Linked List", difficulty: "Medium", section: "Expert Level" },
  { id: 130, title: "Design Linked List", difficulty: "Medium", section: "Expert Level" },
  { id: 131, title: "Maximum Binary Tree", difficulty: "Medium", section: "Expert Level" },
  { id: 132, title: "Serialize and Deserialize Binary Tree", difficulty: "Medium", section: "Expert Level" },
  { id: 133, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", section: "Expert Level" },
  { id: 134, title: "Binary Search Tree Iterator", difficulty: "Medium", section: "Expert Level" },
  { id: 135, title: "Flatten Binary Tree to Linked List", difficulty: "Medium", section: "Expert Level" },
  { id: 136, title: "Populating Next Right Pointers in Each Node", difficulty: "Medium", section: "Expert Level" },
  { id: 137, title: "Sum Root to Leaf Numbers", difficulty: "Medium", section: "Expert Level" },
  { id: 138, title: "Path Sum II", difficulty: "Medium", section: "Expert Level" },
  { id: 139, title: "Path Sum III", difficulty: "Medium", section: "Expert Level" },
  { id: 140, title: "All Nodes Distance K in Binary Tree", difficulty: "Medium", section: "Expert Level" },
  { id: 141, title: "Surrounded Regions", difficulty: "Medium", section: "Expert Level" },
  { id: 142, title: "Rotting Oranges", difficulty: "Medium", section: "Expert Level" },
  { id: 143, title: "Walls and Gates", difficulty: "Medium", section: "Expert Level" },
  { id: 144, title: "Alien Dictionary", difficulty: "Medium", section: "Expert Level" },
  { id: 145, title: "Longest Consecutive Sequence", difficulty: "Hard", section: "Expert Level" },
  { id: 146, title: "Meeting Rooms II", difficulty: "Medium", section: "Expert Level" },
  { id: 147, title: "Non-overlapping Intervals", difficulty: "Medium", section: "Expert Level" },
  { id: 148, title: "Trapping Rain Water", difficulty: "Hard", section: "Expert Level" },
  { id: 149, title: "Largest Rectangle in Histogram", difficulty: "Hard", section: "Expert Level" },
  { id: 150, title: "Word Ladder", difficulty: "Hard", section: "Expert Level" },
]


export default function ProgressTracker() {
  const [completed, setCompleted] = useState<Set<number>>(new Set([1, 2, 3, 4, 5]))
  const [completionDates, setCompletionDates] = useState<Record<number, string>>({})
  const [filter, setFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('leetcode-progress')
    if (saved) {
      setCompleted(new Set(JSON.parse(saved)))
    }
    const savedDates = localStorage.getItem('leetcode-progress-dates')
    if (savedDates) {
      setCompletionDates(JSON.parse(savedDates))
    }
  }, [])

  // Save to localStorage whenever completed changes
  useEffect(() => {
    localStorage.setItem('leetcode-progress', JSON.stringify(Array.from(completed)))
  }, [completed])

  // Save completion dates
  useEffect(() => {
    localStorage.setItem('leetcode-progress-dates', JSON.stringify(completionDates))
  }, [completionDates])

  const toggleProblem = (id: number) => {
    const newCompleted = new Set(completed)
    const newDates = { ...completionDates }
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
      delete newDates[id]
    } else {
      newCompleted.add(id)
      newDates[id] = new Date().toLocaleDateString()
    }
    setCompleted(newCompleted)
    setCompletionDates(newDates)
  }

  const filteredProblems = filter === 'all' ? problems : problems.filter(p => p.difficulty === filter)
  const stats = {
    total: problems.length,
    completed: completed.size,
    easy: problems.filter(p => p.difficulty === 'Easy' && completed.has(p.id)).length,
    medium: problems.filter(p => p.difficulty === 'Medium' && completed.has(p.id)).length,
    hard: problems.filter(p => p.difficulty === 'Hard' && completed.has(p.id)).length,
  }

  const percentage = Math.round((stats.completed / stats.total) * 100)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 border-green-200'
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200'
      default: return ''
    }
  }

  // Group problems by section
  const sections = problems.reduce((acc, problem) => {
    if (!acc[problem.section]) acc[problem.section] = []
    acc[problem.section].push(problem)
    return acc
  }, {} as Record<string, Problem[]>)

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">LeetCode Progress Tracker</h1>
          <p className="text-gray-600">Track your journey through 150 curated problems</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-900">{stats.completed}/{stats.total}</div>
            <div className="text-sm text-blue-700">Total Progress</div>
            <div className="text-xs text-blue-600 mt-1">{percentage}%</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-900">{stats.easy}</div>
            <div className="text-sm text-green-700">Easy</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-900">{stats.medium}</div>
            <div className="text-sm text-orange-700">Medium</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-900">{stats.hard}</div>
            <div className="text-sm text-red-700">Hard</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-900">{stats.total - stats.completed}</div>
            <div className="text-sm text-purple-700">Remaining</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-medium text-gray-700">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('Easy')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'Easy' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => setFilter('Medium')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'Medium' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilter('Hard')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'Hard' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hard
          </button>
        </div>

        {/* Problems List by Section */}
        {Object.entries(sections).map(([sectionName, sectionProblems]) => {
          const sectionCompleted = sectionProblems.filter(p => completed.has(p.id)).length
          const sectionFiltered = filter === 'all' ? sectionProblems : sectionProblems.filter(p => p.difficulty === filter)
          
          if (sectionFiltered.length === 0) return null

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
                      completed.has(problem.id)
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
                        {completed.has(problem.id) && completionDates[problem.id] && (
                          <div className="text-xs text-blue-700 mt-1">Completed: {completionDates[problem.id]}</div>
                        )}
                      </div>
                      <div className="ml-2">
                        {completed.has(problem.id) ? (
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
          )
        })}
        {/* Interview Preparation moved to its own page */}
      </div>
    </Layout>
  )
}
