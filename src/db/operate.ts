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
 * @param key
 * @param val
 * @returns
 */
export async function getWorkInfoDB(key: string, val: string) {
  return db.works.where(key).equals(val).first();
}

/**
 *
 * @param key
 * @param val
 * @returns
 */
export async function getWorkListDB(key: string, val: any) {
  return db.works.where(key).equals(val).toArray();
}

/**
 *
 * @param key
 * @param val
 * @param filterVal
 * @returns
 */
export async function getWorkCountByTagDB(
  key: string,
  val: any,
  filterVal: any
) {
  return db.works
    .where(key)
    .equals(val)
    .filter((i) => {
      return i.tags.indexOf(filterVal) !== -1;
    })
    .count();
}

/**
 *
 * @param key
 * @param val
 * @param filterVal
 * @returns
 */
export async function getWorkListByTagDB(
  key: string,
  val: any,
  filterVal: any
) {
  return db.works
    .where(key)
    .equals(val)
    .filter((i) => {
      return i.tags.indexOf(filterVal) !== -1;
    })
    .toArray();
}

/**
 *
 * @param work
 */
export async function addTagDB(work: any) {
  work.tags.forEach((name: string) => {
    db[work.type === 0 ? "moviesTags" : "seriesTags"].put(
      { name: name, count: 0 },
      "name"
    );
  });
}

/**
 *
 * @param type
 * @returns
 */
export async function getTagListDB(type: number) {
  return db[type === 0 ? "moviesTags" : "seriesTags"].toArray();
}
