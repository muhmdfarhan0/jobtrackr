# 💼 JobTrackr

> **Free, self-hosted job application tracker with a Kanban board — no sign-up, no backend, no ads.**

JobTrackr helps you manage your job search without messy spreadsheets. Everything is stored locally in your browser. It's open-source, privacy-first, and works offline.

**🌐 Live Demo → [muhmdfarhan0.github.io/jobtrackr](https://muhmdfarhan0.github.io/jobtrackr/)**

---

## Screenshots

### Kanban Board — Light Mode
![Kanban Board Light](https://raw.githubusercontent.com/muhmdfarhan0/jobtrackr/main/screenshots/board-light.png)

### Kanban Board — Dark Mode
![Kanban Board Dark](https://raw.githubusercontent.com/muhmdfarhan0/jobtrackr/main/screenshots/board-dark.png)

### Stats Dashboard
![Stats Dashboard](https://raw.githubusercontent.com/muhmdfarhan0/jobtrackr/main/screenshots/stats.png)

### Add / Edit Job Modal
![Job Modal](https://raw.githubusercontent.com/muhmdfarhan0/jobtrackr/main/screenshots/modal.png)

---

## Features

- **Kanban Board** — Drag & drop jobs through 6 stages: Wishlist → Applied → Screening → Interview → Offer → Rejected
- **Job Details** — Track company, role, location, salary, date applied, job URL, tags, and notes
- **Priority Levels** — Mark jobs as low, medium, or high priority
- **Stats Dashboard** — Response rate, offer rate, pipeline breakdown, top skills chart
- **Search & Filter** — Instantly search across companies, roles, and tags
- **Dark Mode** — Full dark mode with system preference detection
- **CSV Export** — Export all your applications to a spreadsheet
- **CSV Import** — Import applications from a spreadsheet
- **Zero Backend** — All data lives in `localStorage`. Nothing is sent anywhere.
- **Offline Ready** — Works with no internet connection after first load
- **Free & Open Source** — No sign-up, no subscription, no tracking

---

## Getting Started

### Option 1: Use the live version (recommended)

Just open **[muhmdfarhan0.github.io/jobtrackr](https://muhmdfarhan0.github.io/jobtrackr/)** in your browser. No installation needed.

### Option 2: Run locally

```bash
# Clone the repository
git clone https://github.com/muhmdfarhan0/jobtrackr.git
cd jobtrackr

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open `http://localhost:5173/jobtrackr/` in your browser.

### Option 3: Self-host

```bash
# Build for production
npm run build

# The `dist/` folder can be deployed to any static host:
# Netlify, Vercel, Cloudflare Pages, your own server, etc.
```

---

## Tech Stack

| Tech | Purpose |
|------|---------|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [Vite 8](https://vitejs.dev/) | Build tool |
| [Lucide React](https://lucide.dev/) | Icons |
| `localStorage` | Data persistence |

---

## CSV Import Format

You can import jobs from any spreadsheet. Export your existing tracker as CSV with these column headers (order matters):

```
Company, Role, Location, Salary, Status, Priority, Date Applied, URL, Tags, Notes
```

**Status values:** `wishlist` | `applied` | `screening` | `interview` | `offer` | `rejected`

**Priority values:** `low` | `medium` | `high`

**Tags:** Separate multiple tags with `;` (e.g. `React; Remote; Startup`)

---

## Privacy

- ✅ All data is stored in your browser's `localStorage`
- ✅ No account required
- ✅ No data is ever sent to any server
- ✅ No analytics or tracking
- ✅ You can clear all data anytime by clearing your browser storage

---

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

### Ideas for contributions
- [ ] Reminder / deadline notifications
- [ ] Multiple boards (separate boards per job search)
- [ ] Contact tracker (recruiter names, emails)
- [ ] Calendar view
- [ ] PWA / installable app

---

## License

MIT License — free to use, modify, and distribute.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/muhmdfarhan0">muhmdfarhan0</a>
</p>
