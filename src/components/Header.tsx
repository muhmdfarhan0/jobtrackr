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
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2">
          <span className="text-2xl">💼</span>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">JobTrackr</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight hidden sm:block">
              {active} active · {offers} offer{offers !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex-1" />

        {/* View toggle */}
        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => onViewChange('board')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              view === 'board'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <Columns3 size={14} />
            <span className="hidden sm:inline">Board</span>
          </button>
          <button
            onClick={() => onViewChange('stats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              view === 'stats'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <BarChart2 size={14} />
            <span className="hidden sm:inline">Stats</span>
          </button>
        </div>

        <button
          onClick={onImport}
          title="Import CSV"
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <Upload size={16} />
        </button>
        <button
          onClick={onExport}
          title="Export CSV"
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <Download size={16} />
        </button>
        <button
          onClick={onToggleDark}
          title="Toggle dark mode"
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-lg cursor-pointer ml-1"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Job</span>
        </button>
      </div>
    </header>
  )
}
