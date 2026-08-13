# CriderSafe Platform

CriderSafe is a prototype school-safety operations platform designed around local-first processing, human-reviewed AI alerts, environmental sensing, and compatible camera integrations.

## Current prototype

The repository currently contains the first version of **CriderSafe Command**, a responsive Next.js dashboard using simulated data. It demonstrates:

- school/campus operations overview
- Vision camera health
- Air sensor health
- active incident queue
- simulated campus zone view
- AI confidence and sensor-fusion signals
- incident acknowledgement interaction
- human-review messaging
- local-first/privacy-by-design positioning

All current incidents, people, devices, counts, and readings are simulated. No real school data is stored in this prototype.

## Planned components

- **CriderSafe Command** — administrator and safety-operations dashboard
- **CriderSafe Vision** — camera/vision inference service
- **CriderSafe Air** — environmental and vape-event sensor platform
- **CriderSafe Core** — event bus, permissions, device management, incident processing, and APIs
- **CriderSafe OS** — future deployable server/device operating environment

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Supabase planned for prototype authentication/data services
- local/on-premise deployment architecture planned for production school deployments

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production build:

```bash
npm run build
npm start
```

## Prototype safety and privacy principles

1. AI alerts require human review before disciplinary or safety decisions.
2. Restroom concepts do not use cameras.
3. Production camera inference should support local/on-premise processing where possible.
4. Raw school data should be separated by tenant and protected with strict authorization policies.
5. The prototype must never be represented as a finished or validated safety product.

## Next milestone

Connect the dashboard to a prototype Supabase project with tenant-aware tables for schools, sites, devices, incidents, incident signals, and audit events while keeping the existing simulator available for demos.
