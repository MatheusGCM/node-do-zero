import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
  async list(search) {
    let videos;

    if (search) {
      videos = await sql`SELECT * FROM video WHERE title ILIKE ${
        "%" + search + "%"
      };`;
    } else {
      videos = await sql`SELECT * FROM video;`;
    }

    return videos;
  }

  async create(video) {
    const { title, description, duration } = video;
    const videoId = randomUUID();

    await sql`INSERT INTO video (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration});`;
  }

  async update(videoId, video) {
    const { title, description, duration } = video;

    await sql`UPDATE video SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${videoId}`;
  }
  async delete(videoId) {
    await sql`DELETE FROM video WHERE id = ${videoId}`;
  }
}
