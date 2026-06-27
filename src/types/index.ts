export type JobStatus =
  | 'wishlist'
  | 'applied'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'rejected'

export interface Job {
  id: string
  company: string
  role: string
  location: string
  salary: string
  status: JobStatus
  url: string
  notes: string
  dateAdded: string
  dateApplied: string
  priority: 'low' | 'medium' | 'high'
  tags: string[]
}

export const STATUS_COLUMNS: { id: JobStatus; label: string }[] = [
  { id: 'wishlist',  label: 'Wishlist'  },
  { id: 'applied',   label: 'Applied'   },
  { id: 'screening', label: 'Screening' },
  { id: 'interview', label: 'Interview' },
  { id: 'offer',     label: 'Offer'     },
  { id: 'rejected',  label: 'Rejected'  },
]

export const PRIORITY_BADGE = {
  low:    'bg-white border border-slate-300 text-slate-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-400',
  medium: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  high:   'bg-slate-900 text-white dark:bg-white dark:text-slate-900',
}
