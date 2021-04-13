const dbName = process.env.DATABASE_URI || "society_management_db"
// const dbName = "mk"

export default {
    deployedDBUri: `mongodb+srv://yab:Lumberjack_6969@test-y8c98.mongodb.net/${dbName}?authSource=admin&replicaSet=test-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`
}