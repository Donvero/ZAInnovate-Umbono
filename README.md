# Umbono

Offline-first learning software for South African learners in low-bandwidth environments.

Umbono delivers DBE CAPS-aligned STEM learning, multilingual support, local caching, and synchronisation that can recover when connectivity is intermittent. The product is designed for phones, tablets, and low-cost computers used at home, school, or community access points.

## Current scope

- PWA shell with service-worker caching.
- IndexedDB-backed local learning state.
- Deterministic progress and sync status.
- English, isiXhosa, isiZulu, and Afrikaans content paths.
- Retrieval and language-ontology utilities covered by unit tests.

The current interface includes representative lesson data while the content and learner services are being wired to persistent storage. Do not present sample lessons, learner names, data-savings figures, or tutor answers as production facts.

## Development

```bash
npm ci
npm run dev
npm test
npm run build
```

Test offline behavior with the network disabled. Confirm that essential content remains readable, pending work is visible, sync failures are recoverable, and the UI does not claim that a server action completed when it did not.

## Engineering rules

- Treat connectivity loss as normal, not exceptional.
- Keep sync ordering deterministic and idempotent.
- Store only the minimum learner data required.
- Keep curriculum mapping traceable to its source.
- Use synthetic data in tests and demos.
- Make language and regional context explicit in content and interfaces.

## License

See `LICENSE`.
