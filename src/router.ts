import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product'
import { createUpdate, deleteUpdate, getUpdate, updateOne, updateUpdate } from './handlers/update'

const router = Router()

/**
 * products
 */
router.get('/product', getProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id', body("name").isString(), handleInputErrors, updateProduct)
router.post('/product', body("name").isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Update
 */
router.get('/update', getUpdate)
router.get('/update/:id', updateOne)

router.put('/update/:id',
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
    updateUpdate)

router.post('/update',
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(), createUpdate)

router.delete('/update/:id', deleteUpdate)

/**
 * Update Point
 */
router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id', body(["name", "description"]).optional().isString(), () => { })
router.post('/updatepoint',
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(), () => { })
router.delete('/updatepoint/:id', () => { })

router.use((err, req, res) => {
    console.log(err)
    res.json({ message: "user error" })
})
export default router