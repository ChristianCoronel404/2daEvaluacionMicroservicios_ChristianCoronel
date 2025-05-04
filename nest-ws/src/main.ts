// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io'; // <-- Añade esto

// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3009); // Asegúrate que este puerto esté disponible
  console.log(`Servidor WebSocket escuchando en ws://localhost:${3009}`);
}
bootstrap();
