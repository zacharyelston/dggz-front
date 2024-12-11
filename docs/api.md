# API Integration

## Endpoints

### Grid Generation
```typescript
POST /generate
Body: DGGRIDSpec
Response: GridData
```

### Grid Loading
```typescript
GET /grids/:id
Response: GridData
```

### Specification Management
```typescript
POST /specs
Body: DGGRIDSpec
Response: { id: string }
```

## Mock Data
Development mode includes mock data generation:
- Realistic grid patterns
- Configurable parameters
- Statistical distributions
- Performance testing