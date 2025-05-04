import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectosModule } from './proyectos/proyectos.module';

@Module({
  imports: [ProyectosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
