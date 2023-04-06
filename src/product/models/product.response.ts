export class ProjectResponse {
  id: number;

  name: string;

  description: string;

  price: number | null;

  image: string | null;

  menuId: number | null;

  menuName: string | null;
}

export class ProjectsResponsePage {
  list: ProjectResponse[];
  count: number;
}
