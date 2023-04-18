export class MenuResponse {
  id: number;

  name: string;

  url: string | null;

  parentId: number | null;
}

export class MenuResponseLevel extends MenuResponse {
  level: number;
}
