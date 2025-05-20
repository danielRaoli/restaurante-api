const authRoutes = () => {
    const router = require('express').Router();
    const authController = require('../controllers/auth.controller');

    router.post('/', authController.login);

    return router;
};

export default authRoutes;