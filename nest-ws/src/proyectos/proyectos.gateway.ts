import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ProyectosService } from './proyectos.service';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
export class ProyectosGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly proyectosService: ProyectosService) {}

  @SubscribeMessage('buscarProyectos')
  async buscarProyectos(@MessageBody() data: any) {
    try {
      const resultados = await this.proyectosService.buscarProyectos(data);
      this.server.emit('resultadosProyectos', resultados);
      return resultados;
    } catch (error) {
      this.server.emit('errorBusqueda', error.message);
      throw error;
    }
  }

  @SubscribeMessage('contarProyectosPorCategoria')
  async contarPorCategoria() {
    try {
      const conteo = await this.proyectosService.contarProyectosPorCategoria();
      this.server.emit('resultadoConteoCategorias', conteo);
      return conteo;
    } catch (error) {
      this.server.emit('errorConteo', error.message);
      throw error;
    }
  }
}