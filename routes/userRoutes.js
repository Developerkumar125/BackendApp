// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoriesController');
const subcategoryController = require('../controllers/subcategoriesController');
const productController = require('../controllers/productsController');
const upload = require('../middleware/upload');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/loginController')

const roleController = require('../controllers/rolesController')

const { AdminauthMiddleware, userAuthMiddleware, combinedAuthMiddleware } = require('../middleware/authMiddleware');
 
//routing for User
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


//routing for categories
router.get('/categories', combinedAuthMiddleware, categoryController.getCategories);
router.get('/categories/:id', combinedAuthMiddleware, categoryController.getCategory);
router.post('/categories', AdminauthMiddleware, categoryController.createCategory);
router.put('/categories/:id', AdminauthMiddleware, categoryController.updateCategory);
router.delete('/categories/:id', AdminauthMiddleware, categoryController.deleteCategory);

//routing for subCategories
router.get('/subcategories', subcategoryController.getSubcategories);
router.get('/subcategories/:id', combinedAuthMiddleware, subcategoryController.getSubcategory);
router.post('/subcategories', AdminauthMiddleware, subcategoryController.createSubcategory);
router.put('/subcategories/:id', AdminauthMiddleware, subcategoryController.updateSubcategory);
router.delete('/subcategories/:id', AdminauthMiddleware, subcategoryController.deleteSubcategory);

//routing for products
router.get('/products', combinedAuthMiddleware, productController.getProducts);
router.get('/products/:id', combinedAuthMiddleware, productController.getProduct);
router.post('/products', AdminauthMiddleware, upload.array('images', 4), productController.createProduct);
router.put('/products/:id', AdminauthMiddleware, upload.array('images', 4), productController.updateProduct);
router.delete('/products/:id', AdminauthMiddleware, productController.deleteProduct);



// router.get('/admin', adminController.getAdmins);
// router.get('/admin/:username', adminController.getAdmin);
router.post('/admin', adminController.createAdmin);
router.put('/admin/:username', adminController.updateAdmin);
// router.delete('/admin/:username', adminController.deleteAdmin);


router.post('/admin/login', authController.Adminlogin);
router.post('/user/login', authController.userlogin)


//routing for roles
router.post('/postroles', AdminauthMiddleware, roleController.createdRoles);
router.get('/getroles',AdminauthMiddleware, roleController.getAllRoles);
router.get('/get/:id',AdminauthMiddleware, roleController.getRoleById);
router.put('/update/:id',AdminauthMiddleware, roleController.updateRole);
router.delete('/delete/:id',AdminauthMiddleware, roleController.deleteRole)
module.exports = router;
