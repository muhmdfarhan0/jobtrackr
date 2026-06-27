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

export const STATUS_COLUMNS: { id: JobStatus; label: string; color: string; bg: string; darkBg: string }[] = [
  { id: 'wishlist',  label: 'Wishlist',  color: 'text-slate-600',  bg: 'bg-slate-100',   darkBg: 'dark:bg-slate-800' },
  { id: 'applied',   label: 'Applied',   color: 'text-blue-600',   bg: 'bg-blue-50',     darkBg: 'dark:bg-blue-950/40' },
  { id: 'screening', label: 'Screening', color: 'text-yellow-600', bg: 'bg-yellow-50',   darkBg: 'dark:bg-yellow-950/40' },
  { id: 'interview', label: 'Interview', color: 'text-purple-600', bg: 'bg-purple-50',   darkBg: 'dark:bg-purple-950/40' },
  { id: 'offer',     label: 'Offer 🎉',  color: 'text-green-600',  bg: 'bg-green-50',    darkBg: 'dark:bg-green-950/40' },
  { id: 'rejected',  label: 'Rejected',  color: 'text-red-500',    bg: 'bg-red-50',      darkBg: 'dark:bg-red-950/40' },
]

export const PRIORITY_COLORS = {
  low:    'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  medium: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  high:   'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}
