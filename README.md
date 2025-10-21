# NearbyCare – Production-Ready Architecture Documentation
**Local NGO & Donation Finder Platform**

> A free, community-driven platform to discover, engage with, and support local NGOs, orphanages, and senior centers across India.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Core Objectives](#core-objectives)
3. [Target Users](#target-users)
4. [System Architecture](#system-architecture)
5. [Technology Stack](#technology-stack)
6. [Data Model & Schema](#data-model--schema)
7. [Security Architecture](#security-architecture)
8. [Feature Specifications](#feature-specifications)
9. [Interactive India Map](#interactive-india-map)
10. [Development Roadmap](#development-roadmap)
11. [Testing Strategy](#testing-strategy)
12. [Deployment & Operations](#deployment--operations)
13. [Cost Management](#cost-management)
14. [Legal & Compliance](#legal--compliance)
15. [Learning Objectives](#learning-objectives)
16. [Next Steps & Future Enhancements](#next-steps--future-enhancements)
17. [Appendix](#appendix)

---

## 1. Project Overview

NearbyCare is a **100% free**, community-driven, location-based web platform designed to help users discover, engage with, and support local NGOs, orphanages, and senior centers. The platform enables users to find organizations nearby on an interactive India map, submit listings for lesser-known initiatives, and facilitate transparent support.

### Key Highlights

- **Serverless Architecture**: Built entirely on Firebase for scalability and cost-efficiency
- **Community-Driven**: Users can submit and verify organizations
- **Location-First**: Interactive India map showing all NGOs with visual markers (similar to Snapchat's map interface)
- **100% Free**: No monetization, no transaction fees, pure social impact
- **Learning Project**: Structured to master modern serverless development practices

### Author
**Govind Bagla**  

---

## 2. Core Objectives

### Primary Goals

1. **Discovery**: Provide a verified directory of NGOs discoverable via interactive India map
2. **Community Engagement**: Enable community submissions for organizations without digital presence
3. **Visual Navigation**: Interactive map showing NGO locations across India with clustering and filtering
4. **Support NGOs**: Help organizations manage profiles and community engagement
5. **Transparency**: Facilitate transparent communication between NGOs and community
6. **Accessibility**: Keep the platform 100% free for all users and organizations

### Success Metrics

| Metric | Target (12 months) |
|--------|-------------------|
| Verified NGOs | 1,000+ |
| Monthly Active Users | 10,000+ |
| Submission Approval Rate | 90%+ |
| Average Page Load Time | < 2 seconds |
| Platform Rating | 4.5+ stars |
| Map Interactions | 50,000+/month |

---

## 3. Target Users

### Primary Personas

#### 1. Anonymous Visitors & Contributors
- **Profile**: Anyone who wants to discover or submit NGO information (no account needed)
- **Pain Points**:
  - Don't know which NGOs operate near them
  - Want to help NGOs get discovered but don't want account hassle
  - Unsure if organization is legitimate
- **Our Solution**: 
  - Browse map without login
  - Submit NGO details anonymously (just email for updates)
  - View verified listings

#### 2. NGO Administrators (Account Required)
- **Profile**: NGO representatives who want to manage their organization's profile
- **Pain Points**:
  - Limited visibility in local community
  - No platform to showcase their work
  - Need to update donation needs regularly
- **Our Solution**: 
  - Free account creation for verified NGOs
  - Full profile management dashboard
  - Real-time updates to their listing

#### 3. Platform Administrators
- **Profile**: Moderators ensuring data quality and authenticity
- **Responsibilities**:
  - Review anonymous submissions
  - Verify NGO accounts
  - Maintain platform integrity
- **Our Solution**: Comprehensive admin dashboard
---

## 4. System Architecture

### Architecture Overview

NearbyCare follows a pure serverless architecture using Firebase, eliminating traditional backend servers while maintaining enterprise-grade security and scalability.

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer (Web Only)                   │
│          React/Next.js with Interactive India Map            │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                    Firebase Services                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Hosting    │  │     Auth     │  │   Firestore  │     │
│  │   (CDN)      │  │  (Identity)  │  │  (Database)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Storage    │  │   Functions  │  │  Scheduler   │     │
│  │   (Files)    │  │   (Logic)    │  │   (Cron)     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                   External Services                          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   SendGrid   │  │    Sentry    │  │  Google Maps │     │
│  │   (Email)    │  │ (Monitoring) │  │   (Map API)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
User Action → Frontend Validation → Cloud Function (Server-side)
                                            ↓
                                    Business Logic
                                    + Validation
                                    + Authorization
                                            ↓
                                    Firestore Write
                                            ↓
                                    Firestore Trigger
                                            ↓
                                    Post-processing
                                    (Email, Map Update)
```

### Key Architectural Decisions

#### Why Serverless?
- ✅ **No server management**: Focus on features, not infrastructure
- ✅ **Auto-scaling**: Handles 10 or 10,000 users seamlessly
- ✅ **Cost-effective**: Pay only for actual usage (perfect for free platform)
- ✅ **Fast development**: Integrated services reduce boilerplate code
- ✅ **Built-in security**: Firebase handles auth, encryption, DDoS protection

#### Why Firebase Specifically?
- ✅ **Mature ecosystem**: Battle-tested by millions of apps
- ✅ **Real-time capabilities**: Live map updates without polling
- ✅ **Offline support**: Works without internet connection
- ✅ **Generous free tier**: Perfect for 100% free platform
- ✅ **India region availability**: Low latency for target users (asia-south1 - Mumbai)

---

## 5. Technology Stack

### Frontend Stack

| Layer | Technology | Purpose | Justification |
|-------|-----------|---------|---------------|
| **Framework** | Next.js 14+ | React meta-framework | SSR, SSG, API routes, excellent DX |
| **UI Library** | Tailwind CSS | Utility-first styling | Rapid development, small bundle size |
| **UI Components** | shadcn/ui | Pre-built components | Accessible, customizable, no runtime |
| **State Management** | React Query | Server state caching | Automatic caching, refetching, optimistic updates |
| **Forms** | React Hook Form + Zod | Form handling + validation | Best performance, TypeScript support |
| **Map Library** | React Google Maps API | Interactive India map | Clustering, custom markers, filtering |
| **Icons** | Lucide React | Icon library | Lightweight, consistent design |
| **Analytics** | Google Analytics 4 | User behavior tracking | Industry standard, free |
| **Error Tracking** | Sentry | Error monitoring | Detailed error reports, source maps |

### Backend Stack (Serverless)

| Service | Purpose | Usage |
|---------|---------|-------|
| **Firestore** | NoSQL database | Store all application data |
| **Cloud Functions** | Serverless compute | Business logic, validation, triggers |
| **Firebase Auth** | User authentication | Email/password, Google OAuth |
| **Firebase Storage** | File storage | Images, documents, verification files |
| **Cloud Scheduler** | Cron jobs | Automated backups, cleanup tasks |
| **Firebase Hosting** | Static hosting | Host Next.js frontend with CDN |

### External Services

| Service | Purpose | Free Tier | Usage |
|---------|---------|-----------|-------|
| **SendGrid** | Transactional email | 100/day | Email notifications |
| **Sentry** | Error monitoring | 5k events/month | Production error tracking |
| **Google Maps** | Map rendering, geocoding | $200 credit/month | Interactive India map |

### Development Tools

```json
{
  "runtime": "Node.js 20+",
  "package_manager": "npm or pnpm",
  "version_control": "Git + GitHub",
  "ci_cd": "GitHub Actions",
  "testing": {
    "unit": "Jest + React Testing Library",
    "e2e": "Playwright",
    "load": "k6 or Artillery"
  },
  "code_quality": {
    "linting": "ESLint",
    "formatting": "Prettier",
    "type_checking": "TypeScript"
  },
  "emulation": "Firebase Emulator Suite"
}
```

---

## 6. Data Model & Schema

### Firestore Database Structure

```
nearbycare (root)
├── users/
├── organizations/
├── submissions/
├── reviews/
├── rateLimits/
├── activityLogs/
├── adminLogs/
└── systemConfig/
```

### Detailed Schema

#### 6.1 users Collection

```typescript
{
  uid: string //Document ID: Auto-generated;                   s
  userEmail: string;                
  userName: string;          
  
  // Account Type (only 'ngo' or 'admin' - no regular users)
  role: 'user';       
  emailVerified: boolean;
  
  // NGO Specific Fields which they wanna refer
  ngoName: string 
  ngoEmail:string,
  ngoPhoneNumber:string,
  ngoAddress:string,
  ngoType:string
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
}
```

**Important:** This collection only contains NGO administrators and platform admins. 
Regular visitors don't need accounts and won't have entries here.

**Indexes Required:**
- `email` (ascending)
- `role + accountStatus` (composite)
- `organizationId` (ascending)

#### 6.2 organizations Collection

```typescript
{
  // Document ID: Auto-generated
  orgId: string;                  // Auto ID from Firestore
  
  // Basic Information
  name: string;                   // Organization name
  slug: string;                   // URL-friendly: "akshaya-patra-jaipur"
  type: 'ngo' | 'orphanage' | 'senior_centre' | 'animal_shelter' | 
        'educational' | 'healthcare' | 'other';
  description: string;            // Full description (max 2000 chars)
  tagline: string | null;         // Short tagline (max 150 chars)
  
  // Contact Information
  contact: {
    phone: string;                // Primary phone
    alternatePhone: string | null;
    email: string | null;
    website: string | null;
    socialMedia: {
      facebook: string | null;
      instagram: string | null;
      twitter: string | null;
      linkedin: string | null;
    };
  };
  
  // Location (CRITICAL for map display)
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;              // 6 digits
    country: string;              // Default: "India"
  };
  location: {
    latitude: number;             // Decimal degrees (for map marker)
    longitude: number;            // Decimal degrees (for map marker)
    geohash: string;              // For proximity queries
  };
  
  // Operational Details
  operatingHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    // ... all 7 days
  } | null;
  visitingInstructions: string | null;
  
  // Donation Information
  donationTypes: ('goods' | 'money' | 'volunteers' | 'services')[];
  wishlist: {
    itemId: string;
    item: string;                 // "Rice bags", "Blankets"
    quantity: string | null;      // "10 bags", "20 pieces"
    urgency: 'low' | 'medium' | 'high';
    fulfilled: boolean;
  }[];
  donationInstructions: string | null;
  
  // Media
  images: {
    imageId: string;
    url: string;                  // Full size image
    thumbnailUrl: string;         // 300x300 thumbnail
    caption: string | null;
    uploadedAt: Timestamp;
    order: number;                // For sorting
  }[];
  logo: string | null;            // Organization logo URL
  
  // Verification & Trust
  verified: boolean;              // Admin approved
  verificationBadge: 'basic' | 'verified' | 'premium' | null;
  verificationDocuments: {
    docId: string;
    type: 'registration' | 'tax_exemption' | 'address_proof';
    url: string;                  // Storage URL (admin only)
    uploadedAt: Timestamp;
  }[];
  lastVerifiedAt: Timestamp | null;
  verifiedBy: string | null;      // Admin UID
  
  // Engagement Metrics
  viewCount: number;              // Incremented on profile view
  favoriteCount: number;          // Count of users who favorited
  reviewCount: number;            // Total reviews
  averageRating: number | null;   // 0-5 scale
  
  // Status Management
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification';
  suspensionReason: string | null;
  featuredUntil: Timestamp | null; // For promoted listings
  
  // Search Optimization
  searchableKeywords: string[];   // [name, city, type] in lowercase
  
  // Ownership
  createdBy: string;              // User UID who created/submitted
  managedBy: string | null;       // NGO admin UID (after claiming)
  claimedAt: Timestamp | null;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | null;
  
  // Schema Management
  schemaVersion: number;
}
```

**Indexes Required:**
- `status + verified` (composite)
- `type + status` (composite)
- `address.city + address.state` (composite) - for map filtering
- `location.geohash` (ascending) - for proximity queries
- `slug` (ascending) - for URL lookups
- `createdBy` (ascending)
- `featuredUntil` (descending)

#### 6.3 submissions Collection

```typescript
{
  // Document ID: Auto-generated
  submissionId: string;
  
  // Organization Details (mirrors organizations schema)
  name: string;
  type: string;
  description: string;
  contact: { phone: string; email: string | null; };
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
  };
  location: {
    latitude: number | null;      // Optional at submission
    longitude: number | null;
  };
  
  // Supporting Documents
  documents: {
    docId: string;
    type: 'registration' | 'address_proof' | 'photos' | 'other';
    url: string;
    fileName: string;
    uploadedAt: Timestamp;
  }[];
  
  // Submission Context
  submittedBy: string | null;     // User UID (only if NGO submitted) or null for anonymous
  submitterEmail: string;         // Email for update notifications (required)
  submitterName: string | null;   // Optional name
  submitterNotes: string | null;  // Why this org matters
  relationshipToOrg: 'volunteer' | 'beneficiary' | 'employee' | 'other' | null;
  
  // Review Status
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'needs_info';
  reviewedBy: string | null;      // Admin UID
  reviewedAt: Timestamp | null;
  reviewNotes: string | null;     // Internal admin notes
  rejectionReason: string | null; // Shown to submitter
  
  // Approval Actions
  approvedOrgId: string | null;   // Created organization ID after approval
  
  // Duplicate Detection
  duplicateOf: string | null;     // Existing org ID if duplicate
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Schema Management
  schemaVersion: number;
}
```

**Indexes Required:**
- `status` (ascending)
- `submittedBy + status` (composite)
- `reviewedBy` (ascending)
- `createdAt` (descending)

- **Anonymous Submission Flow:**
1. Visitor fills submission form (no login required)
2. Provides email for updates (required)
3. Optionally provides name
4. System creates submission with `submittedBy: null`
5. Email sent: "We received your submission, we'll notify you at this email"
6. Admin approves → Email sent: "Your submission is now live!"

#### 6.4 reviews Collection

```typescript
{
  // Document ID: Auto-generated
  reviewId: string;
  
  // References
  orgId: string;                  // Organization being reviewed
  userId: string;                 // Reviewer UID
  
  // Review Content
  rating: number;                 // 1-5 stars
  title: string | null;           // Optional review title
  comment: string;                // Review text (max 1000 chars)
  visitDate: Timestamp | null;    // When did they interact with org
  
  // Review Type
  reviewType: 'donation' | 'volunteer' | 'beneficiary' | 'visitor';
  donationType: 'goods' | 'money' | 'time' | null;
  
  // Moderation
  status: 'active' | 'flagged' | 'hidden' | 'deleted';
  flagCount: number;
  flagReasons: string[];
  moderatedBy: string | null;
  moderatedAt: Timestamp | null;
  
  // Engagement
  helpfulCount: number;           // Upvotes
  notHelpfulCount: number;        // Downvotes
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Schema Management
  schemaVersion: number;
}
```

**Indexes Required:**
- `orgId + status + createdAt` (composite)
- `userId + createdAt` (composite)
- `status + flagCount` (composite) - for moderation queue

#### 6.5 Schema Versioning & Migration

**Migration Framework**

Purpose: Enable zero-downtime schema updates after launch.

**Strategy:**
1. All documents include `schemaVersion` field
2. Code reads any version, writes latest version
3. Background migration function updates old documents
4. No breaking changes to existing fields

**Example Migration:**

```typescript
// Phase 1: Deploy code that reads both versions
function getOrganization(doc) {
  const data = doc.data();
  return {
    ...data,
    languages: data.languages || ['Hindi', 'English'], // Default for old docs
  };
}

// Phase 2: Run migration function
async function migrateOrganizationsToV2() {
  const orgs = await db.collection('organizations')
    .where('schemaVersion', '<', 2)
    .limit(500)
    .get();
  
  const batch = db.batch();
  orgs.forEach(doc => {
    batch.update(doc.ref, {
      languages: ['Hindi', 'English'],
      schemaVersion: 2,
      updatedAt: FieldValue.serverTimestamp()
    });
  });
  
  await batch.commit();
  console.log(`Migrated ${orgs.size} organizations to v2`);
}

// Phase 3: Schedule until all migrated
// Use Cloud Scheduler to run daily until complete
```

---

## 7. Security Architecture

### 7.1 Defense-in-Depth Model

```
Layer 1: Network Security
  ├── Firebase Hosting (HTTPS only, DDoS protection)
  └── Cloud CDN (Rate limiting, geographic filtering)

Layer 2: Authentication
  ├── Firebase Auth (OAuth 2.0, JWT tokens)
  ├── Email verification required for submissions
  └── Custom claims for role-based access

Layer 3: Authorization
  ├── Firestore Security Rules (document-level access)
  ├── Cloud Functions validation (business logic)
  └── Role-based permissions (user, ngo, admin)

Layer 4: Input Validation
  ├── Client-side (React Hook Form + Zod)
  ├── Server-side (Cloud Functions validators)
  └── Firestore schema validation

Layer 5: Data Protection
  ├── Encryption at rest (automatic)
  ├── Encryption in transit (TLS 1.3)
  └── Field-level privacy (hashed IPs, masked emails)

Layer 6: Monitoring & Response
  ├── Real-time threat detection
  ├── Automated alerts for suspicious activity
  └── Incident response procedures
```

### 7.2 Firestore Security Rules

**Complete Rule Set:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper Functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isNGO() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'ngo';
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isVerified() {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.emailVerified == true;
    }
    
  // Users Collection (only NGO admins and platform admins)
    match /users/{userId} {
      // NGO can create account during registration (pending verification)
      allow create: if isAuthenticated() && 
                      request.auth.uid == userId &&
                      request.resource.data.role == 'ngo' &&
                      request.resource.data.accountStatus == 'pending_verification';
      
      // NGO can read their own profile
      allow read: if isAuthenticated() && request.auth.uid == userId;
      
      // Admins can read all users
      allow read: if isAdmin();
      
      // NGO can update limited fields (contact info, designation)
      allow update: if isAuthenticated() && 
                      request.auth.uid == userId &&
                      request.resource.data.diff(resource.data).affectedKeys()
                        .hasOnly(['phoneNumber', 'designation', 'updatedAt']);
      
      // Admins can verify NGO accounts and update status
      allow update: if isAdmin();
    }
    
    // Organizations Collection
    match /organizations/{orgId} {
      // Anyone can read verified, active organizations
      allow read: if resource.data.verified == true && 
                    resource.data.status == 'active';
      
      allow read: if isAdmin();
      
      allow read: if isAuthenticated() && 
                    resource.data.managedBy == request.auth.uid;
      
      allow create: if isAdmin();
      
      // NGO owners can update their own organization (limited fields)
      allow update: if isAuthenticated() && 
                      resource.data.managedBy == request.auth.uid &&
                      request.resource.data.diff(resource.data).affectedKeys()
                        .hasOnly(['description', 'contact', 'operatingHours', 
                                 'wishlist', 'donationInstructions', 'images', 
                                 'socialMedia', 'updatedAt']);
      
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
   // Submissions Collection (anonymous submissions allowed)
    match /submissions/{submissionId} {
      // ANYONE can create submissions (no auth required)
      allow create: if request.resource.data.status == 'pending' &&
                      request.resource.data.submitterEmail is string &&
                      request.resource.data.submitterEmail.matches('.+@.+[.].+'); // Valid email
      
      // Admins can read all submissions
      allow read: if isAdmin();
      
      // NGO can read submissions they created (if authenticated)
      allow read: if isAuthenticated() && 
                    resource.data.submittedBy == request.auth.uid;
      
      // Only admins can update submissions (for review process)
      allow update: if isAdmin();
      
      // Admins can delete submissions
      allow delete: if isAdmin();
    }
    
    // Reviews Collection
    match /reviews/{reviewId} {
      allow read: if resource.data.status == 'active';
      allow read: if isAdmin();
      
      allow create: if isAuthenticated() && 
                      request.resource.data.userId == request.auth.uid &&
                      request.resource.data.status == 'active';
      
      // Users can update their own reviews (within 24 hours)
      allow update: if isAuthenticated() && 
                      resource.data.userId == request.auth.uid &&
                      request.time < resource.data.createdAt + duration.value(24, 'h') &&
                      request.resource.data.diff(resource.data).affectedKeys()
                        .hasOnly(['rating', 'title', 'comment', 'updatedAt']);
      
      allow update: if isAdmin();
      
      allow delete: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow delete: if isAdmin();
    }
    
    // Rate Limits Collection (internal use only)
    match /rateLimits/{limitId} {
      allow read, write: if false; // Only Cloud Functions can access
    }
    
    // Activity Logs Collection
    match /activityLogs/{logId} {
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow read: if isAdmin();
      allow write: if false;
    }
    
    // Admin Logs Collection
    match /adminLogs/{logId} {
      allow read: if isAdmin();
      allow write: if false;
    }
    
    // System Config Collection
    match /systemConfig/{configId} {
      allow read: if true;
      allow update: if isAdmin();
    }
  }
}
```

### 7.3 Firebase Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.role == 'admin';
    }
    
    function isValidImage() {
      return request.resource.size < 2 * 1024 * 1024 && // 2MB limit
             request.resource.contentType.matches('image/(jpeg|png|webp)');
    }
    
    function isValidDocument() {
      return request.resource.size < 5 * 1024 * 1024 && // 5MB limit
             request.resource.contentType == 'application/pdf';
    }
    
    // Temporary uploads (user uploads before submission)
    match /temp/{userId}/{fileName} {
      allow create: if isAuthenticated() && 
                      request.auth.uid == userId &&
                      (isValidImage() || isValidDocument());
      
      allow read: if isAuthenticated() && request.auth.uid == userId;
      allow delete: if isAuthenticated() && request.auth.uid == userId;
      allow delete: if isAdmin();
    }
    
    // Organization images (after approval)
    match /organizations/{orgId}/{imageId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Organization documents (verification docs)
    match /documents/{orgId}/{docId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated() && isValidDocument();
      allow delete: if isAdmin();
    }
    
    // User profile pictures
    match /profiles/{userId}/{imageId} {
      allow read: if true;
      
      allow create: if isAuthenticated() && 
                      request.auth.uid == userId &&
                      isValidImage();
      
      allow delete: if isAuthenticated() && request.auth.uid == userId;
    }
  }
}
```

---

## 8. Feature Specifications

### 8.1 Location-Based Search

**Overview:**
Users can discover NGOs using an interactive India map with visual markers and filters.

**Technical Implementation:**

**Search Strategy: Map-First Approach**

```
1. Interactive Map (Primary)
   └─> Display all NGOs as markers on India map
   └─> Cluster markers when zoomed out
   └─> Click marker → Show org details

2. Filter Panel (Secondary)
   └─> Apply type, verification, state filters
   └─> Real-time map update

3. List View (Toggle)
   └─> Table view of filtered organizations
   └─> Sortable by distance, rating, name
```

**Search Parameters:**

| Parameter | Type | Options | Default |
|-----------|------|---------|---------|
| `viewport` | MapBounds | Current map view | All India |
| `type` | Array | ngo, orphanage, senior_centre, etc. | All types |
| `verified` | Boolean | true, false, all | true only |
| `state` | String | State name | All states |
| `sortBy` | String | name, rating, recent | name |

**User Flow:**

```
1. User opens map page
   ↓
2. Map loads with India centered
   ↓
3. Display all NGO markers (clustered)
   ↓
4. User pans/zooms map
   ↓
5. Markers update based on viewport
   ↓
6. User applies filters (type, state)
   ↓
7. Map markers filter in real-time
   ↓
8. Click marker → Open info window
   ↓
9. Click "View Profile" → Full org page
```

### 8.2 Organization Profiles

**Profile Structure:**

```
┌──────────────────────────────────────────┐
│          Header Section                  │
│  - Organization Name                     │
│  - Verification Badge                    │
│  - Type & Location (with map preview)    │
│  - Rating & Reviews Count                │
│  - Quick Actions (Favorite, Share, Report)│
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│          Image Gallery                   │
│  - Cover photo                           │
│  - Additional photos (carousel)          │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│          About Section                   │
│  - Description                           │
│  - Mission statement                     │
│  - Services provided                     │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│          Contact Information             │
│  - Phone (click-to-call)                 │
│  - Email (click-to-email)                │
│  - Website link                          │
│  - Social media links                    │
│  - Address with mini map                 │
│  - Get Directions button                 │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│          Donation Needs                  │
│  - Accepted donation types               │
│  - Wishlist items                        │
│  - How to donate instructions            │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│          Operating Hours                 │
│  - Weekly schedule                       │
│  - Visiting instructions                 │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│          Reviews Section                 │
│  - Average rating                        │
│  - Rating distribution                   │
│  - Recent reviews                        │
│  - Write a review (if authenticated)     │
└──────────────────────────────────────────┘
```
### 8.3 Anonymous Submission Portal

**Submission Flow (No Account Required):**
```
Step 1: Basic Information
├─ Organization Name *
├─ Organization Type *
├─ Description (min 50 chars) *
└─ Continue →

Step 2: Contact Details
├─ NGO Phone Number *
├─ NGO Email (optional)
├─ NGO Website (optional)
└─ Continue →

Step 3: Location
├─ Street Address
├─ Area/Locality *
├─ City *
├─ State *
├─ Pincode *
├─ [Map Preview]
└─ Continue →

Step 4: Additional Info
├─ Operating Hours (optional)
├─ Donation Types Accepted
├─ Why should we list this NGO? *
├─ Your relationship to organization
└─ Continue →

Step 5: Verification Documents
├─ Upload Photos (optional, max 5)
├─ Upload Registration Certificate (optional but recommended)
├─ Upload Address Proof (optional)
└─ Continue →

Step 6: Your Contact Info (for updates only)
├─ Your Email * (we'll notify you about submission status)
├─ Your Name (optional)
├─ [✓] I agree to Terms of Service
└─ Submit Anonymously

Step 7: Confirmation
├─ ✅ Submission Received!
├─ We'll review within 48 hours
├─ Check your email for updates
└─ [Browse More NGOs]
```

**Validation Rules:**

**Client-Side (Instant Feedback):**
- Required fields presence
- Format validation (phone, email, pincode)
- Character limits
- File size and type checks
- Valid email format for submitter

**Server-Side (Security):**
- Duplicate detection (name + pincode)
- Rate limiting (3 submissions per email per day)
- Content moderation (profanity check)
- Document validity
- Geolocation verification

**Post-Submission:**
```
Anonymous user submits → Email confirmation sent to submitter
                              ↓
                       Admin receives notification
                              ↓
                       Admin reviews (within 48 hours)
                              ↓
              ┌───────────────┴───────────────┐
              ↓                               ↓
          APPROVED                        REJECTED
              ↓                               ↓
    Organization created              Submitter notified
              ↓                        with reason via email
    Submitter notified via email            ↓
    "Your submission is live!"        Can resubmit
              ↓                        with corrections
    Organization appears on map
```

**Email Notifications:**

1. **Submission Received:**
```
Subject: We received your NGO submission

Hi [Name],

Thank you for submitting [NGO Name] to NearbyCare!

We've received your submission and our team will review it within 
48 hours. You'll receive an email once we've made a decision.

Submission Details:
- Organization: [NGO Name]
- Location: [City, State]
- Submitted: [Date & Time]

Thank you for helping us build a better community!

- NearbyCare Team
```

2. **Submission Approved:**
```
Subject: Your submission is now live! 🎉

Hi [Name],

Great news! [NGO Name] has been approved and is now live on NearbyCare.

View the listing: [Link to organization page]

If you represent this organization, you can claim it to manage the 
profile and keep information updated.

[Claim This Organization]

Thank you for contributing to our community!

- NearbyCare Team
```

3. **Submission Rejected:**
```
Subject: Update on your NGO submission

Hi [Name],

Thank you for submitting [NGO Name]. After review, we couldn't 
approve this submission for the following reason:

[Rejection Reason]

You can submit again with the required corrections:
[Submit Again]

If you have questions, reply to this email.

- NearbyCare Team
```

### 8.4 NGO Self-Registration & Profile Management

**Registration Flow (Account Creation for NGOs Only):**
```
Step 1: Account Creation
├─ Work Email * (organization email)
├─ Password *
├─ Confirm Password *
├─ Representative Name *
├─ Designation * (Director, Manager, etc.)
├─ Phone Number *
└─ Sign Up →

Step 2: Email Verification
├─ Check your work email
├─ Click verification link
└─ Email verified ✓

Step 3: Organization Search
├─ Search for your organization
├─ Found? → Claim it
├─ Not found? → Create new listing
└─ Continue →

Step 4: Organization Verification Documents
├─ Registration Certificate * (PDF)
├─ Tax Exemption Certificate (80G/12A) (optional)
├─ Your ID Proof * (Aadhaar/PAN/Passport)
├─ Authorization Letter * (if not primary contact)
└─ Submit for Verification

Step 5: Under Review
├─ Your account is under verification
├─ We'll review within 3-5 business days
├─ You'll receive email notification
└─ Meanwhile, you can browse the platform

Step 6: Approved! ✅
├─ Email: "Your account is verified"
├─ Login to access dashboard
└─ Start managing your profile
```

**Verification Process:**

**Admin Review Checklist:**
- ☐ Registration certificate is valid and clear
- ☐ Organization name matches official documents
- ☐ Representative's ID proof is legitimate
- ☐ Phone number is working (test call)
- ☐ No duplicate NGO accounts
- ☐ Organization exists on government databases (if available)
- ☐ Social media/website verification (if provided)

**Approval Outcomes:**
```
APPROVED:
- Custom claim set: role = 'ngo'
- organizationId linked to account
- Dashboard access granted
- Welcome email sent with next steps

REJECTED:
- User notified with specific reasons
- Can resubmit with corrections
- Documents retained for 30 days

NEEDS MORE INFO:
- Admin requests additional documents
- User notified with requirements
- Can upload additional documents
```

**NGO Dashboard Features (Post-Approval):**

**Dashboard Sections:**

1. **Profile Management**
   - Edit organization details
   - Update photos
   - Manage wishlist
   - Update operating hours
   - Update contact information

2. **Engagement Analytics**
   - Profile views (daily/monthly)
   - Map marker clicks
   - Review ratings
   - Donation inquiries

3. **Reviews Management**
   - View all reviews
   - Respond to reviews
   - Flag inappropriate reviews

4. **Donation Management**
   - Update wishlist items
   - Mark items as fulfilled
   - Add donation instructions

5. **Settings**
   - Contact information
   - Password change
   - Account verification status
   - Email notifications preferences


### 8.5 Share & Bookmark (No Account Needed)

**Functionality:**

**Share Organization:**
- Share via WhatsApp, Facebook, Twitter, Email
- Copy link to clipboard
- Generate QR code for offline sharing

**Browser Bookmarking:**
- Users can bookmark using browser favorites
- No account needed
- Works across devices if browser synced

**Implementation:**
```typescript
function ShareButtons({ org }) {
  const shareUrl = `https://nearbycare.org/organizations/${org.slug}`;
  const shareText = `Check out ${org.name} on NearbyCare`;
  
  return (
    <div className="flex gap-2">
      <button onClick={() => {
        navigator.share({ title: org.name, url: shareUrl });
      }}>
        Share
      </button>
      
      <button onClick={() => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied!');
      }}>
        Copy Link
      </button>
    </div>
  );
}
```
```

---

### 📍 **Location 8: Phase 1 Deliverables (Section 10)**

**UPDATE** Phase 1 Authentication System bullet:

**REPLACE:**
```
- Email/password authentication
- Google OAuth integration
- Email verification flow
- Password reset flow
```

**WITH:**
```
- NGO account creation (email/password only)
- Email verification flow for NGOs
- Password reset flow for NGOs
- No authentication required for visitors/submissions
---

### 8.6 Cloud Function: Anonymous Submission

export const submitOrganizationAnonymous = functions
  .region('asia-south1')
  .https.onCall(async (data, context) => {
    
    // NO authentication check - anyone can submit
    
    // 1. Validate required fields
    const { 
      name, 
      type, 
      description, 
      contact, 
      address, 
      submitterEmail,
      submitterName 
    } = data;
    
    if (!submitterEmail || !submitterEmail.match(/.+@.+\..+/)) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Valid email is required for submission updates'
      );
    }
    
    // 2. Rate limiting by email (3 per day)
    await checkRateLimit(
      submitterEmail,
      'submission',
      3,
      24 * 60 * 60
    );
    
    // 3. Check for duplicates
    const isDuplicate = await checkDuplicateSubmission(data);
    if (isDuplicate) {
      throw new functions.https.HttpsError(
        'already-exists',
        'This organization already exists or has a pending submission'
      );
    }
    
    // 4. Create submission
    const submissionRef = db.collection('submissions').doc();
    await submissionRef.set({
      submissionId: submissionRef.id,
      name,
      type,
      description,
      contact,
      address,
      location: data.location || null,
      documents: data.documents || [],
      submittedBy: null, // Anonymous
      submitterEmail,
      submitterName: submitterName || null,
      submitterNotes: data.submitterNotes || null,
      relationshipToOrg: data.relationshipToOrg || null,
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      schemaVersion: 1,
    });
    
    // 5. Send confirmation email to submitter
    await sendSubmissionReceivedEmail(submitterEmail, name);
    
    // 6. Notify admin
    await sendAdminNotificationEmail(submissionRef.id);
    
    return {
      success: true,
      message: 'Submission received! Check your email for updates.',
      submissionId: submissionRef.id,
    };
  });

## 9. Interactive India Map



### 9.1 Map Overview

The **Interactive India Map** is the centerpiece of NearbyCare, providing a visual, Snapchat-style interface where users can explore NGOs across India.

**Key Features:**
- 🗺️ **Full India Coverage**: All states and union territories
- 📍 **Custom Markers**: Visual indicators for different NGO types
- 🔍 **Smart Clustering**: Groups nearby markers when zoomed out
- 🎨 **Color-Coded**: Different colors for NGO types
- ⚡ **Real-Time Filtering**: Instant map updates
- 📱 **Responsive**: Works on all screen sizes
- 🌐 **Offline Capable**: Cached map tiles

### 9.2 Technical Implementation

**Map Library:**
```typescript
import { GoogleMap, LoadScript, Marker, MarkerClusterer, InfoWindow } from '@react-google-maps/api';
```

**Map Configuration:**

```typescript
const mapConfig = {
  center: { lat: 20.5937, lng: 78.9629 }, // Center of India
  zoom: 5, // Show entire India
  minZoom: 4, // Can't zoom out beyond India
  maxZoom: 18, // Street-level detail
  
  // Map styling (similar to Snapchat)
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }] // Hide default POI labels
    },
    // Custom styling for cleaner look
  ],
  
  // Map controls
  mapTypeControl: false, // Hide satellite/terrain toggle
  streetViewControl: false,
  fullscreenControl: true,
  zoomControl: true,
};
```

**Marker Types:**

```typescript
const markerIcons = {
  ngo: {
    url: '/markers/ngo-marker.svg',
    scaledSize: { width: 40, height: 40 },
    color: '#3B82F6' // Blue
  },
  orphanage: {
    url: '/markers/orphanage-marker.svg',
    scaledSize: { width: 40, height: 40 },
    color: '#EC4899' // Pink
  },
  senior_centre: {
    url: '/markers/senior-marker.svg',
    scaledSize: { width: 40, height: 40 },
    color: '#8B5CF6' // Purple
  },
  animal_shelter: {
    url: '/markers/animal-marker.svg',
    scaledSize: { width: 40, height: 40 },
    color: '#10B981' // Green
  },
  educational: {
    url: '/markers/education-marker.svg',
    scaledSize: { width: 40, height: 40 },
    color: '#F59E0B' // Orange
  },
  healthcare: {
    url: '/markers/health-marker.svg',
    scaledSize: { width: 40, height: 40 },
    color: '#EF4444' // Red
  },
};
```

**Clustering Configuration:**

```typescript
const clusterStyles = [
  {
    textColor: 'white',
    url: '/cluster-small.svg', // 2-10 markers
    height: 50,
    width: 50,
  },
  {
    textColor: 'white',
    url: '/cluster-medium.svg', // 11-50 markers
    height: 60,
    width: 60,
  },
  {
    textColor: 'white',
    url: '/cluster-large.svg', // 51+ markers
    height: 70,
    width: 70,
  },
];
```

### 9.3 Map Component Architecture

**Main Map Component:**

```typescript
'use client';

import { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer, InfoWindow } from '@react-google-maps/api';
import { useOrganizations } from '@/hooks/useOrganizations';

export function IndiaMap() {
  const [map, setMap] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [filters, setFilters] = useState({
    type: [],
    verified: true,
    state: null
  });
  
  // Fetch organizations based on current map bounds
  const { organizations, isLoading } = useOrganizations(filters);
  
  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);
  
  const onMarkerClick = (org) => {
    setSelectedOrg(org);
  };
  
  return (
    <div className="relative h-screen w-full">
      {/* Map Container */}
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapConfig.center}
          zoom={mapConfig.zoom}
          options={mapConfig}
          onLoad={onLoad}
        >
          {/* Clustered Markers */}
          <MarkerClusterer
            options={{ 
              styles: clusterStyles,
              maxZoom: 15, // Don't cluster beyond this zoom
              gridSize: 60
            }}
          >
            {(clusterer) =>
              organizations.map((org) => (
                <Marker
                  key={org.orgId}
                  position={{ lat: org.location.latitude, lng: org.location.longitude }}
                  icon={markerIcons[org.type]}
                  clusterer={clusterer}
                  onClick={() => onMarkerClick(org)}
                />
              ))
            }
          </MarkerClusterer>
          
          {/* Info Window on Marker Click */}
          {selectedOrg && (
            <InfoWindow
              position={{ 
                lat: selectedOrg.location.latitude, 
                lng: selectedOrg.location.longitude 
              }}
              onCloseClick={() => setSelectedOrg(null)}
            >
              <OrgInfoCard org={selectedOrg} />
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      
      {/* Filter Sidebar */}
      <MapFilterPanel filters={filters} onFilterChange={setFilters} />
      
      {/* Toggle List View */}
      <MapListToggle organizations={organizations} />
    </div>
  );
}
```

**Info Window Card:**

```typescript
function OrgInfoCard({ org }) {
  return (
    <div className="p-4 max-w-xs">
      <div className="flex items-start gap-3">
        {org.logo && (
          <img src={org.logo} alt={org.name} className="w-12 h-12 rounded-full object-cover" />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            {org.name}
            {org.verified && (
              <svg className="w-5 h-5 text-blue-500" /* Verified badge */ />
            )}
          </h3>
          <p className="text-sm text-gray-600">{org.type} • {org.address.city}</p>
        </div>
      </div>
      
      <p className="mt-2 text-sm text-gray-700 line-clamp-2">{org.tagline || org.description}</p>
      
      <div className="mt-3 flex items-center gap-2">
        {org.averageRating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">{org.averageRating}</span>
            <span className="text-xs text-gray-500">({org.reviewCount})</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex gap-2">
        <a 
          href={`/organizations/${org.slug}`}
          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 text-center"
        >
          View Profile
        </a>
        <a 
          href={`tel:${org.contact.phone}`}
          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
        >
          Call
        </a>
      </div>
    </div>
  );
}
```

### 9.4 Filter Panel

**Filter Sidebar Component:**

```typescript
function MapFilterPanel({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className={`absolute top-4 left-4 bg-white rounded-lg shadow-lg transition-all ${isOpen ? 'w-80' : 'w-14'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold text-lg ${!isOpen && 'hidden'}`}>Filters</h3>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-100 rounded">
            {isOpen ? '←' : '→'}
          </button>
        </div>
        
        {isOpen && (
          <div className="space-y-4">
            {/* Organization Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Type
              </label>
              <div className="space-y-2">
                {['ngo', 'orphanage', 'senior_centre', 'animal_shelter', 'educational', 'healthcare'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.type.includes(type)}
                      onChange={(e) => {
                        const newTypes = e.target.checked
                          ? [...filters.type, type]
                          : filters.type.filter(t => t !== type);
                        onFilterChange({ ...filters, type: newTypes });
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm capitalize">{type.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                value={filters.state || ''}
                onChange={(e) => onFilterChange({ ...filters, state: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All States</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                {/* Add all Indian states */}
              </select>
            </div>
            
            {/* Verification Filter */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verified}
                  onChange={(e) => onFilterChange({ ...filters, verified: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Show only verified organizations</span>
              </label>
            </div>
            
            {/* Reset Filters */}
            <button
              onClick={() => onFilterChange({ type: [], verified: true, state: null })}
              className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 9.5 List View Toggle

**List/Map Toggle Component:**

```typescript
function MapListToggle({ organizations }) {
  const [view, setView] = useState('map'); // 'map' or 'list'
  
  if (view === 'list') {
    return (
      <div className="absolute inset-0 bg-white z-10">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">{organizations.length} Organizations Found</h2>
          <button 
            onClick={() => setView('map')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Show Map
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-73px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {organizations.map(org => (
              <OrganizationCard key={org.orgId} organization={org} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <button
      onClick={() => setView('list')}
      className="absolute bottom-4 right-4 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
    >
      <svg className="w-5 h-5" /* List icon */ />
      Show List
    </button>
  );
}
```

### 9.6 Performance Optimization for Map

**Optimization Strategies:**

1. **Viewport-Based Loading**
```typescript
// Only load organizations in current viewport
function useViewportOrganizations(map, filters) {
  const [organizations, setOrganizations] = useState([]);
  
  useEffect(() => {
    if (!map) return;
    
    const bounds = map.getBounds();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    
    // Query Firestore for orgs in bounds
    const orgsQuery = db.collection('organizations')
      .where('status', '==', 'active')
      .where('verified', '==', filters.verified)
      .where('location.latitude', '>=', sw.lat())
      .where('location.latitude', '<=', ne.lat());
    
    // Execute query and set organizations
  }, [map, filters]);
  
  return organizations;
}
```

2. **Marker Memoization**
```typescript
const memoizedMarkers = useMemo(() => {
  return organizations.map(org => ({
    position: { lat: org.location.latitude, lng: org.location.longitude },
    icon: markerIcons[org.type],
    orgId: org.orgId
  }));
}, [organizations]);
```

3. **Lazy Loading Images**
```typescript
// Load marker images on demand
const [loadedIcons, setLoadedIcons] = useState({});

useEffect(() => {
  const visibleTypes = new Set(organizations.map(org => org.type));
  
  visibleTypes.forEach(type => {
    if (!loadedIcons[type]) {
      // Load icon for this type
    }
  });
}, [organizations]);
```

### 9.7 Mobile Responsiveness

**Mobile Map Behavior:**

```typescript
function useResponsiveMap() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return {
    mapHeight: isMobile ? 'calc(100vh - 64px)' : '100vh',
    defaultZoom: isMobile ? 4 : 5,
    filterPosition: isMobile ? 'bottom' : 'left',
  };
}
```

**Touch Gestures:**
- ✅ Pinch to zoom
- ✅ Two-finger pan
- ✅ Single tap to select marker
- ✅ Double tap to zoom in

---

## 10. Development Roadmap



**Deliverables:**

- ✅ **Project Setup**
  - Initialize Next.js project with TypeScript
  - Configure Tailwind CSS and shadcn/ui
  - Set up ESLint, Prettier, Git hooks

- ✅ **Firebase Configuration**
  - Create Firebase project (region: asia-south1)
  - Enable Firestore, Authentication, Storage, Functions, Hosting
  - Configure Firebase in Next.js
  - Set up Firebase Emulator Suite for local development

- ✅ **Legal & Privacy Foundation**
  - Draft Privacy Policy
  - Draft Terms of Service
  - Create consent management system

- ✅ **Data Schema Design**
  - Finalize all Firestore collections schema
  - Add schemaVersion field to all collections
  - Create schema migration framework
  - Document schema relationships

- ✅ **Development Environment**
  - Set up environment variables (.env.local)
  - Configure CI/CD pipeline (GitHub Actions)
  - Create development, staging, production environments
  - Set up error tracking (Sentry)

**Success Criteria:**
- ✓ Project runs locally with emulators
- ✓ All Firebase services configured
- ✓ Legal pages accessible
- ✓ Schema documented and reviewed
- ✓ CI/CD pipeline working



**Deliverables:**

- ✅ **Authentication System**
  - Email/password authentication
  - Google OAuth integration
  - Email verification flow
  - Password reset flow

- ✅ **Authorization & Roles**
  - Custom claims implementation (user, ngo, admin)
  - Role-based access control (RBAC)
  - Admin assignment Cloud Function
  - First admin account setup script

- ✅ **Firestore Security Rules**
  - Complete security rules for all collections
  - Test rules using emulator
  - Document rule logic
  - Set up automated rule testing

- ✅ **Cloud Functions Foundation**
  - Project structure for Cloud Functions
  - Deploy first functions:
    - `assignAdminRole`
    - `submitOrganization`
    - `approveSubmission`
    - `rejectSubmission`
  - Server-side validation utilities
  - Error handling patterns

- ✅ **Rate Limiting System**
  - Rate limit implementation for all operations
  - Rate limit tracking in Firestore
  - Automated cleanup of expired limits
  - User-friendly error messages

- ✅ **Content Moderation Framework**
  - Profanity filter integration
  - Duplicate detection logic
  - Flagging system for user reports
  - Admin moderation queue

- ✅ **Admin Dashboard MVP**
  - Admin authentication and protection
  - Submission review queue
  - Approve/reject submissions interface
  - Organization management (list, edit, suspend)
  - User management basics
  - Admin activity logging

**Success Criteria:**
- ✓ All security rules pass tests
- ✓ Rate limiting works correctly
- ✓ Admin can review and approve submissions
- ✓ No unauthorized access possible
- ✓ All Cloud Functions deployed and working



**Deliverables:**

- ✅ **Interactive India Map**
  - Google Maps integration
  - Custom markers for different NGO types
  - Marker clustering (similar to Snapchat)
  - Info windows on marker click
  - Smooth pan and zoom
  - Mobile touch gesture support

- ✅ **Map Features**
  - Filter panel (type, state, verified)
  - Real-time map updates on filter change
  - List/Map toggle view
  - Current location button (optional)
  - Search by city/state

- ✅ **Geospatial Search**
  - Add geohash field to organization schema
  - Implement viewport-based queries
  - Create search Cloud Function
  - Optimize for performance

- ✅ **Image Upload Pipeline**
  - Storage bucket organization
  - Upload validation (size, type)
  - Cloud Function trigger for processing:
    - Image compression
    - Thumbnail generation
    - Format conversion (WebP)
    - Metadata extraction
  - Orphaned file cleanup job

- ✅ **Organization Profiles**
  - Profile page layout (responsive)
  - Image gallery with lightbox
  - Contact information display
  - Location map preview
  - Donation needs section
  - Operating hours display
  - Share functionality

- ✅ **Client-Side Caching**
  - React Query setup
  - Cache strategy for org listings
  - Cache strategy for user data
  - Optimistic updates for favorites

- ✅ **Performance Optimization**
  - Image lazy loading
  - Code splitting by route
  - Bundle size analysis
  - Lighthouse audit and fixes
  - Performance monitoring setup

**Success Criteria:**
- ✓ Map displays all NGOs correctly
- ✓ Markers cluster appropriately
- ✓ Filters work in real-time
- ✓ Map performance is smooth (60fps)
- ✓ Images are compressed and optimized
- ✓ Lighthouse performance score > 85
- ✓ Profile pages are fully responsive



**Deliverables:**

- ✅ **Email Integration**
  - SendGrid account setup
  - Email templates:
    - Welcome email
    - Email verification
    - Submission received
    - Submission approved
    - Submission rejected
    - NGO verification approved
    - Admin new submission alert
  - Email sending Cloud Functions
  - Email delivery tracking

- ✅ **Monitoring & Alerting**
  - Sentry integration (frontend)
  - Sentry integration (Cloud Functions)
  - Firebase Performance Monitoring
  - Google Analytics 4 setup
  - Custom event tracking:
    - Map interactions
    - Organization viewed
    - Submission created
    - Review posted
    - Favorite added
  - Error rate alerts (email to admin)
  - Uptime monitoring (UptimeRobot)

- ✅ **Backup System**
  - Automated Firestore exports (Cloud Scheduler)
  - Export to Cloud Storage bucket
  - Retention policy (30 days)
  - Backup verification script
  - Restore procedure documentation
  - Test restore process

- ✅ **Cost Management**
  - Firebase billing alerts (₹1k, ₹3k, ₹5k)
  - Usage dashboard
  - Cost optimization review
  - Quota limits on Cloud Functions

- ✅ **Testing Suite**
  - Unit tests (Jest) for utilities
  - Security Rules tests
  - Cloud Functions tests
  - E2E tests (Playwright):
    - User signup flow
    - Submission flow
    - Map interaction
    - Admin approval flow
  - Load testing (k6):
    - 100 concurrent users
    - Map tile requests
    - Profile views

**Success Criteria:**
- ✓ Emails send successfully
- ✓ Errors are captured in Sentry
- ✓ Daily backups running
- ✓ All critical paths have tests
- ✓ Load tests pass without errors



**Deliverables:**

- ✅ **Beta Preparation**
  - Seed database with 50 verified NGOs (spread across India for map demo)
  - Create test user accounts
  - Beta user invitation system
  - Feedback collection form
  - Bug reporting mechanism

- ✅ **Invite-Only Launch**
  - Limit to 100 users
  - Invite 20 NGOs to register
  - Daily monitoring dashboard
  - Daily stand-up for bug fixes

- ✅ **User Feedback Collection**
  - Weekly feedback survey
  - User interviews (5-10 users)
  - NGO feedback sessions
  - Map usability testing

- ✅ **Iteration & Fixes**
  - Fix P0 bugs immediately
  - Fix P1 bugs within 24 hours
  - Log P2/P3 bugs for post-launch
  - Performance optimizations
  - Map UX improvements based on feedback

- ✅ **Analytics Review**
  - User behavior analysis
  - Feature usage metrics (map vs list view)
  - Conversion funnel analysis
  - Performance bottlenecks
  - Cost per user calculation

**Success Criteria:**
- ✓ Zero P0 bugs
- ✓ < 5 P1 bugs remaining
- ✓ 80%+ submission approval rate
- ✓ Map loads in < 3 seconds
- ✓ Positive feedback from 75%+ beta users
- ✓ Cost under ₹500 for 100 users



**Deliverables:**

- ✅ **SEO Optimization**
  - Sitemap.xml generation (include all org profiles)
  - Robots.txt configuration
  - Meta tags for all pages
  - Open Graph tags
  - Twitter Card tags
  - Structured data (JSON-LD) for organizations
  - Schema markup for reviews
  - Canonical URLs

- ✅ **Content Creation**
  - Homepage content
  - About Us page
  - How It Works page (with map demo)
  - FAQ page
  - Contact page

- ✅ **Launch Materials**
  - Announcement email template
  - Social media posts
  - Demo video showing map feature
  - User guide documentation
  - NGO onboarding guide

- ✅ **Final Security Audit**
  - Penetration testing (basic)
  - Security rules review
  - Environment variable check
  - API key restrictions (Google Maps)
  - Rate limiting verification
  - HTTPS enforcement

- ✅ **Performance Final Check**
  - Lighthouse audit (all pages)
  - Mobile responsiveness testing
  - Cross-browser testing (Chrome, Safari, Firefox, Edge)
  - Load testing (1000 concurrent users)
  - Map performance under load
  - CDN cache verification

- ✅ **Legal Compliance**
  - Privacy Policy final review
  - Terms of Service final review
  - Cookie consent verification
  - GDPR compliance checklist
  - Data export functionality test
  - Account deletion flow test

- ✅ **Launch Checklist**
  - ☐ All environment variables set in production
  - ☐ Firebase project production rules deployed
  - ☐ Custom domain configured with SSL
  - ☐ Email templates tested
  - ☐ Monitoring and alerts active
  - ☐ Backup system verified
  - ☐ Admin accounts created
  - ☐ Support email configured
  - ☐ Documentation complete
  - ☐ Launch announcement ready
  - ☐ Google Maps API production key configured

**Go/No-Go Decision Criteria:**

**MUST HAVE (Go-No-Go):**
- ✓ Zero P0 bugs (data loss, crashes, security)
- ✓ Map loads and displays correctly
- ✓ All security rules tested and deployed
- ✓ Backups running successfully
- ✓ Monitoring and alerts working
- ✓ Legal pages published
- ✓ Admin dashboard fully functional

**SHOULD HAVE (Fix within 1 week):**
- ✓ < 3 P1 bugs
- ✓ Performance score > 85
- ✓ All email templates working
- ✓ Mobile responsiveness on all pages
- ✓ Support contact functional

**NICE TO HAVE (Post-launch):**
- Blog content
- Tutorial videos
- Community guidelines

### Phase 5: Post-Launch (Weeks 10+)
**Duration:** Ongoing  
**Priority:** Medium-High

**Week 1-2 Post-Launch:**

- ✅ **Immediate Monitoring**
  - 24/7 error monitoring
  - Map performance tracking
  - User behavior analysis
  - Server costs tracking

- ✅ **Rapid Response**
  - Fix critical bugs within 4 hours
  - Daily bug triage meetings
  - User support response < 24 hours

- ✅ **Data Collection**
  - User demographics
  - Popular search queries
  - Most viewed organizations
  - Map interaction heatmap
  - Submission quality metrics

**Month 1-3:**

- ✅ **Feature Enhancements**
  - Advanced map filters
  - Save favorite locations
  - User profile customization
  - Review helpfulness voting
  - Map style customization

- ✅ **Content Expansion**
  - Add more verified NGOs manually
  - Create featured collections (e.g., "Top-rated in Maharashtra")
  - Blog posts about featured NGOs
  - Success stories

- ✅ **Community Building**
  - User testimonials
  - NGO success stories
  - Volunteer spotlights
  - Social media presence

**Month 4-6:**

- ✅ **Advanced Features**
  - Volunteer opportunity listings
  - Event management (donation drives)
  - Email notifications for favorites
  - Multi-language support (Hindi)
  - Dark mode for map

- ✅ **Map Enhancements**
  - Heatmap view (density of NGOs)
  - Custom map styles
  - Directions integration
  - Nearby amenities (transit, parking)

---

## 11. Testing Strategy

### 11.1 Testing Pyramid

```
                    ▲
                   / \
                  /   \
                 / E2E \
                /  10%  \
               /_________\
              /           \
             / Integration \
            /      30%      \
           /________________ \
          /                  \
         /       Unit         \
        /        60%           \
       /_______________________ \
```

### 11.2 Unit Testing

**What to Test:**
- Utility functions (validation, sanitization, formatting)
- React component logic
- Cloud Function business logic
- Security Rules
- Map utility functions

**Tools:**
- Jest for test runner
- React Testing Library for components
- Firebase Emulator for Firestore/Auth

**Example Test Cases:**

```typescript
// tests/utils/validators.test.ts
import { validators } from '@/lib/validators';

describe('Phone Validator', () => {
  test('accepts valid Indian phone numbers', () => {
    expect(validators.phone('9876543210')).toBe(true);
    expect(validators.phone('6123456789')).toBe(true);
  });
  
  test('rejects invalid phone numbers', () => {
    expect(validators.phone('123456789')).toBe(false);
    expect(validators.phone('5987654321')).toBe(false);
  });
});

// tests/components/MapMarker.test.tsx
import { render } from '@testing-library/react';
import { MapMarker } from '@/components/MapMarker';

describe('MapMarker', () => {
  test('renders correct icon for NGO type', () => {
    const { container } = render(
      <MapMarker type="orphanage" position={{ lat: 20, lng: 78 }} />
    );
    expect(container.querySelector('img')).toHaveAttribute('src', '/markers/orphanage-marker.svg');
  });
});
```

### 11.3 Integration Testing

**What to Test:**
- API endpoints (Cloud Functions)
- Authentication flows
- Database operations
- File upload pipeline
- Map data loading

**Example Test Cases:**

```typescript
describe('Organization Submission Flow', () => {
  test('creates submission with valid data', async () => {
    const data = {
      name: 'Test NGO',
      type: 'ngo',
      description: 'A test organization',
      contact: { phone: '9876543210' },
      address: { city: 'Jaipur', pincode: '302001' },
      location: { latitude: 26.9124, longitude: 75.7873 }
    };
    
    const result = await submitOrganization(data, {
      auth: { uid: 'testuser' }
    });
    
    expect(result.success).toBe(true);
  });
});
```

### 11.4 End-to-End Testing

**What to Test:**
- Complete user journeys
- Map interactions
- Multi-step workflows

**Example Test Cases:**

```typescript
// tests/e2e/map-interaction.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Interactive Map', () => {
  test('user can explore NGOs on map', async ({ page }) => {
    await page.goto('https://nearbycare.org/map');
    
    // Wait for map to load
    await page.waitForSelector('.gm-style');
    
    // Verify markers are displayed
    const markers = await page.locator('.marker-cluster-custom').count();
    expect(markers).toBeGreaterThan(0);
    
    // Click on a marker
    await page.locator('.marker-cluster-custom').first().click();
    
    // Verify info window appears
    await expect(page.locator('.org-info-card')).toBeVisible();
    
    // Click "View Profile"
    await page.click('text=View Profile');
    
    // Verify navigation to profile page
    await expect(page).toHaveURL(/\/organizations\/.+/);
  });
  
  test('user can filter map by type', async ({ page }) => {
    await page.goto('https://nearbycare.org/map');
    
    // Open filter panel
    await page.click('[data-testid="filter-button"]');
    
    // Select orphanage filter
    await page.check('input[value="orphanage"]');
    
    // Verify only orphanage markers shown
    const markers = await page.locator('.marker[data-type="orphanage"]').count();
    expect(markers).toBeGreaterThan(0);
  });
});
```

### 11.5 Load Testing

**What to Test:**
- Concurrent map tile requests
- Database query performance
- API response times
- Map rendering under load

**Example Script:**

```javascript
// tests/load/map-load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 50 },
    { duration: '5m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // Test map API endpoint
  const mapRes = http.get('https://nearbycare.org/api/organizations', {
    params: {
      bounds: '20,70,30,80',
    },
  });
  
  check(mapRes, {
    'map data loads': (r) => r.status === 200,
    'returns organizations': (r) => JSON.parse(r.body).organizations.length > 0,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });
  
  sleep(Math.random() * 3 + 2);
}
```

---

## 12. Deployment & Operations

### 12.1 Environment Setup

**Three Environments:**

1. **Development (Local)**
   - Firebase Emulator Suite
   - Local Next.js server
   - Test data
   - .env.local

2. **Staging**
   - Firebase project: nearbycare-staging
   - Domain: staging.nearbycare.org
   - Real Firebase services
   - .env.staging

3. **Production**
   - Firebase project: nearbycare-prod
   - Domain: nearbycare.org
   - Real Firebase services
   - .env.production

### 12.2 CI/CD Pipeline

**GitHub Actions Workflow:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase

on:
  push:
    branches:
      - main        # Deploy to production
      - staging     # Deploy to staging

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: nearbycare-prod
          channelId: live
```

### 12.3 Monitoring & Alerts

**Real-Time Monitoring Dashboard:**

**Metrics to Track:**
- Performance Metrics:
  - Average response time
  - P95/P99 response time
  - Error rate
  - Map load time
  - Cloud Function execution time

- Business Metrics:
  - Active users (hourly/daily)
  - New signups
  - Submissions received
  - Organizations created
  - Map interactions
  - Profile views

- Cost Metrics:
  - Current day spend
  - Projected month spend
  - Google Maps API usage
  - Firestore operations count
  - Storage usage

**Alert Configuration:**

**Critical Alerts (Immediate Response):**
- Error rate > 5% for 5 minutes → Email + SMS
- Map not loading for 10 minutes → Email
- Site down (uptime check failed) → Email + SMS

**Warning Alerts (Review within 1 hour):**
- Error rate > 1% for 15 minutes → Email
- Slow map load (> 5s) → Email
- Unusual traffic spike (3x normal) → Email

---

## 13. Cost Management

### 13.1 Firebase Pricing Breakdown

#### Free Tier (Spark Plan)

**Suitable for:** Development and early testing

```
Firestore:
├─ Stored data: 1 GB
├─ Document reads: 50,000/day
├─ Document writes: 20,000/day
└─ Document deletes: 20,000/day

Cloud Functions:
├─ Invocations: 2M/month
├─ GB-seconds: 400,000/month
└─ Outbound networking: 5 GB/month

Storage:
├─ Stored: 5 GB
└─ Downloaded: 1 GB/day

Hosting:
├─ Stored: 10 GB
└─ Transfer: 360 MB/day

TOTAL COST: ₹0/month
```

#### Blaze Plan (Pay-as-you-go)

**Estimated costs for different scales:**

**Small Scale (1,000-5,000 daily users):**

```
Firestore:
├─ 150M reads @ $0.06/100K = $90
├─ 50M writes @ $0.18/100K = $90
└─ Subtotal: $180/month (~₹15,000)

Cloud Functions:
└─ Subtotal: $5/month (~₹440)

Storage:
└─ Subtotal: $15/month (~₹1,250)

Hosting:
└─ Subtotal: $15/month (~₹1,250)

SendGrid (40k emails):
└─ $15/month (~₹1,250)

Google Maps API:
├─ 10K geocoding: $50
├─ 50K map loads (free tier: $200 credit)
└─ Subtotal: $0/month (within free tier)

TOTAL: ~₹19,000/month
```

**Medium Scale (10,000-20,000 daily users):**

```
Total: ~₹59,500/month
```

### 13.2 Cost Optimization Strategies

**Firestore Optimization:**
- Create only necessary indexes
- Use pagination (limit queries)
- Cache frequently accessed data
- Store aggregations (viewCount, etc.)
- **Estimated savings: 40-50%**

**Map API Optimization:**
- Enable map tile caching
- Use static map images where appropriate
- Lazy load map on scroll
- **Estimated savings: 30-40%**

**Cloud Functions Optimization:**
- Use appropriate memory allocation
- Batch operations where possible
- Regional deployment (asia-south1)
- **Estimated savings: 20-30%**

**Storage Optimization:**
- Compress images to WebP
- Use CDN caching
- Delete orphaned files
- **Estimated savings: 60-70%**

### 13.3 Budget Alerts

**Alert Configuration:**

```javascript
Alerts:
1. Daily Budget Alert
   ├─ Threshold: ₹1,000/day
   └─ Action: Email to admin

2. Monthly Budget Alerts
   ├─ 50% of budget: ₹25,000 → Email
   ├─ 80% of budget: ₹40,000 → Email + Review
   └─ 100% of budget: ₹50,000 → Alert + Throttle

3. Service-Specific Alerts
   ├─ Google Maps API > $150/month → Email
   ├─ Firestore reads > 5M/day → Email
   └─ Unusual spike (3x average) → Immediate email
```

---

## 14. Legal & Compliance

### 14.1 Privacy Policy Requirements

**Must Include:**

1. **Data Collection**
   - What: Email, name, phone, location, usage data
   - How: Direct input, cookies, third-party services
   - Why: Service provision, improvement, security

2. **Data Usage**
   - Service provision
   - Platform improvement
   - Communication with users
   - Legal compliance

3. **Data Sharing**
   - We DO NOT sell personal data
   - Third-party services:
     - Firebase (Google) - Hosting & database
     - SendGrid - Email delivery
     - Google Maps - Location services
     - Sentry - Error tracking

4. **User Rights (GDPR & Indian IT Act)**
   - Access your data
   - Correct inaccurate data
   - Delete your data
   - Export your data
   - Withdraw consent

5. **Data Security**
   - Encryption (in transit & at rest)
   - Access controls
   - Regular security audits

6. **International Data Transfers**
   - Data stored in India (asia-south1)
   - Adequate protection measures

7. **Contact Information**
   - Privacy concerns contact
   - Physical address

### 14.2 Terms of Service

**Key Sections:**

1. **Acceptance of Terms**
2. **User Accounts** (18+, security, prohibited activities)
3. **User Content** (ownership, license, prohibited content)
4. **Organization Listings** (verification, accuracy, liability)
5. **Intellectual Property**
6. **Disclaimers** ("As-is" service, no warranty)
7. **Limitation of Liability**
8. **Dispute Resolution** (Indian law, Jaipur courts)
9. **Termination**
10. **Contact & Grievances**

### 14.3 Indian IT Act Compliance

**Key Requirements:**

1. **Reasonable Security Practices (Section 43A)**
   - ✓ Implement encryption
   - ✓ Regular security audits
   - ✓ Access controls
   - ✓ Incident response plan

2. **Privacy Policy (Rule 4)**
   - ✓ Clear and accessible
   - ✓ Users must consent

3. **Grievance Officer (Rule 3)**
   - ✓ Appoint grievance officer
   - ✓ Publish contact details
   - ✓ Acknowledge complaints within 24 hours
   - ✓ Resolve within 30 days

4. **Data Localization**
   - ✓ Store user data in India (asia-south1)

---

## 15. Learning Objectives

### 15.1 Technical Skills

**By completing this project, you will master:**

**Frontend Development:**
- ✓ Next.js 14+ (App Router, SSR, SSG)
- ✓ React Advanced Patterns
- ✓ State Management (React Query)
- ✓ Form Handling (React Hook Form + Zod)
- ✓ **Google Maps Integration**
- ✓ **Geospatial UI Development**
- ✓ Responsive Design
- ✓ Accessibility (a11y)

**Backend Development (Serverless):**
- ✓ Firebase Ecosystem
- ✓ Cloud Functions
- ✓ NoSQL Database Design
- ✓ **Geospatial Queries**
- ✓ Security Rules
- ✓ Rate Limiting

**DevOps & Infrastructure:**
- ✓ CI/CD Pipelines
- ✓ Monitoring & Observability
- ✓ Backup & Recovery
- ✓ Cost Management

**API Integration:**
- ✓ **Google Maps API (Geocoding, Map rendering)**
- ✓ SendGrid (Email)
- ✓ Sentry (Error tracking)

### 15.2 Software Engineering Practices

**Principles & Patterns Learned:**
- ✓ Serverless architecture
- ✓ Security best practices
- ✓ Testing strategies
- ✓ Clean code principles
- ✓ Project management

### 15.3 Portfolio & Career Benefits

**What This Project Demonstrates:**
- ✓ Full-stack development capability
- ✓ Cloud/serverless architecture expertise
- ✓ **Geospatial/mapping expertise**
- ✓ Production-ready code quality
- ✓ Real-world problem solving
- ✓ Social impact orientation

**Resume Highlights:**
- "Built scalable serverless platform with interactive India map serving X users"
- "Implemented geospatial search with custom clustering and filtering"
- "Designed NoSQL database schema for location-based queries"
- "Optimized map performance achieving < 3s initial load"

---

## 16. Next Steps & Future Enhancements

### 16.1 Phase 6: Advanced Features (Post-Launch)

**Priority 1: Enhanced Map Features**
- Heatmap view (NGO density visualization)
- Custom map styles/themes
- Offline map support (PWA)
- Street view integration
- Satellite view toggle

**Priority 2: Volunteer Management**
- Volunteer opportunity listings
- Application system
- Skill-based matching
- Hour tracking
- Certificates generation

**Priority 3: Event Management**
- Donation drives on map
- Fundraising campaigns
- Event calendar
- RSVP system
- Live event tracking

**Priority 4: Advanced Search**
- Algolia integration for instant search
- Typo-tolerance
- Faceted search
- Search analytics
- Personalized results

### 16.2 Partnership Opportunities

**Corporate CSR Partnerships:**
- Easy discovery of verified NGOs
- Transparent donation tracking
- Employee engagement platform

**Government Integration:**
- API integration with NGO Darpan
- Auto-verification of registered NGOs
- Government grants tracking

**University Partnerships:**
- NSS/NCC activity tracking
- Student volunteer hours
- Skill-based volunteering

### 16.3 Sustainability Plan

**Long-Term Viability:**

**100% Free Platform - How We'll Sustain:**

1. **Minimal Infrastructure Costs**
   - Serverless = pay only for usage
   - Target: < ₹20,000/month for 10K users
   - Firebase free tier covers initial growth

2. **Funding Sources (Optional, Future):**
   - Social impact grants
   - Government partnerships
   - CSR sponsorships (cover operating costs)
   - Community donations (optional)

3. **Community-Driven**
   - Open source components
   - Volunteer moderators
   - User-contributed content
   - Ambassador program

**Commitment: Platform remains 100% free for all NGOs and users, forever.**

---

## 17. Appendix

### 17.1 Glossary

- **API**: Application Programming Interface
- **CDN**: Content Delivery Network
- **CI/CD**: Continuous Integration/Continuous Deployment
- **CSR**: Corporate Social Responsibility
- **GDPR**: General Data Protection Regulation
- **Geohash**: Geocoding system that divides map into grid
- **JWT**: JSON Web Token
- **MVP**: Minimum Viable Product
- **NGO**: Non-Governmental Organization
- **NoSQL**: Not Only SQL (database type)
- **PWA**: Progressive Web App
- **RBAC**: Role-Based Access Control
- **SEO**: Search Engine Optimization
- **SSR**: Server-Side Rendering

### 17.2 Useful Resources

**Firebase Documentation:**
- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Data Model](https://firebase.google.com/docs/firestore/data-model)
- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Security Rules Reference](https://firebase.google.com/docs/rules)

**Next.js Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)

**Google Maps API:**
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Geocoding API](https://developers.google.com/maps/documentation/geocoding)
- [React Google Maps](https://react-google-maps-api-docs.netlify.app/)

**Testing Resources:**
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Docs](https://playwright.dev/)





### 17.4 License

```
MIT License

Copyright (c) 2025 Govind Bagla

Permission is hereby granted, free of charge, to any person obtaining 
a copy of this software and associated documentation files (the 
"Software"), to deal in the Software without restriction, including 
without limitation the rights to use, copy, modify, merge, publish, 
distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to 
the following conditions:

The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

### 17.5 Acknowledgments

This project was inspired by:
- The need for better NGO discoverability in India
- Countless small organizations doing impactful work in silence
- Volunteers who want to help but don't know where to start
- The vision of a more connected, compassionate community

**Built with ❤️ for social impact. 100% Free. Forever.**

---


### Key Features:
✅ **Interactive India Map** - Snapchat-style visual exploration of NGOs  
✅ **Custom Markers** - Color-coded by organization type  
✅ **Smart Clustering** - Groups nearby markers for better UX  
✅ **Real-Time Filtering** - Instant map updates  
✅ **Serverless Architecture** - Scalable and cost-effective  
✅ **100% Free** - No monetization, pure social impact  
✅ **Web-Only** - No mobile app (currently)  

