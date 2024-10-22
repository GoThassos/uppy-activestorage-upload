import { Controller } from "@hotwired/stimulus"
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import ActiveStorageUpload from '@gothassos/uppy-activestorage-upload'

// Example HTML for Uppy with ActiveStorage
//
// <div data-controller="uppy" data-uppy-field-name-value="photo[image]">
//   <img data-uppy-target="preview" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpj0DBTVsaja01_xWh37bcutvpd7rh7zEd528HD0d_l6A73osY" width="280" data-behavior="uppy-preview" />
//   <button type="button" data-uppy-target="trigger">Upload</button>
// </div>

export default class extends Controller {
  // Adds Uppy loads for a form field
  // If a preview target (img tag) is available, sets the src to the uploaded image
  // Adds or updates the field target in the form

  static targets = ["trigger", "preview", "field"]
  static values = {
    fieldName: { type: String, default: "uppy-image" }
  }

  connect() {
    this.uppy = new Uppy({
      autoProceed: true,
      allowMultipleUploads: false,
      logger: this.debugLogger
    })

    this.uppy.use(ActiveStorageUpload, {directUploadUrl: this.directUploadUrl})
    this.uppy.use(Dashboard, {trigger: this.triggerTarget})
    this.uppy.on('complete', this.complete.bind(this))
  }

  complete(result) {
    result.successful.forEach(file => {
      this.appendFileField(file)
      this.setPreview(file)
    })
  }

  appendFileField(file) {
    // If we already have a field target, update it's value
    // This prevents submitting multiple values for the same field
    if (this.hasFieldTarget) {
      this.fieldTarget.setAttribute("value", file.response.signed_id)
    } else {
      const field = document.createElement("input")
      field.setAttribute("type", "hidden")
      field.setAttribute("data-uppy-target", "field")
      field.setAttribute("name", this.fieldNameValue)
      field.setAttribute("data-pending-upload", true)
      field.setAttribute("value", file.response.signed_id)
      this.element.appendChild(field)
    }
  }

  setPreview(file) {
    if (this.hasPreviewTarget) {
      let src = (file.preview) ? file.preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpj0DBTVsaja01_xWh37bcutvpd7rh7zEd528HD0d_l6A73osY"
      this.previewTarget.src = src
    }
  }

  get debugLogger() {
    return {
      debug: (...args) => console.debug(`[Uppy]`, ...args),
      warn: (...args) => console.warn(`[Uppy]`, ...args),
      error: (...args) => console.error(`[Uppy]`, ...args),
    }
  }

  get directUploadUrl() {
    return document.querySelector("meta[name='direct-upload-url']").getAttribute("content")
  }
}
