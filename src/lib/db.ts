// src/lib/db.ts
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let dbInstance: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function getDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  if (dbInstance) return dbInstance;
  const dbPath = path.resolve(process.cwd(), 'data.db');
  dbInstance = await open({ filename: dbPath, driver: sqlite3.Database });
  return dbInstance;
}

export async function initDb(): Promise<void> {
  const db = await getDb();
  // Create tables if they do not exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Product (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL,
      imageUrl TEXT
    );
    CREATE TABLE IF NOT EXISTS Testimonial (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      location TEXT,
      content TEXT NOT NULL,
      rating INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS Contact (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS Quote (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      totalPrice REAL NOT NULL,
      requestedAt TEXT NOT NULL,
      FOREIGN KEY (productId) REFERENCES Product(id)
    );
    CREATE TABLE IF NOT EXISTS CompanyInfo (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT,
      address TEXT,
      phone TEXT,
      email TEXT,
      description TEXT
    );
  `);
}

// Seed data from static JSON (run once)
export async function seedData(): Promise<void> {
  const db = await getDb();
  const dataPath = path.resolve(process.cwd(), 'src', 'data', 'db.json');
  // Dynamically import JSON (Node >=14 supports import with assert)
  // Using require for simplicity
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const data = require(dataPath);
  // CompanyInfo (single row, upsert)
  await db.run(
    `INSERT OR REPLACE INTO CompanyInfo (id, name, address, phone, email, description) VALUES (1, ?, ?, ?, ?, ?);`,
    data.company.name,
    data.company.address,
    data.company.phone,
    data.company.email,
    data.company.hours
  );
  // Products
  for (const p of data.products) {
    await db.run(
      `INSERT INTO Product (name, description, imageUrl) VALUES (?, ?, ?);`,
      p.name,
      p.description,
      p.image
    );
  }
  // Testimonials
  for (const t of data.testimonials) {
    await db.run(
      `INSERT INTO Testimonial (author, location, content, rating) VALUES (?, ?, ?, ?);`,
      t.name,
      t.location,
      t.quote,
      t.rating
    );
  }
}
