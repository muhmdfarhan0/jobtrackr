import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Job, JobStatus } from '../types'

const STORAGE_KEY = 'jobtrackr_jobs'

function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Job[]) : getDefaultJobs()
  } catch {
    return getDefaultJobs()
  }
}

function getDefaultJobs(): Job[] {
  return [
    {
      id: uuidv4(),
      company: 'Acme Corp',
      role: 'Senior Frontend Engineer',
      location: 'Remote',
      salary: '$120k – $150k',
      status: 'interview',
      url: 'https://example.com',
      notes: 'Great culture, React + TypeScript stack. Interview on Thursday.',
      dateAdded: new Date().toISOString(),
      dateApplied: new Date(Date.now() - 5 * 86400000).toISOString(),
      priority: 'high',
      tags: ['React', 'Remote'],
    },
    {
      id: uuidv4(),
      company: 'Startup XYZ',
      role: 'Full Stack Developer',
      location: 'New York, NY',
      salary: '$90k – $110k',
      status: 'applied',
      url: '',
      notes: 'Applied via LinkedIn. Waiting to hear back.',
      dateAdded: new Date().toISOString(),
      dateApplied: new Date(Date.now() - 2 * 86400000).toISOString(),
      priority: 'medium',
      tags: ['Node.js', 'React'],
    },
    {
      id: uuidv4(),
      company: 'Big Tech Co',
      role: 'Software Engineer II',
      location: 'Seattle, WA',
      salary: '$160k+',
      status: 'screening',
      url: '',
      notes: 'Recruiter reached out on LinkedIn. Phone screen scheduled.',
      dateAdded: new Date().toISOString(),
      dateApplied: new Date(Date.now() - 7 * 86400000).toISOString(),
      priority: 'high',
      tags: ['Python', 'AWS'],
    },
    {
      id: uuidv4(),
      company: 'Design Agency',
      role: 'React Developer',
      location: 'Austin, TX',
      salary: '$85k',
      status: 'wishlist',
      url: 'https://example.com/jobs',
      notes: 'Interesting projects. Need to polish portfolio first.',
      dateAdded: new Date().toISOString(),
      dateApplied: '',
      priority: 'low',
      tags: ['React', 'CSS'],
    },
  ]
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(loadJobs)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('jobtrackr_dark')
    return saved ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  }, [jobs])

  useEffect(() => {
    localStorage.setItem('jobtrackr_dark', String(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addJob = useCallback((data: Omit<Job, 'id' | 'dateAdded'>) => {
    setJobs(prev => [
      {
        ...data,
        id: uuidv4(),
        dateAdded: new Date().toISOString(),
      },
      ...prev,
    ])
  }, [])

  const updateJob = useCallback((id: string, data: Partial<Job>) => {
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, ...data } : j)))
  }, [])

  const deleteJob = useCallback((id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id))
  }, [])

  const moveJob = useCallback((id: string, status: JobStatus) => {
    setJobs(prev =>
      prev.map(j =>
        j.id === id
          ? {
              ...j,
              status,
              dateApplied: status === 'applied' && !j.dateApplied ? new Date().toISOString() : j.dateApplied,
            }
          : j,
      ),
    )
  }, [])

  const exportCSV = useCallback(() => {
    const headers = ['Company', 'Role', 'Location', 'Salary', 'Status', 'Priority', 'Date Applied', 'URL', 'Tags', 'Notes']
    const rows = jobs.map(j => [
      j.company,
      j.role,
      j.location,
      j.salary,
      j.status,
      j.priority,
      j.dateApplied ? new Date(j.dateApplied).toLocaleDateString() : '',
      j.url,
      j.tags.join('; '),
      j.notes.replace(/\n/g, ' '),
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `jobtrackr-export-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }, [jobs])

  const importCSV = useCallback((text: string) => {
    try {
      const lines = text.trim().split('\n').slice(1)
      const imported: Job[] = lines.map(line => {
        const cols = line.split(',').map(c => c.replace(/^"|"$/g, '').trim())
        return {
          id: uuidv4(),
          company: cols[0] || '',
          role: cols[1] || '',
          location: cols[2] || '',
          salary: cols[3] || '',
          status: (cols[4] as JobStatus) || 'applied',
          priority: (cols[5] as Job['priority']) || 'medium',
          dateApplied: cols[6] ? new Date(cols[6]).toISOString() : '',
          url: cols[7] || '',
          tags: cols[8] ? cols[8].split(';').map(t => t.trim()) : [],
          notes: cols[9] || '',
          dateAdded: new Date().toISOString(),
        }
      })
      setJobs(prev => [...imported, ...prev])
      return imported.length
    } catch {
      return 0
    }
  }, [])

  return {
    jobs,
    darkMode,
    setDarkMode,
    addJob,
    updateJob,
    deleteJob,
    moveJob,
    exportCSV,
    importCSV,
  }
}
