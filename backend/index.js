import express from 'express'; 
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import { join, dirname } from 'path'; 
import { fileURLToPath } from 'url'; 
import usuariosRoutes from './routes/usuarios.routes.js'; 

//Inicializador
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, '../frontend/views'));
app.engine('.hbs', engine({ 
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: {
        eq: (a, b) => a === b
    }
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/', (req, res) => res.render('index')); 
app.use(usuariosRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('index', { error: "Ocurrió un error inesperado." });
});

// CAMBIO 3: Apuntar a la nueva carpeta de archivos públicos en el frontend
app.use(express.static(join(__dirname, '../frontend/public')));

app.listen(app.get('port'), () => { 
    console.log('Server listening on port', app.get('port')); 
});
