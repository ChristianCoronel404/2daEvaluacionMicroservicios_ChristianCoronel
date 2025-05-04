import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProyectosService {
  async buscarProyectos(data: any) {
    try {
      const response = await axios.post('http://localhost:3000/Proyectos', data);
      return response.data;

    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al buscar proyectos');
    }
  }

  // Métodos adicionales para mantener la misma estructura
  findAll() {
    return 'Esta acción retorna todos los proyectos';
  }

  findOne(id: number) {
    return `Este proyecto con ID #${id}`;
  }


  // Dentro de ProyectosService
  async contarProyectosPorCategoria() {
    try {
      // 1. Hacer la solicitud POST con los parámetros especificados
      const response = await axios.post('http://localhost:3000/proyectos', {
        anio: "",
        categoria: "",
        titulo: ""
      });

      // 2. Verificar que la respuesta sea un array
      if (!Array.isArray(response.data)) {
        throw new Error('Formato de respuesta inválido');
      }

      // 3. Contar proyectos por categoría
      const conteoCategorias = response.data.reduce((acumulador, proyecto) => {
        const categoria = proyecto.categoria || 'Sin categoría';
        acumulador[categoria] = (acumulador[categoria] || 0) + 1;
        return acumulador;
      }, {});

      return conteoCategorias;

    } catch (error) {
      throw new Error(`Error al contar categorías: ${error.message}`);
    }
  }
}