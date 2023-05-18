const { connect, connection } = require("mongoose");

const my_connection = {
  isConnected: false,
};

// Función para conectar con la base de datos
export async function dbConnect() {
    // Evitar conexiones múltiples a la ba misma base de datos
  if (my_connection.isConnected) return;

  const db = await connect(process.env.MONGODB_URL);
  my_connection.isConnected = db.connections[0].readyState;
  
  console.log("Base de datos conectada: ", db.connection.db.databaseName);
}

// Listeners o events referentes a conexión
connection.on("connected", () => {
  console.log("Conectado a Mongo DB");
});

connection.on("error", (err) => {
  console.log("Mongo DB Error: ", err);
});
