// patron dao
// es el traductor de el codigo y la base de datos.
// CAMBIO: Ajustamos la ruta para apuntar a la carpeta 'database'
import pool from '../database/database.js'; 

const UsuariosDAO = {
    async listarTodos() {
        const [rows] = await pool.query("SELECT * FROM usuario"); 
        return rows;
    },
    async obtenerPorId(id) {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        return rows[0];
    },
    async crear(nuevoUsuario) {
        return await pool.query('INSERT INTO usuario SET ?', [nuevoUsuario]); 
    },
    async actualizar(id, datosActualizados) {
        return await pool.query('UPDATE usuario SET ? WHERE id = ?', [datosActualizados, id]); 
    },
    async eliminar(id) {
        return await pool.query('DELETE FROM usuario WHERE id = ?', [id]); 
    },

    async obtenerMetricasDashboard() {
    //KPIs: Total y segmentación por estados
    const [total] = await pool.query("SELECT COUNT(*) as cantidad FROM usuario");
    const [activos] = await pool.query("SELECT COUNT(*) as cantidad FROM usuario WHERE estado = 'Activo'");
    const [inactivos] = await pool.query("SELECT COUNT(*) as cantidad FROM usuario WHERE estado = 'Inactivo'");
    const [pendientes] = await pool.query("SELECT COUNT(*) as cantidad FROM usuario WHERE estado = 'Pendiente'");

    //Trazabilidad: Últimos movimientos
    const [ultimoCreado] = await pool.query("SELECT * FROM usuario ORDER BY created_at DESC LIMIT 1");
    const [ultimoActualizado] = await pool.query("SELECT * FROM usuario ORDER BY updated_at DESC LIMIT 1");

    //Datos para gráficos (Categorías)
    const [categorias] = await pool.query("SELECT categoria, COUNT(*) as cantidad FROM usuario GROUP BY categoria");
    //Datos para gráficos (Estado)
    const [estadosGrafico] = await pool.query("SELECT estado, COUNT(*) as cantidad FROM usuario GROUP BY estado");

    return {
        total: total[0].cantidad,
        activos: activos[0].cantidad,
        inactivos: inactivos[0].cantidad,
        pendientes: pendientes[0].cantidad,
        ultimoCreado: ultimoCreado[0],
        ultimoActualizado: ultimoActualizado[0],
        porCategoria: categorias,
        porEstado: estadosGrafico
    };
    }
};



export default UsuariosDAO;