import { Sequelize } from "sequelize";
import { envs } from "../enviroments/enviroments.js";

export const sequelize = new Sequelize(envs.DB_URI, {
    logging: false,
})

export async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.! 😁')
    } catch (error) {
        console.error(error);
    }
}

export async function syncUp() {
    try {
        await sequelize.sync();
        console.log('Connection has been synced successfully.! 😋 ')
    } catch (error) {
        console.error(error);
    }
}

async function main() {
    try {
        await authenticate()
        await syncUp()
    } catch (error) {
        console.error(`Server running on port: ${envs.PORT} `)
    }
}

