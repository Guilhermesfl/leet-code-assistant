import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Tooltip } from 'react-tooltip'

interface PrepItem {
  id: string
  label: string
  category: string
  description?: string
  slug?: string
}

const prepItems: PrepItem[] = [
  // Core Data Structures
  { id: 'ds-arrays', label: 'Arrays & Strings', category: 'Core Data Structures', description: 'Know common manipulations, slicing, frequency counting.', slug: 'data-structures/arrays-and-strings' },
  { id: 'ds-linkedlists', label: 'Linked Lists', category: 'Core Data Structures', description: 'Reverse, detect cycle, merge, pointer patterns.', slug: 'data-structures/linked-lists' },
  { id: 'ds-stacks-queues', label: 'Stacks & Queues', category: 'Core Data Structures', description: 'Use cases, monotonic stack, BFS queue usage.', slug: 'data-structures/stacks-and-queues' },
  { id: 'ds-trees', label: 'Trees & BST', category: 'Core Data Structures', description: 'Traversals (DFS/BFS), properties, reconstruction.', slug: 'data-structures/binary-trees-and-bst' },
  { id: 'ds-graphs', label: 'Graphs', category: 'Core Data Structures', description: 'Representations, BFS/DFS, topological sort.', slug: 'data-structures/graphs' },
  { id: 'ds-heaps', label: 'Heaps / Priority Queues', category: 'Core Data Structures', description: 'K problems, streaming, custom comparators.', slug: 'data-structures/heaps-and-priority-queues' },
  { id: 'ds-tries', label: 'Tries', category: 'Core Data Structures', description: 'Prefix operations, word search, autocomplete.', slug: 'data-structures/tries' },
  { id: 'ds-hash', label: 'Hash Maps / Sets', category: 'Core Data Structures', description: 'Counting, caching, two-sum style patterns.', slug: 'data-structures/hash-maps-and-sets' },

  // Algorithmic Patterns
  { id: 'alg-two-pointers', label: 'Two Pointers', category: 'Algorithm Patterns', description: 'Converging, sliding, partitioning variations.' },
  { id: 'alg-sliding-window', label: 'Sliding Window', category: 'Algorithm Patterns', description: 'Fixed vs expanding window, optimize with counts.' },
  { id: 'alg-binary-search', label: 'Binary Search Variants', category: 'Algorithm Patterns', description: 'Lower/upper bound, rotated arrays, on answer space.' },
  { id: 'alg-backtracking', label: 'Backtracking', category: 'Algorithm Patterns', description: 'Permutations, combinations, pruning strategies.' },
  { id: 'alg-dp', label: 'Dynamic Programming', category: 'Algorithm Patterns', description: '1D, 2D, subsequences, state compression.' },
  { id: 'alg-graph-traversal', label: 'Graph Traversal & Topo', category: 'Algorithm Patterns', description: 'Cycle detection, ordering, connectivity.' },
  { id: 'alg-greedy', label: 'Greedy Techniques', category: 'Algorithm Patterns', description: 'Intervals, scheduling, local optimal proofs.' },
  { id: 'alg-intervals', label: 'Interval Patterns', category: 'Algorithm Patterns', description: 'Merge, insert, choose non-overlapping.' },
  { id: 'alg-math-bits', label: 'Math & Bit Ops', category: 'Algorithm Patterns', description: 'Bit masking, parity, power checks.' },

  // System Design
  { id: 'sd-scalability', label: 'Scalability & Load', category: 'System Design', description: 'Horizontal vs vertical scaling, throughput vs latency.' },
  { id: 'sd-caching', label: 'Caching Strategies', category: 'System Design', description: 'Eviction policies, layers, consistency.' },
  { id: 'sd-databases', label: 'Database Modeling', category: 'System Design', description: 'Normalization, indexing, query patterns.' },
  { id: 'sd-sharding', label: 'Sharding & Replication', category: 'System Design', description: 'Leader/follower, partition keys, failover.' },
  { id: 'sd-messaging', label: 'Messaging & Queues', category: 'System Design', description: 'Pub/Sub vs queues, ordering, retries.' },
  { id: 'sd-consistency', label: 'Consistency & CAP', category: 'System Design', description: 'Trade-offs, eventual consistency, partition tolerance.' },
  { id: 'sd-availability', label: 'Fault Tolerance', category: 'System Design', description: 'Redundancy, circuit breakers, graceful degradation.' },
  { id: 'sd-observability', label: 'Observability', category: 'System Design', description: 'Metrics, tracing, structured logs.' },

  // Behavioral
  { id: 'beh-star', label: 'STAR Stories Prepared', category: 'Behavioral', description: '5+ concise stories: conflict, leadership, failure.' },
  { id: 'beh-strengths', label: 'Strengths & Weaknesses', category: 'Behavioral', description: 'Authentic, growth-oriented framing.' },
  { id: 'beh-team', label: 'Team Collaboration Example', category: 'Behavioral', description: 'Cross-functional cooperation, communication clarity.' },
  { id: 'beh-ownership', label: 'Ownership Example', category: 'Behavioral', description: 'Initiative, impact metrics, follow-through.' },
  { id: 'beh-failure', label: 'Failure & Learning', category: 'Behavioral', description: 'Resilience, actionable lessons.' },
  { id: 'beh-why-company', label: 'Why Company Answer', category: 'Behavioral', description: 'Tailored to mission, recent product insights.' },
  { id: 'beh-questions', label: 'Good Questions Prepared', category: 'Behavioral', description: 'Role clarity, team culture, success metrics.' },

  // Logistics
  { id: 'log-resume', label: 'Resume Polished', category: 'Logistics', description: 'Impact bullets, metrics, consistent formatting.' },
  { id: 'log-linkedin', label: 'LinkedIn Updated', category: 'Logistics', description: 'Aligned with resume, headline + summary.' },
  { id: 'log-github', label: 'GitHub Repos Clean', category: 'Logistics', description: 'Pinned projects, descriptive READMEs.' },
  { id: 'log-env', label: 'Dev Environment Ready', category: 'Logistics', description: 'Templates, snippets, testing utilities.' },
  { id: 'log-mock', label: 'Mock Interviews Done', category: 'Logistics', description: 'At least 3 technical + 2 behavioral.' },
  { id: 'log-schedule', label: 'Interview Scheduling Strategy', category: 'Logistics', description: 'Batching, buffer days, warm-ups.' },
  { id: 'log-rest', label: 'Sleep & Rest Plan', category: 'Logistics', description: 'Routine for peak cognitive performance.' },
]

const STORAGE_KEY = 'interview-prep-checklist-v1'

export default function InterviewPrep() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setChecked(new Set(JSON.parse(saved)))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)))
  }, [checked])

  const categories = prepItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, PrepItem[]>)

  const total = prepItems.length
  const done = checked.size
  const percent = Math.round((done / total) * 100)

  const toggleItem = (id: string) => {
    const next = new Set(checked)
    next.has(id) ? next.delete(id) : next.add(id)
    setChecked(next)
  }

  const toggleCategory = (cat: string) => {
    setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  const markCategory = (cat: string, value: boolean) => {
    const items = categories[cat]
    const next = new Set(checked)
    items.forEach(i => {
      if (value) next.add(i.id); else next.delete(i.id)
    })
    setChecked(next)
  }

  const resetAll = () => {
    if (confirm('Reset all interview prep progress?')) setChecked(new Set())
  }

  return (
    <section className="mt-16" aria-labelledby="interview-prep-heading">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 id="interview-prep-heading" className="text-2xl font-bold">Theory Tracker</h2>
          <p className="text-gray-600 text-sm">Track your understanding of core concepts, patterns, and design principles</p>
        </div>
        <button onClick={resetAll} className="text-xs px-3 py-1 rounded bg-red-50 text-red-600 border border-red-200 hover:bg-red-100">Reset All</button>
      </div>
      {/* Overall progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
          <span>Overall Readiness</span>
          <span>{percent}%</span>
        </div>
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 transition-all duration-500" style={{ width: `${percent}%` }} />
        </div>
        <div className="mt-2 text-xs text-gray-500">{done} / {total} items completed</div>
      </div>
      {/* Categories */}
      <div className="space-y-4">
        {Object.entries(categories).map(([cat, items]) => {
          const catDone = items.filter(i => checked.has(i.id)).length
          const catPercent = Math.round((catDone / items.length) * 100)
          const isOpen = expanded[cat] ?? true
          return (
            <div key={cat} className="border border-gray-200 rounded-lg bg-white shadow-sm">
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-900">{cat}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{catDone}/{items.length}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-blue-500" style={{ width: `${catPercent}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-10 text-right">{catPercent}%</span>
                  <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {isOpen && (
                <div className="border-t border-gray-200 px-4 py-3">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={() => markCategory(cat, true)} className="text-xs px-2 py-1 rounded bg-green-50 text-green-600 border border-green-200 hover:bg-green-100">Mark All</button>
                    <button onClick={() => markCategory(cat, false)} className="text-xs px-2 py-1 rounded bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100">Unmark All</button>
                  </div>
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map(item => (
                      <li key={item.id}>
                        <div className={`flex items-start gap-3 p-3 rounded-lg border text-sm transition-all ${checked.has(item.id) ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'} ${item.slug ? 'hover:border-blue-400 hover:shadow-md' : ''}`}>
                          <input
                            type="checkbox"
                            checked={checked.has(item.id)}
                            onChange={() => toggleItem(item.id)}
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
                              {item.description && <span className="text-xs text-gray-600 leading-snug block">{item.description}</span>}
                            </Link>
                          ) : (
                            <div
                              className="flex-1 cursor-not-allowed opacity-60"
                              data-tooltip-id="content-soon"
                              data-tooltip-content="Content coming soon"
                            >
                              <span className="font-medium text-gray-900 block mb-0.5">{item.label}</span>
                              {item.description && <span className="text-xs text-gray-600 leading-snug block">{item.description}</span>}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {/* Guidance box */}
      <div className="mt-10 p-5 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
        <h3 className="font-semibold text-indigo-900 mb-2">How to Use</h3>
        <p className="text-sm text-indigo-700 leading-relaxed">Treat this as a holistic readiness checklist. Aim for &gt;80% before scheduling on-sites. Each item should be backed by at least one concrete example or recent practice session. Revisit categories where confidence drops after mocks.</p>
      </div>
      {/* Shared tooltip for non-linked cards */}
      <Tooltip id="content-soon" place="top" />
    </section>
  )
}
