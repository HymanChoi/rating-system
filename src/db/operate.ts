import { db } from "@/db";

/**
 *
 * @param work
 */
export async function addWorkDB(work: any) {
  db.works.add(work, "name");
}

/**
 *
 * @param name
 * @param work
 */
export async function editWorkDB(name: string, work: any) {
  db.works.where("name").equals(name).modify(work);
}

/**
 *
 * @param work
 */
export async function addTagDB(work: any) {
  work.tags.forEach((name: string) => {
    work.type === 0
      ? db.moviesTags.put({ name: name, count: 0 }, "name")
      : db.seriesTags.put({ name: name, count: 0 }, "name");
  });
}
