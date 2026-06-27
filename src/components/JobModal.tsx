import { useEffect, useState, useRef } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import type { Job, JobStatus } from '../types'
import { STATUS_COLUMNS, PRIORITY_BADGE } from '../types'

interface Props {
  job?: Job | null
  defaultStatus?: JobStatus
  onSave: (data: Omit<Job, 'id' | 'dateAdded'>) => void
  onClose: () => void
  onDelete?: () => void
}

const empty = (status: JobStatus = 'applied'): Omit<Job, 'id' | 'dateAdded'> => ({
  company: '',
  role: '',
  location: '',
  salary: '',
  status,
  url: '',
  notes: '',
  dateApplied: new Date().toISOString().slice(0, 10),
  priority: 'medium',
  tags: [],
})

export default function JobModal({ job, defaultStatus, onSave, onClose, onDelete }: Props) {
  const [form, setForm] = useState<Omit<Job, 'id' | 'dateAdded'>>(() =>
    job
      ? { ...job, dateApplied: job.dateApplied ? job.dateApplied.slice(0, 10) : '' }
      : empty(defaultStatus),
  )
  const [tagInput, setTagInput] = useState('')
  const firstRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    firstRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm(prev => ({ ...prev, [k]: v }))

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t])
    setTagInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.company.trim() || !form.role.trim()) return
    onSave({
      ...form,
      dateApplied: form.dateApplied ? new Date(form.dateApplied).toISOString() : '',
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {job ? 'Edit Job' : 'Add Job'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Company <span className="text-slate-900 dark:text-white">*</span>
              </label>
              <input
                ref={firstRef}
                value={form.company}
                onChange={e => set('company', e.target.value)}
                required
                className="input"
                placeholder="Google, Meta, Startup..."
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Role <span className="text-slate-900 dark:text-white">*</span>
              </label>
              <input
                value={form.role}
                onChange={e => set('role', e.target.value)}
                required
                className="input"
                placeholder="Software Engineer..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Location</label>
              <input
                value={form.location}
                onChange={e => set('location', e.target.value)}
                className="input"
                placeholder="Remote, NYC..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Salary</label>
              <input
                value={form.salary}
                onChange={e => set('salary', e.target.value)}
                className="input"
                placeholder="$100k – $130k"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Status</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value as JobStatus)}
                className="input"
              >
                {STATUS_COLUMNS.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={e => set('priority', e.target.value as Job['priority'])}
                className="input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Date Applied</label>
              <input
                type="date"
                value={form.dateApplied}
                onChange={e => set('dateApplied', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Job URL</label>
              <input
                type="url"
                value={form.url}
                onChange={e => set('url', e.target.value)}
                className="input"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Tags</label>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                className="input flex-1"
                placeholder="React, Remote, Startup... (Enter to add)"
              />
              <button type="button" onClick={addTag} className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer">
                <Plus size={14} />
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tags.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => set('tags', form.tags.filter(t => t !== tag))}
                      className="hover:text-slate-900 dark:hover:text-white cursor-pointer"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              rows={3}
              className="input resize-none"
              placeholder="Recruiter contact, interview feedback, next steps..."
            />
          </div>

          {/* Priority preview */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Priority:</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_BADGE[form.priority]}`}>
              {form.priority}
            </span>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800">
          {onDelete ? (
            <button
              type="button"
              onClick={() => { onDelete(); onClose() }}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <Trash2 size={14} /> Delete
            </button>
          ) : <div />}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-lg cursor-pointer"
            >
              {job ? 'Save Changes' : 'Add Job'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
