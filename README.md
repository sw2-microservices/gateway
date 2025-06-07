## Client Gateway
Punto de comunicación entre nusetros clientes y nuestro servicios.

## Dev
1. Clonar repositorio
2. Instalar dependencias
3. Crear un archivo .env basado en el env.template
4. Tener levantados los microservicios que se van a consumir
5. Levantar proyecto con npm run start:dev

## Nats
docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats