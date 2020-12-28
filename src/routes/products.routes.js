import { Router } from "express";
const router = Router();

import * as productsCtrl from "../controllers/products.controller";
import { authJwt } from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isModerator] ,productsCtrl.createProduct)
router.get('/', productsCtrl.getProducts)
router.get('/:productId', productsCtrl.getProductById)
router.put('/:productId', authJwt.verifyToken, productsCtrl.updateProductById)
router.delete('/:productId', authJwt.verifyToken , productsCtrl.deleteProductById)
  
export default router; 