import UsuariosDAO from "../daos/usuarios.dao.js";

const usuariosController = {};

//1. Mostrar formulario de agregar
usuariosController.mostrarFormularioAdd = (req, res) => {
    res.render("usuarios/add");
};

//2. Procesar el formulario de agregar (POST) - ACTUALIZADO
usuariosController.guardarUsuario = async (req, res, next) => {
    try {
        const { name, lastname, user, correo, categoria, estado } = req.body;
        
        await UsuariosDAO.crear({ 
            name, 
            lastname, 
            user, 
            correo,
            categoria: categoria || 'Cliente', 
            estado: estado || 'Activo',
            created_at: new Date()
        });
        
        res.redirect('/list');
    } catch (err) {
        next(err);
    }
};

//3. Listar usuarios con nuevas columnas
usuariosController.listarUsuarios = async (req, res) => {
    try {
        const personas = await UsuariosDAO.listarTodos();
        res.render('usuarios/list', { personas }); 
    } catch (err) {
        res.status(500).send("Error al obtener la lista");
    }
};

//4. Mostrar formulario de edición
usuariosController.mostrarFormularioEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UsuariosDAO.obtenerPorId(id);
        res.render("usuarios/edit", { persona: usuario });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//5. Actualizar usuario con Categoría, Estado y Trazabilidad - ACTUALIZADO
usuariosController.actualizarUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, lastname, user, correo, categoria, estado } = req.body;
        
        const editUser = { 
            name, 
            lastname, 
            user, 
            correo, 
            categoria, 
            estado,
            updated_at: new Date() 
        };

        await UsuariosDAO.actualizar(id, editUser);
        res.redirect('/list');
    } catch (err) {
        next(err); 
    }
};

//6. Eliminar usuario
usuariosController.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await UsuariosDAO.eliminar(id);
        res.redirect('/list');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//7. Renderizar Dashboard con KPIs y métricas [cite: 77, 78, 99]
usuariosController.mostrarDashboard = async (req, res) => {
    try {
        const stats = await UsuariosDAO.obtenerMetricasDashboard();

        const formatearFecha = (fecha) => {
            if (!fecha) return "Sin datos";
            return new Date(fecha).toLocaleString('es-PE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        };

        if (stats.ultimoCreado) {
            stats.ultimoCreado.created_at = formatearFecha(stats.ultimoCreado.created_at);
        }
        if (stats.ultimoActualizado) {
            stats.ultimoActualizado.updated_at = formatearFecha(stats.ultimoActualizado.updated_at);
        }

        res.render("usuarios/dashboard", { stats }); 
    } catch (err) {
        res.status(500).send("Error al cargar el dashboard");
    }
};

export default usuariosController;