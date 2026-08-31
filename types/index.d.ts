import type { Body, DefinePluginOpts, Meta, PluginOpts, Uppy } from '@uppy/core';
import { BasePlugin } from '@uppy/core';

export interface ActiveStorageUploadOptions extends PluginOpts {
  /** Rails direct uploads endpoint, e.g. `/rails/active_storage/direct_uploads`. */
  directUploadUrl: string;
  /** Maximum number of simultaneous uploads. `0` disables limiting. Defaults to `0`. */
  limit?: number;
  /** Abort an upload if no progress is reported for this many milliseconds. Defaults to `30000`. */
  timeout?: number;
}

type Opts = DefinePluginOpts<ActiveStorageUploadOptions, 'limit' | 'timeout'>;

export default class ActiveStorageUpload<
  M extends Meta = Meta,
  B extends Body = Body,
> extends BasePlugin<Opts, M, B> {
  constructor(uppy: Uppy<M, B>, opts: ActiveStorageUploadOptions);
  install(): void;
  uninstall(): void;
}
