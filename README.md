# Tanstack Start Vitest repro

I want to use vitest to run integration tests against public api routes.

To do so, I created a small helper to forge `Request` objects to feed to the `defaultAPIFileRouteHandler`.

It works at runtime, when I tried to manually run my helper against the router.

However, when ran isolatedly in vitest, I get the following error:
```
 FAIL  app/test/hello.e2e.test.ts [ app/test/hello.e2e.test.ts ]
Error: Package subpath './routes' is not defined by "exports" in /home/potb/projects/potb/tanstack-start-vitest-repro/node_modules/vinxi/package.json imported from /home/potb/projects/potb/tanstack-start-vitest-repro/node_modules/@tanstack/start/dist/esm/api/index.js
```

I suspect this is because vitest does not have the same vite plugins (and thus modules) at runtime.

## To repro

- `npm ci`
- `npm run test`
