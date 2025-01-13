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
        contraseña, // Ahora se almacenará sin encriptar
        institucion_academica,
        carrera,
        fecha_egreso,
        area_interes_profesional,
        habilidades_clave,
        experiencia_laboral,  // Este ya será un array de empresas
        idiomas,               // Este ya será un array de idiomas
        certificaciones        // Este ya será un array de certificaciones
    } = req.body;

    // Consulta para verificar si el correo ya existe
    const checkQuery = "SELECT * FROM datos_egresado WHERE correo = ?";

    conexion.query(checkQuery, [correo], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al verificar el correo" });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }

        const query = `
            INSERT INTO datos_egresado 
            (nombre, apellidos, telefono, correo, contraseña, 
            institucion_academica, carrera, fecha_egreso, 
            area_interes_profesional, habilidades_clave,
            experiencia_laboral, idiomas, certificaciones) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        conexion.query(
            query,
            [
                nombre,
                apellidos,
                telefono,
                correo,
                contraseña,
                institucion_academica,
                carrera,
                fecha_egreso,
                area_interes_profesional,
                habilidades_clave,
                experiencia_laboral,
                idiomas,
                certificaciones
            ],
            (err, results) => {
                if (err) {
                    console.error("Error al ejecutar la consulta: ", err);
                    return res.status(500).json({ error: "Error al insertar los datos" });
                } else {
                    return res.status(201).json({
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
            userType: userType,
            userEmail: email  // Añadido explícitamente el email
        });
    });
});

// Ruta para actualizar datos del egresado
app.put("/api/usuario", (req, res) => {
    const {
        contraseña, // Se espera que la contraseña se envíe en el cuerpo de la petición
        nombre,
        apellidos,
        telefono,
        correo,
        institucion_academica,
        carrera,
        fecha_egreso,
        area_interes_profesional,
        habilidades_clave,
        experiencia_laboral,
        idiomas,
        certificaciones
    } = req.body;

    // Comprobación de que se proporcionó una contraseña
    if (!contraseña) {
        return res.status(400).json({ error: "Se requiere la contraseña" });
    }

    // La consulta SQL se modifica para usar contraseña en la cláusula WHERE
    const query = `
        UPDATE datos_egresado 
        SET 
            nombre = ?,
            apellidos = ?,
            telefono = ?,
            correo = ?,
            institucion_academica = ?,
            carrera = ?,
            fecha_egreso = ?,
            area_interes_profesional = ?,
            habilidades_clave = ?,
            experiencia_laboral = ?,
            idiomas = ?,
            certificaciones = ?
        WHERE contraseña = ?
    `;

    conexion.query(
        query,
        [
            nombre,
            apellidos,
            telefono,
            correo,
            institucion_academica,
            carrera,
            fecha_egreso,
            area_interes_profesional,
            habilidades_clave,
            experiencia_laboral,
            idiomas,
            certificaciones,
            contraseña // Aquí se usa la contraseña como identificador
        ],
        (err, results) => {
            if (err) {
                console.error("Error al ejecutar la consulta: ", err);
                return res.status(500).json({ error: "Error al actualizar los datos" });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "Usuario no encontrado o contraseña incorrecta" });
            }

            // Consulta para obtener los datos actualizados
            const selectQuery = "SELECT * FROM datos_egresado WHERE contraseña = ?";
            conexion.query(selectQuery, [contraseña], (err, results) => {
                if (err) {
                    console.error("Error al obtener datos actualizados: ", err);
                    return res.status(500).json({ error: "Error al obtener datos actualizados" });
                }

                const updatedUser = results[0];
                delete updatedUser.contraseña; // Eliminar la contraseña por seguridad

                res.json({
                    message: "Datos actualizados correctamente",
                    user: updatedUser
                });
            });
        }
    );
});

// Ruta para publicar una nueva vacante
app.post("/api/vacantes", (req, res) => {
    const {
        vacante,
        empresa,
        modalidad,
        salario,
        descripcion
    } = req.body;

    const query = `
        INSERT INTO empleos 
        (vacante, empresa, modalidad, salario, descripcion) 
        VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(
        query,
        [vacante, empresa, modalidad, salario, descripcion],
        (err, results) => {
            if (err) {
                console.error("Error al ejecutar la consulta: ", err);
                return res.status(500).json({ error: "Error al publicar la vacante" });
            }

            res.status(201).json({
                message: "Vacante publicada correctamente",
                id: results.insertId
            });
        }
    );
});

// Ruta para publicar una nuevo servicio
app.post("/api/servicio_social", (req, res) => {
    const {
        vacante,
        nombre_empresa,
        modalidad,
        descripcion
    } = req.body;

    const query = `
        INSERT INTO servicio_social 
        (vacante, nombre_empresa, modalidad, descripcion) 
        VALUES (?, ?, ?, ?)
    `;

    conexion.query(
        query,
        [vacante, nombre_empresa, modalidad, descripcion],
        (err, results) => {
            if (err) {
                console.error("Error al ejecutar la consulta: ", err);
                return res.status(500).json({ error: "Error al publicar el servicio social" });
            }

            res.status(201).json({
                message: "Servicio social publicado correctamente",
                id: results.insertId
            });
        }
    );
});


// Ruta para obtener todos los egresados
app.get("/api/egresados", (req, res) => {
    const query = "SELECT * FROM datos_egresado";

    conexion.query(query, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al obtener los egresados" });
        }
        res.json(results);
    });
});


// Ruta para eliminar un usuario
app.delete("/api/usuario/:correo", (req, res) => {
    const { correo } = req.params; // Obtiene el correo del usuario a eliminar desde la URL

    const query = "DELETE FROM datos_egresado WHERE correo = ?";

    conexion.query(query, [correo], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al eliminar el usuario" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado correctamente" });
    });
});

// Ruta para obtener todas las empresas
app.get("/api/empresas", (req, res) => {
    const query = "SELECT * FROM datos_empresa";

    conexion.query(query, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al obtener las empresas" });
        }
        res.json(results);
    });
});

// Ruta para eliminar una empresa
app.delete("/api/empresa/:correo", (req, res) => {
    const { correo } = req.params;

    const query = "DELETE FROM datos_empresa WHERE correo = ?";

    conexion.query(query, [correo], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al eliminar la empresa" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }

        res.json({ message: "Empresa eliminada correctamente" });
    });
});

// Ruta para obtener todos los empleos
app.get("/api/empleos", (req, res) => {
    const query = "SELECT * FROM empleos";

    conexion.query(query, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al obtener los empleos" });
        }
        res.json(results);
    });
});

// Ruta para eliminar un empleo
app.delete("/api/empleo/:vacante/:empresa", (req, res) => {
    const { vacante, empresa } = req.params;

    const query = "DELETE FROM empleos WHERE vacante = ? AND empresa = ?";

    conexion.query(query, [vacante, empresa], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al eliminar el empleo" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Empleo no encontrado" });
        }

        res.json({ message: "Empleo eliminado correctamente" });
    });
});

// Ruta para obtener todos los servicios sociales
app.get("/api/servicios-sociales", (req, res) => {
    const query = "SELECT * FROM servicio_social";

    conexion.query(query, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al obtener los servicios sociales" });
        }
        res.json(results);
    });
});

// Ruta para eliminar un servicio social
app.delete("/api/servicio-social/:vacante/:nombreEmpresa", (req, res) => {
    const { vacante, nombreEmpresa } = req.params;

    const query = "DELETE FROM servicio_social WHERE vacante = ? AND nombre_empresa = ?";

    conexion.query(query, [vacante, nombreEmpresa], (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta: ", err);
            return res.status(500).json({ error: "Error al eliminar el servicio social" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Servicio social no encontrado" });
        }

        res.json({ message: "Servicio social eliminado correctamente" });
    });
});

// Ruta para manejar postulaciones
app.post("/api/postulaciones", (req, res) => {
    const { correo_postulado, tipo_vacante, empresa, nombre_vacante } = req.body;

    // Primero verificar si ya existe una postulación similar
    const checkQuery = `
        SELECT * FROM postulaciones 
        WHERE correo_postulado = ? 
        AND nombre_vacante = ? 
        AND empresa = ?`;

    conexion.query(checkQuery, [correo_postulado, nombre_vacante, empresa], (err, results) => {
        if (err) {
            console.error("Error al verificar postulación existente:", err);
            return res.status(500).json({ error: "Error al verificar postulación" });
        }

        // Si ya existe una postulación similar
        if (results.length > 0) {
            return res.status(400).json({ message: "Ya te has postulado a esta vacante" });
        }

        // Si no existe, proceder a insertar la nueva postulación
        const insertQuery = `
            INSERT INTO postulaciones 
            (correo_postulado, tipo_vacante, empresa, nombre_vacante) 
            VALUES (?, ?, ?, ?)`;

        conexion.query(
            insertQuery,
            [correo_postulado, tipo_vacante, empresa, nombre_vacante],
            (err, results) => {
                if (err) {
                    console.error("Error al insertar postulación:", err);
                    return res.status(500).json({ error: "Error al procesar la postulación" });
                }

                res.status(201).json({
                    message: "Postulación realizada con éxito",
                    id: results.insertId
                });
            }
        );
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});