import { Module } from '@nestjs/common';
import { ProyectosGateway } from './proyectos.gateway';
import { ProyectosService } from './proyectos.service';

@Module({
  providers: [ProyectosGateway, ProyectosService],
})
export class ProyectosModule {}