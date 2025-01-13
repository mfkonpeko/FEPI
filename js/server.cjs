// server.cjs
const express = require("express");
const cors = require("cors");
const conexion = require("./conexion.cjs");

const app = express();
const port = 3000;

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Ruta para obtener las vacantes
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

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});