/** Inicio de aplicacion */

import app from "./app"
import "./database"
let port = 3000
app.listen(port)
console.log('Server listen on port', port)