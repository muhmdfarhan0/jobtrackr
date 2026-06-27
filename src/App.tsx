import { useState, useCallback } from 'react'
import { useJobs } from './hooks/useJobs'
import Header from './components/Header'
import Board from './components/Board'
import Stats from './components/Stats'
import JobModal from './components/JobModal'
import ImportModal from './components/ImportModal'
import type { Job, JobStatus } from './types'

type ModalState =
  | { type: 'none' }
  | { type: 'add'; status: JobStatus }
  | { type: 'edit'; job: Job }
  | { type: 'import' }

export default function App() {
  const { jobs, darkMode, setDarkMode, addJob, updateJob, deleteJob, moveJob, exportCSV, importCSV } = useJobs()
  const [view, setView] = useState<'board' | 'stats'>('board')
  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  const openAdd = useCallback((status: JobStatus = 'applied') => {
    setModal({ type: 'add', status })
  }, [])

  const openEdit = useCallback((job: Job) => {
    setModal({ type: 'edit', job })
  }, [])

  const closeModal = useCallback(() => setModal({ type: 'none' }), [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col">
      <Header
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        onExport={exportCSV}
        onImport={() => setModal({ type: 'import' })}
        onAdd={() => openAdd()}
        view={view}
        onViewChange={setView}
        jobs={jobs}
      />

      <main className="flex-1 overflow-hidden flex flex-col">
        {view === 'board' ? (
          <Board
            jobs={jobs}
            onAddJob={openAdd}
            onJobClick={openEdit}
            onDeleteJob={deleteJob}
            onMoveJob={moveJob}
          />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <Stats jobs={jobs} />
          </div>
        )}
      </main>

      {modal.type === 'add' && (
        <JobModal
          defaultStatus={modal.status}
          onSave={addJob}
          onClose={closeModal}
        />
      )}

      {modal.type === 'edit' && (
        <JobModal
          job={modal.job}
          onSave={data => updateJob(modal.job.id, data)}
          onClose={closeModal}
          onDelete={() => deleteJob(modal.job.id)}
        />
      )}

      {modal.type === 'import' && (
        <ImportModal
          onImport={importCSV}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
