//patron Singleton
import {createPool} from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'gestion_usuarios'
});

//al exportar el objeto pool, node.js asegura que sea la unica estancia (singleton)
export default pool;