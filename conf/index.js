const path = require("path")

const PORT = 9083
const HOST = "localhost"
const HOST_PROD = 'diktio.xyz'
const PATH_SRC = path.join(__dirname, "../src")
const PATH_BUILD = path.join(__dirname, "../dist")
const ENTRY_FILE = path.join(__dirname, "../src/index.js")
const ENTRY_HTML_FILE = path.join(__dirname, "../src/index.html")

module.exports = {
    PORT,
    HOST,
    HOST_PROD,
    PATH_SRC,
    PATH_BUILD,
    ENTRY_FILE,
    ENTRY_HTML_FILE
}