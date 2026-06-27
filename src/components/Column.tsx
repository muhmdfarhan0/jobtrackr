import { Plus } from 'lucide-react'
import type { Job, JobStatus } from '../types'
import { STATUS_COLUMNS } from '../types'
import JobCard from './JobCard'

interface Props {
  status: JobStatus
  jobs: Job[]
  onAddJob: (status: JobStatus) => void
  onJobClick: (job: Job) => void
  onDeleteJob: (id: string) => void
  onDrop: (jobId: string, targetStatus: JobStatus) => void
}

export default function Column({ status, jobs, onAddJob, onJobClick, onDeleteJob, onDrop }: Props) {
  const col = STATUS_COLUMNS.find(c => c.id === status)!

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const jobId = e.dataTransfer.getData('jobId')
    if (jobId) onDrop(jobId, status)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex flex-col min-w-[260px] max-w-[300px] flex-1"
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-2 rounded-t-xl bg-slate-100 dark:bg-slate-900 border border-b-0 border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{col.label}</span>
          <span className="text-xs bg-white dark:bg-black text-slate-500 dark:text-slate-400 rounded-full px-2 py-0.5 font-medium border border-slate-200 dark:border-slate-700">
            {jobs.length}
          </span>
        </div>
        <button
          onClick={() => onAddJob(status)}
          className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-pointer"
          title={`Add job to ${col.label}`}
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1 border border-slate-200 dark:border-slate-800 rounded-b-xl overflow-hidden">
        <div className="p-2 space-y-2 min-h-[120px] bg-slate-50 dark:bg-slate-950 h-full">
          {jobs.map(job => (
            <div
              key={job.id}
              draggable
              onDragStart={e => e.dataTransfer.setData('jobId', job.id)}
              className="cursor-grab active:cursor-grabbing"
            >
              <JobCard
                job={job}
                onClick={() => onJobClick(job)}
                onDelete={() => onDeleteJob(job.id)}
              />
            </div>
          ))}
          {jobs.length === 0 && (
            <div className="flex items-center justify-center h-20 text-xs text-slate-300 dark:text-slate-700">
              Drop cards here
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
