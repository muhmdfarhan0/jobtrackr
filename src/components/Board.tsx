import { Search, X } from 'lucide-react'
import { useState, useMemo } from 'react'
import type { Job, JobStatus } from '../types'
import { STATUS_COLUMNS } from '../types'
import Column from './Column'

interface Props {
  jobs: Job[]
  onAddJob: (status: JobStatus) => void
  onJobClick: (job: Job) => void
  onDeleteJob: (id: string) => void
  onMoveJob: (id: string, status: JobStatus) => void
}

export default function Board({ jobs, onAddJob, onJobClick, onDeleteJob, onMoveJob }: Props) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return jobs
    const q = search.toLowerCase()
    return jobs.filter(
      j =>
        j.company.toLowerCase().includes(q) ||
        j.role.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.tags.some(t => t.toLowerCase().includes(q)),
    )
  }, [jobs, search])

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-4 pt-4 pb-3">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search companies, roles, tags…"
            className="w-full pl-9 pr-8 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
        {search && (
          <p className="text-xs text-slate-500 mt-1.5 ml-1">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
          </p>
        )}
      </div>

      {/* Kanban columns */}
      <div className="flex-1 overflow-x-auto px-4 pb-6">
        <div className="flex gap-4 min-w-max">
          {STATUS_COLUMNS.map(col => (
            <Column
              key={col.id}
              status={col.id}
              jobs={filtered.filter(j => j.status === col.id)}
              onAddJob={onAddJob}
              onJobClick={onJobClick}
              onDeleteJob={onDeleteJob}
              onDrop={onMoveJob}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
