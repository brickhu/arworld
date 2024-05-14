const path = require("path");

module.exports = {
  titleBarStyle: 'hidden',
  titleBarOverlay: true,
  width: 1024,
  height: 768,
  webPreferences: {
    preload: path.join(__dirname, "preload.js")
  },
  vibrancy: 'sidebar',
  visualEffectState: "active"
}