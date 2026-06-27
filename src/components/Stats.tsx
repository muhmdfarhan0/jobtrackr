import { TrendingUp, Target, CheckCircle2, XCircle, Clock, Award } from 'lucide-react'
import type { Job } from '../types'
import { STATUS_COLUMNS } from '../types'

interface Props {
  jobs: Job[]
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
        <span className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  )
}

export default function Stats({ jobs }: Props) {
  const total = jobs.length
  const applied = jobs.filter(j => j.status !== 'wishlist').length
  const active = jobs.filter(j => !['rejected', 'wishlist'].includes(j.status)).length
  const offers = jobs.filter(j => j.status === 'offer').length
  const rejected = jobs.filter(j => j.status === 'rejected').length
  const interviews = jobs.filter(j => j.status === 'interview').length

  const responseRate = applied > 0 ? Math.round(((applied - jobs.filter(j => j.status === 'applied').length) / applied) * 100) : 0
  const offerRate = applied > 0 ? Math.round((offers / applied) * 100) : 0

  const tagCounts: Record<string, number> = {}
  jobs.forEach(j => j.tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1 }))
  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 6)

  const avgDaysToApply = (() => {
    const diffs = jobs
      .filter(j => j.dateApplied && j.dateAdded)
      .map(j => Math.floor((new Date(j.dateApplied).getTime() - new Date(j.dateAdded).getTime()) / 86400000))
      .filter(d => d >= 0)
    return diffs.length ? Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length) : null
  })()

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Job Search Stats</h2>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Total Jobs"   value={total}           icon={<Target size={16} />}       />
        <StatCard label="Active"       value={active}          icon={<TrendingUp size={16} />}   />
        <StatCard label="Interviews"   value={interviews}      icon={<Clock size={16} />}        />
        <StatCard label="Offers"       value={offers}          icon={<Award size={16} />}        />
        <StatCard label="Rejected"     value={rejected}        icon={<XCircle size={16} />}      />
        <StatCard label="Offer Rate"   value={`${offerRate}%`} icon={<CheckCircle2 size={16} />} />
      </div>

      {/* Response rate bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-900 dark:text-white">Response Rate</h3>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{responseRate}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
          <div
            className="bg-slate-900 dark:bg-white h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${responseRate}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {applied - jobs.filter(j => j.status === 'applied').length} responses out of {applied} applications
        </p>
      </div>

      {/* Pipeline funnel */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Pipeline Breakdown</h3>
        <div className="space-y-2">
          {STATUS_COLUMNS.map(col => {
            const count = jobs.filter(j => j.status === col.id).length
            const pct = total > 0 ? (count / total) * 100 : 0
            return (
              <div key={col.id} className="flex items-center gap-3">
                <span className="text-sm text-slate-500 dark:text-slate-400 w-20 shrink-0">{col.label}</span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-slate-900 dark:bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white w-6 text-right">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top tags */}
      {topTags.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Top Skills / Tags</h3>
          <div className="flex flex-wrap gap-2">
            {topTags.map(([tag, count]) => (
              <div key={tag} className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-sm border border-slate-200 dark:border-slate-700">
                <span className="font-medium">{tag}</span>
                <span className="text-slate-400 text-xs">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {avgDaysToApply !== null && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <Clock size={20} className="text-slate-500 dark:text-slate-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{avgDaysToApply} day{avgDaysToApply !== 1 ? 's' : ''}</p>
            <p className="text-sm text-slate-400">Average time from save to application</p>
          </div>
        </div>
      )}

      {total === 0 && (
        <div className="text-center py-12 text-slate-300 dark:text-slate-700">
          <Target size={40} className="mx-auto mb-3" />
          <p>No jobs tracked yet. Add some to see your stats.</p>
        </div>
      )}
    </div>
  )
}
