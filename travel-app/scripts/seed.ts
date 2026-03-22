import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dbDirectory = path.join(process.cwd(), "db");
const dbPath = path.join(dbDirectory, "travel.db");
const schemaPath = path.join(dbDirectory, "schema.sql");
const seedPath = path.join(dbDirectory, "seed.sql");

if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new Database(dbPath);
const schemaSql = fs.readFileSync(schemaPath, "utf-8");
const seedSql = fs.readFileSync(seedPath, "utf-8");

db.exec("PRAGMA foreign_keys = ON;");
db.exec(schemaSql);
db.exec(seedSql);
db.close();

console.log(`Seed complete: ${dbPath}`);
