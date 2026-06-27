import { ExternalLink, Trash2, MapPin, DollarSign, Calendar, Tag } from 'lucide-react'
import type { Job } from '../types'
import { PRIORITY_COLORS } from '../types'

interface Props {
  job: Job
  onClick: () => void
  onDelete: () => void
}

function relativeDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

export default function JobCard({ job, onClick, onDelete }: Props) {
  return (
    <div
      onClick={onClick}
      className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 dark:text-white text-sm leading-snug truncate">{job.company}</p>
          <p className="text-slate-600 dark:text-slate-300 text-xs mt-0.5 truncate">{job.role}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="p-1 text-slate-400 hover:text-blue-500 rounded cursor-pointer"
            >
              <ExternalLink size={13} />
            </a>
          )}
          <button
            onClick={e => { e.stopPropagation(); onDelete() }}
            className="p-1 text-slate-300 hover:text-red-500 rounded opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <div className="space-y-1 mb-3">
        {job.location && (
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <MapPin size={11} />
            <span className="truncate">{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <DollarSign size={11} />
            <span className="truncate">{job.salary}</span>
          </div>
        )}
        {job.dateApplied && (
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Calendar size={11} />
            <span>Applied {relativeDate(job.dateApplied)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${PRIORITY_COLORS[job.priority]}`}>
          {job.priority}
        </span>
        {job.tags.slice(0, 2).map(tag => (
          <span
            key={tag}
            className="flex items-center gap-0.5 text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded-full"
          >
            <Tag size={8} />
            {tag}
          </span>
        ))}
        {job.tags.length > 2 && (
          <span className="text-[10px] text-slate-400">+{job.tags.length - 2}</span>
        )}
      </div>

      {job.notes && (
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">
          {job.notes}
        </p>
      )}
    </div>
  )
}
