# Getting Started

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Building

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # React components
│   ├── Analysis/      # Grid analysis components
│   ├── GridList/      # Grid management components
│   ├── Help/          # Help and documentation components
│   ├── SpecEditor/    # Grid specification editor
│   ├── Viewer/        # 3D viewer components
│   └── ui/            # Reusable UI components
├── services/          # API and external services
├── store/             # State management
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Configuration

The application can be configured through environment variables:

- `VITE_API_URL`: Backend API URL (default: http://localhost:3000)
- `USE_MOCK`: Toggle mock data for development (in api.ts)