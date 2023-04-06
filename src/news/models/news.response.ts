export class NewsResponse {
  id: number;

  title: string;

  content: string;

  authorId: number | null;

  menuId: number | null;

  menuName: string | null;

  createdAt: Date | null;

  updatedAt: Date | null;
}

export class NewsResponsePage {
  list: NewsResponse[];
  count: number;
}
