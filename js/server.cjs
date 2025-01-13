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

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});