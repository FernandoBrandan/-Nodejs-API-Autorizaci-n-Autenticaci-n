/** Inicio de express */

const express =  require('express')
const morgan = require('morgan')

import pkg from '../package.json'
import { createRoles } from './libs/init'
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/user.routers'

const app = express()
createRoles()
app.set('pkg', pkg)

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json({
        "name" : app.get('pkg').name,
        "author" : app.get('pkg').author,       
        "version" : app.get('pkg').version,
        "description" : app.get('pkg').description
    })
})

app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)


export default app
