const express = require('express')

const routes = express.Router()

const AnnotationController = require('../controllers/AnnotationController')
const ContentController = require('../controllers/ContentController')
const PriorityController = require('../controllers/PriorityController')

//ROTAS DO CRUD
routes.get('/annotations', AnnotationController.read )
routes.post('/annotations', AnnotationController.create)
routes.delete('/annotations/:id', AnnotationController.delete)

//ROTA PRIOTRITY
routes.get('/priorities', PriorityController.read)
routes.post('/priorities/:id', PriorityController.update)

//ROTA CONTENT
routes.post('/contents/:id', ContentController.update)


module.exports = routes

