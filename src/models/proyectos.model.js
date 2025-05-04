import { pool } from "../db.js";

const BuscarProyecto = async (anio, categoria, titulo) => {
  try {
    // Generar la consulta dinámica dependiendo de los valores recibidos
    let queryText = `
      SELECT titulo, categoria, date_part('year', fecha_defensa)
      FROM proyectos
      WHERE 1=1
    `;
    let queryValues = [];

    // Añadir condiciones de filtros según los valores de entrada
    if (anio && anio.trim() !== '') {
      queryText += ` AND date_part('year', fecha_defensa) = $${queryValues.length + 1}`;
      queryValues.push(anio);
    }
    
    if (categoria && categoria.trim() !== '') {
      queryText += ` AND categoria ILIKE $${queryValues.length + 1}`;
      queryValues.push(`%${categoria}%`);
    }

    if (titulo && titulo.trim() !== '') {
      queryText += ` AND titulo ILIKE $${queryValues.length + 1}`;
      queryValues.push(`%${titulo}%`);
    }

    // Ejecutar la consulta con los valores dinámicos
    const { rows } = await pool.query({
      text: queryText,
      values: queryValues,
    });

    return rows;
  } catch (error) {
    console.log("Error en la búsqueda: ", error);
  }
};



export const proyectosmodel = {
    BuscarProyecto,
};