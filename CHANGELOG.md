# Changelog

## [2.1.0] - 2026-08-31

The last release supporting uppy v5. See 3.0.0 for uppy v6.

- Fixes the `limit` option, which threw `TypeError: this.limitUploads is not a
  function` for any non-zero value. The call site expects a function that wraps
  an action, which is what `wrapPromiseFunction` returns, but the queue instance
  itself was assigned instead.
- `upload-progress` now emits `uploadStarted` rather than `uploader`, matching
  the `FileProgressStarted` shape uppy documents. Uppy core reads neither key,
  so this changes no behaviour. Thanks @tumes (#2).
- Bumps `@paralleldrive/cuid2` to 3.x. Note that it is now ESM-only
  (`"type": "module"`), where 2.x also resolved as CommonJS.

## [2.0.0] - 2025-08-25

- Adds support for uppy version 5
