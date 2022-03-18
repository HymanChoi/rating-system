// db.ts
import Dexie, { Table } from "dexie";
import { Works } from "./type";

export class MySubClassedDexie extends Dexie {
  // 'works' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  works!: Table<Works>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      works: "++id, &name, type, score, tags", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
