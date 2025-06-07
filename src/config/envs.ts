import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;

    AIRCRAFT_MICROSERVICE_HOST: string;
    AIRCRAFT_MICROSERVICE_PORT: number;

    ORDER_MICROSERVICE_HOST: string;
    ORDER_MICROSERVICE_PORT: number;

    RESERVATION_MICROSERVICE_HOST: string;
    RESERVATION_MICROSERVICE_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    AIRCRAFT_MICROSERVICE_HOST: joi.string().required(),
    AIRCRAFT_MICROSERVICE_PORT: joi.number().required(),

    ORDER_MICROSERVICE_HOST: joi.string().required(),
    ORDER_MICROSERVICE_PORT: joi.number().required(),

    RESERVATION_MICROSERVICE_HOST: joi.string().required(),
    RESERVATION_MICROSERVICE_PORT: joi.number().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,

    aircraftMicroserviceHost: envVars.AIRCRAFT_MICROSERVICE_HOST,
    aircraftMicroservicePort: envVars.AIRCRAFT_MICROSERVICE_PORT,

    orderMicroserviceHost: envVars.ORDER_MICROSERVICE_HOST,
    orderMicroservicePort: envVars.ORDER_MICROSERVICE_PORT,

    reservationMicroserviceHost: envVars.RESERVATION_MICROSERVICE_HOST,
    reservationMicroservicePort: envVars.RESERVATION_MICROSERVICE_PORT,
}
