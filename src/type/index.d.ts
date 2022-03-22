export interface Work {
  id?: number;
  name: string;
  type: number;
  score: number;
  tags: Array<string>;
}

export interface Tag {
  id?: number;
  name: string;
  count: number;
}
