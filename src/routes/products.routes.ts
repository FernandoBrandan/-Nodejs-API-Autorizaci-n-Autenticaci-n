const {Router} =  require('express')
const router = Router()

import * as productController from '../controllers/products.controller'
import { authJwt } from "../middleware";

router.get('/', productController.getProducts)
router.get('/:productId', productController.getProductById)
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator], productController.createProduct) 
router.put('/:productId', [authJwt.verifyToken],productController.updateProductById)
router.delete('/:productId', [authJwt.verifyToken], productController.deleteProductById)


export default router