# uppy-activestorage-upload

<img src="https://uppy.io/img/logo.svg" width="120" alt="Uppy logo: a smiling puppy above a pink upwards arrow" align="right">

The ActiveStorage Upload plugin handles Ruby on Rails ActiveStorage direct uploads with Uppy.<br><br><br>

## Example

Add this line to your HEAD tag.

```erb
<%= tag.meta name: "direct-upload-url", content: rails_direct_uploads_path %>
```
In a Rails API environment you can get the aforementioned value with `Rails.application.routes.url_helpers.rails_direct_uploads_path`, it's usually something like `"/rails/active_storage/direct_uploads"`. Add a full URL for `directUploadUrl` later, if necessary.

Then use `ActiveStorageUpload` as an Uppy plugin in your Javascript pack.

```js
import Uppy from '@uppy/core'
import ActiveStorageUpload from '@gothassos/uppy-activestorage-upload'

let uppy = new Uppy(options)
uppy.use(ActiveStorageUpload, {
  directUploadUrl: document.querySelector("meta[name='direct-upload-url']").getAttribute("content")
})
```

## Installation

```bash
yarn add @gothassos/uppy-activestorage-upload
# or
npm install @gothassos/uppy-activestorage-upload --save
```

We recommend installing from yarn and then using a module bundler such as [esbuild](https://esbuild.github.io/).

### Requirements

| This plugin | Uppy |
| ----------- | ---- |
| `3.x`       | `@uppy/core` v6 |
| `2.x`       | `@uppy/core` v5 |
| `1.x`       | `@uppy/core` v4 |

`2.0.0` is the one exception: it shipped with a stale `@uppy/core: ^4.4.4`
peer range, corrected in `2.0.1`. On uppy v5, pin `^2.0.1` rather than `^2.0.0`.

## License

[The MIT License](./LICENSE).
