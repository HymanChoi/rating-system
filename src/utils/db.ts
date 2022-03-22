import { db } from "@/db";

/**
 *
 * @param work
 */
export function addTag(work: any) {
  work.tags.forEach((name: string) => {
    work.type === 0
      ? db.moviesTags.put({ name: name }, "name")
      : db.seriesTags.put({ name: name }, "name");
  });
}
