import { Router } from "express";
import usuariosController from "../controllers/usuarios.controller.js";

const router = Router();

//Rutas para Agregar
router.get('/add', usuariosController.mostrarFormularioAdd);
router.post("/add", usuariosController.guardarUsuario);

//Ruta para Listar
router.get("/list", usuariosController.listarUsuarios);

//Rutas para Editar
router.get('/edit/:id', usuariosController.mostrarFormularioEdit);
router.post('/edit/:id', usuariosController.actualizarUsuario);

//Ruta para Eliminar
router.get('/delete/:id', usuariosController.eliminarUsuario);

//Ruta para Mostrar Dashboard
router.get('/dashboard', usuariosController.mostrarDashboard);

export default router;