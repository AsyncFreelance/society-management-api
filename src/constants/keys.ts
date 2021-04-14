const dbName = process.env.DATABASE_NAME || "society_management_db"
// const dbName = "mk"
const dbURI = process.env.DATABASE_URI || "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

export default {
    // deployedDBUri: `mongodb+srv://yab:Lumberjack_6969@test-y8c98.mongodb.net/${dbName}?authSource=admin&replicaSet=test-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,
    deployedDBUri: dbURI
}
