nearbycareApp/
├── app/
│ ├── layout.tsx # Root layout (Server Component)
│ ├── page.tsx # Home page (Server)
│ ├── globals.css # Tailwind/global styles
│ ├── error.tsx # Global error boundary
│ ├── not-found.tsx # 404 page
│ │
│ ├── map/
│ │ ├── layout.tsx # Map page layout
│ │ ├── page.tsx # Server Component (initial data fetch)
│ │ ├── loading.tsx # Skeleton loading
│ │ ├── error.tsx # Map-specific error
│ │ ├── MapViewport.tsx # Client Component (interactive map)
│ │ ├── MapControls.tsx # Zoom / location buttons (Client)
│ │ ├── MapFilters.tsx # Filter UI (Client)
│ │ └── utils/ # Map helper logic
│ │ ├── clustering.ts
│ │ ├── geospatial.ts
│ │ └── mapUtils.ts
│ │
│ ├── organizations/
│ │ ├── [slug]/ # Organization profile
│ │ │ ├── page.tsx # Server Component
│ │ │ ├── loading.tsx
│ │ │ ├── OrgHeader.tsx # Server
│ │ │ ├── OrgMap.tsx # Client
│ │ │ ├── OrgGallery.tsx # Client
│ │ │ ├── OrgContact.tsx # Client
│ │ │ └── ReviewSection.tsx # Client
│ │ │
│ │ └── submit/
│ │ ├── page.tsx # Server Component
│ │ └── SubmissionForm.tsx # Client
│ │
│ ├── dashboard/
│ │ ├── layout.tsx # Server
│ │ ├── page.tsx # Dashboard stats (Server)
│ │ ├── submissions/
│ │ │ ├── page.tsx # Server
│ │ │ └── [id]/ # Review submission
│ │ │ ├── page.tsx # Server
│ │ │ └── SubmissionReviewer.tsx # Client
│ │ ├── organizations/
│ │ │ ├── page.tsx # Server list
│ │ │ └── [id]/ # Edit org
│ │ │ └── OrgEditForm.tsx # Client
│ │ └── analytics/
│ │ ├── page.tsx # Server
│ │ └── ChartContainer.tsx # Client
│ │
│ ├── auth/
│ │ ├── signin/page.tsx # Server
│ │ ├── signin/SignInForm.tsx # Client
│ │ ├── signup/page.tsx
│ │ ├── signup/SignUpForm.tsx
│ │ └── logout/page.tsx
│ │
│ └── api/ # Next.js App Router APIs
│ ├── auth/
│ │ ├── signin.ts
│ │ ├── signup.ts
│ │ └── logout.ts
│ ├── organizations/
│ │ ├── route.ts
│ │ ├── [id]/route.ts
│ │ └── submit.ts
│ ├── map/
│ │ ├── clusters.ts
│ │ └── bounds.ts
│ └── submissions/
│ ├── route.ts
│ └── [id]/route.ts
│
├── components/
│ ├── ui/ # Reusable UI (shadcn/ui or custom)
│ │ ├── Button.tsx
│ │ ├── Input.tsx
│ │ ├── Modal.tsx
│ │ └── Spinner.tsx
│ │
│ ├── common/
│ │ ├── Header.tsx # Client nav
│ │ ├── Footer.tsx # Server
│ │ ├── Sidebar.tsx # Dashboard
│ │ ├── LoadingSkeleton.tsx
│ │ └── ErrorBoundary.tsx
│ │
│ ├── map/
│ │ ├── MapSkeleton.tsx
│ │ ├── MapLegend.tsx
│ │ └── ZoomControls.tsx
│ │
│ ├── forms/
│ │ ├── OrgSubmissionForm.tsx
│ │ ├── OrgEditForm.tsx
│ │ └── UserForm.tsx
│ │
│ └── dashboard/
│ ├── StatCard.tsx
│ ├── DataTable.tsx
│ └── FilterBar.tsx
│
├── lib/
│ ├── firebase/ # Firebase helpers
│ │ ├── admin.ts
│ │ ├── auth.ts
│ │ └── firestore.ts
│ │
│ ├── server/ # Server-side logic
│ │ ├── orgService.ts
│ │ ├── submissionService.ts
│ │ └── userService.ts
│ │
│ ├── client/ # Client-side helpers/hooks
│ │ ├── apiClient.ts
│ │ └── hooks.ts
│ │
│ └── shared/ # Shared types, utils, constants
│ ├── constants.ts
│ ├── types.ts
│ └── utils.ts
│
├── styles/
│ ├── globals.css
│ ├── variables.css
│ └── maps.css
│
├── public/
│ ├── images/
│ └── data/ # Seed / POC data
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
