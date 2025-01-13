const express = require("express");
const cors = require("cors");
const conexion = require("./conexion.cjs");

const app = express();
const port = 3000;

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Ruta para obtener las vacantes de servicio social
app.get("/api/vacantes", (req, res) => {
    const query = "SELECT * FROM servicio_social";
    
    conexion.query(query, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            res.status(500).json({ error: "Error al obtener las vacantes" });
        } else {
            res.json(results);
        }
    });
});

// Ruta para obtener empleos
app.get("/api/empleos", (req, res) => {
    const query = "SELECT * FROM empleos";
    
    conexion.query(query, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            res.status(500).json({ error: "Error al obtener los empleos" });
        } else {
            res.json(results);
        }
    });
});

// Ruta para insertar los datos de la empresa
app.post("/api/empresa", (req, res) => {
    const {
        nombre_empresa,
        representante_legal,
        telefono,
        correo,
        contraseña,
        area_trabajo,
        rfc
    } = req.body;

    // Consulta para verificar si el correo ya existe
    const checkQuery = "SELECT * FROM datos_empresa WHERE correo = ?";
    
    conexion.query(checkQuery, [correo], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al verificar el correo" });
        }

        // Si el correo ya existe
        if (results.length > 0) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }

        // Si el correo no existe, proceder a la inserción de los datos
        const query = `
            INSERT INTO datos_empresa 
            (nombre_empresa, representante_legal, telefono, correo, contraseña, area_trabajo, rfc) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        conexion.query(
            query, 
            [nombre_empresa, representante_legal, telefono, correo, contraseña, area_trabajo, rfc], 
            (err, results) => {
                if (err) {
                    console.error("Error al ejecutar la consulta: ", err);
                    res.status(500).json({ error: "Error al insertar los datos" });
                } else {
                    res.status(201).json({ 
                        message: "Datos de la empresa insertados correctamente",
                        id: results.insertId 
                    });
                }
            }
        );
    });
});


// Ruta para registrar egresados
app.post("/api/usuario", (req, res) => {
    const {
        nombre,
        apellidos,
        telefono,
        correo,
        contraseña,
        institucion_academica,
        carrera,
        fecha_egreso,
        area_interes_profesional,
        habilidades_clave
    } = req.body;

    // Consulta para verificar si el correo ya existe
    const checkQuery = "SELECT * FROM datos_egresado WHERE correo = ?";
    
    conexion.query(checkQuery, [correo], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al verificar el correo" });
        }

        // Si el correo ya existe
        if (results.length > 0) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }

        // Si el correo no existe, proceder a la inserción
        const query = `
            INSERT INTO datos_egresado 
            (nombre, apellidos, telefono, correo, contraseña, institucion_academica, carrera, fecha_egreso, area_interes_profesional, habilidades_clave) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        conexion.query(
            query, 
            [nombre, apellidos, telefono, correo, contraseña, institucion_academica, carrera, fecha_egreso, area_interes_profesional, habilidades_clave], 
            (err, results) => {
                if (err) {
                    console.error("Error al ejecutar la consulta: ", err);
                    res.status(500).json({ error: "Error al insertar los datos" });
                } else {
                    res.status(201).json({ 
                        message: "Datos del usuario insertados correctamente",
                        id: results.insertId 
                    });
                }
            }
        );
    });
});

// Ruta para el inicio de sesión
app.post("/api/login", (req, res) => {
    const { email, password, userType } = req.body;

    // Determinar la tabla a consultar según el tipo de usuario
    const table = userType === 'empresa' ? 'datos_empresa' : 'datos_egresado';
    
    // Consulta para verificar las credenciales
    const query = `SELECT * FROM ${table} WHERE correo = ? AND contraseña = ?`;
    
    conexion.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }

        // Si no se encuentra el usuario
        if (results.length === 0) {
            return res.status(401).json({ 
                error: "Credenciales incorrectas" 
            });
        }

        // Usuario encontrado
        const user = results[0];
        
        // Eliminar la contraseña del objeto de respuesta por seguridad
        delete user.contraseña;

        res.json({
            success: true,
            message: "Inicio de sesión exitoso",
            user: user,
            userType: userType
        });
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});