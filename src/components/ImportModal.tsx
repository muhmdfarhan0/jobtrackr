import { useState, useRef } from 'react'
import { X, Upload, FileText } from 'lucide-react'

interface Props {
  onImport: (text: string) => number
  onClose: () => void
}

export default function ImportModal({ onImport, onClose }: Props) {
  const [text, setText] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setText(ev.target?.result as string)
    reader.readAsText(file)
  }

  const handleImport = () => {
    const count = onImport(text)
    setResult(count)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Import CSV</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {result !== null ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                Imported {result} job{result !== 1 ? 's' : ''}
              </p>
              <button onClick={onClose} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                Done
              </button>
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Import jobs from a CSV file. The expected columns are:
                </p>
                <code className="block text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-slate-600 dark:text-slate-400 overflow-x-auto">
                  Company, Role, Location, Salary, Status, Priority, Date Applied, URL, Tags, Notes
                </code>
              </div>

              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer text-slate-500 dark:text-slate-400"
              >
                <Upload size={24} />
                <span className="text-sm">Click to choose a CSV file</span>
              </button>
              <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} className="hidden" />

              {text && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <FileText size={14} />
                  File loaded — {text.split('\n').length - 1} rows detected
                </div>
              )}

              <p className="text-xs text-slate-400">Or paste CSV text below:</p>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows={4}
                placeholder="Company,Role,Location…"
                className="input w-full resize-none text-xs font-mono"
              />

              <div className="flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={!text.trim()}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-medium rounded-lg cursor-pointer"
                >
                  Import
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
