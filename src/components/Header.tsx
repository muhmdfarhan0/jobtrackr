import { Sun, Moon, Download, Upload, Plus, BarChart2, Columns3 } from 'lucide-react'
import type { Job } from '../types'

interface Props {
  darkMode: boolean
  onToggleDark: () => void
  onExport: () => void
  onImport: () => void
  onAdd: () => void
  view: 'board' | 'stats'
  onViewChange: (v: 'board' | 'stats') => void
  jobs: Job[]
}

export default function Header({ darkMode, onToggleDark, onExport, onImport, onAdd, view, onViewChange, jobs }: Props) {
  const active = jobs.filter(j => j.status !== 'rejected').length
  const offers = jobs.filter(j => j.status === 'offer').length

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-black border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2">
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight tracking-tight">JobTrackr</h1>
            <p className="text-xs text-slate-400 leading-tight hidden sm:block">
              {active} active · {offers} offer{offers !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex-1" />

        {/* View toggle */}
        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => onViewChange('board')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium cursor-pointer ${
              view === 'board'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-white dark:bg-black text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <Columns3 size={14} />
            <span className="hidden sm:inline">Board</span>
          </button>
          <button
            onClick={() => onViewChange('stats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium cursor-pointer ${
              view === 'stats'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-white dark:bg-black text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <BarChart2 size={14} />
            <span className="hidden sm:inline">Stats</span>
          </button>
        </div>

        <button
          onClick={onImport}
          title="Import CSV"
          className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
        >
          <Upload size={16} />
        </button>
        <button
          onClick={onExport}
          title="Export CSV"
          className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
        >
          <Download size={16} />
        </button>
        <button
          onClick={onToggleDark}
          title="Toggle dark mode"
          className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium px-3 py-2 rounded-lg cursor-pointer ml-1"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Job</span>
        </button>
      </div>
    </header>
  )
}
