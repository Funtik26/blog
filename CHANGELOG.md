# Changelog

## 2025-11-04

- Replaced pliny-provided newsletter widgets with local client components to avoid hydration mismatches and keep SSR markup stable.
- Simplified the mobile navigation drawer to rely solely on Headless UI transitions, removing the `body-scroll-lock` dependency.
- Upgraded DocSearch to `@docsearch/react@4.3.1` (and related packages) and patched third-party peers (`pliny`, `kbar`, `react-virtual`) for React 19 compatibility.
- Added `suppressHydrationWarning` guarding on newsletter form fields to account for browser autofill styles.
