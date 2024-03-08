import express from 'express'
import { UserController } from '../Controllers/UserController.js'
import { ProductController } from '../Controllers/ProductController.js'
import { authToken } from '../helpers/authToken.js'

const Routes = express.Router()

// Rotas publicas
Routes.get('/', UserController.getUsers)
Routes.post('/register', UserController.createUser)
Routes.post('/login', UserController.loginUser)

// Rotas protegidas
Routes.get('/products', authToken, ProductController.getProducts)
Routes.get('/products:id', authToken, ProductController.getProductById)
Routes.post('/products', authToken, ProductController.createProducts)
Routes.delete('/products/:id', authToken, ProductController.deleteProduct)
Routes.put('/products/:id', authToken, ProductController.editProduct)

export default Routes