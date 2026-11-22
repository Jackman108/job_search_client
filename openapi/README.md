# OpenAPI snapshot (E4)

Copied from backend `yarn openapi:export` → `openapi/openapi.json`.

```bash
# from backend
yarn openapi:export
# then in client (sibling checkout)
copy ..\backend\openapi\openapi.json openapi\openapi.json
yarn api:gen
yarn api:check
```

Types: `src/shared/api/generated/schema.d.ts`.
