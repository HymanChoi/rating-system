import Dexie, { Table } from "dexie";
import { Work, Tag } from "./type";

export class MySubClassedDexie extends Dexie {
  works!: Table<Work>;
  moviesTags!: Table<Tag>;
  seriesTags!: Table<Tag>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      works: "++id, &name, type, score, tags",
      moviesTags: "++id, &name, count",
      seriesTags: "++id, &name, count",
    });
  }
}

export const db = new MySubClassedDexie();
