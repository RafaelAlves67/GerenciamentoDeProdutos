import db from './data/db.js'
import express from 'express'
import UserRoutes from './Routes/Routes.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())


// Routes
app.use('/', UserRoutes)


app.listen(3000, () => {console.log("Servidor rodando na porta 3000!")})



