# Changelog

## [3.0.1] - 2026-08-31

- Cancelling a file now actually stops the upload. `upload.abort()` was only ever
  guarded with `&&` because `DirectUpload` has no such method, so `file-removed`,
  `upload-cancel` and `cancel-all` stopped the timeout timer and let the transfer
  run to completion. The XHR handed to `directUploadWillStoreFileWithXHR` is kept
  and aborted instead. ActiveStorage hands that request over before calling
  `send()` on it, where `abort()` does nothing, so an abort that arrives during
  the blob-record request is deferred until the transfer is in flight. The
  blob-record request itself is not reachable and still completes, so an
  unattached blob can be left behind for `ActiveStorage::Blob.unattached` cleanup
  to purge.
- The upload promise now settles when an upload is aborted. ActiveStorage
  registers only `load` and `error` on that request, and an abort fires neither,
  so its callback never ran: `uppy.upload()` stayed pending forever and `complete`
  never fired. The plugin listens for `abort` itself and settles there.
- Fixes `Can't set state for <file id> (the file could have been removed)`, an
  uncaught error thrown when an upload called back for a file uppy no longer
  held. The callback now returns quietly for a cancelled or removed file rather
  than calling `setFileState` on it, and emits neither `upload-success` nor
  `upload-error` for it.
- The `file-removed`, `upload-cancel` and `cancel-all` listeners registered for
  each upload are now removed once that upload settles, on every path including
  timeouts, instead of one set per file accumulating on the uppy instance for as
  long as it lives.
- Fixes `TypeError: self.i18n is not a function`, thrown by every upload timeout.
  `BasePlugin` only initialises `i18n` from `setOptions()`, which this plugin
  never calls, so the timeout could not even build its own error message. The
  timeout now aborts the transfer and reports `upload-error` as intended.

## [3.0.0] - 2026-08-31

- Adds support for uppy version 6
- **Breaking:** requires `@uppy/core` v6. `RateLimitedQueue` is now imported from
  `@uppy/core/utils`, since uppy v6 merged `@uppy/utils` into `@uppy/core`. That
  subpath does not exist in v5, so stay on 2.x for uppy v5.
- Updates the TypeScript declarations, which referenced `Plugin` and
  `PluginOptions` — exports that exist in neither v5 nor v6 — typed `limit` as a
  string and declared a `bundle` option the plugin never had.

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
