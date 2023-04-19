export class NewsResponse {
  id: number;

  title: string;

  subTitle: string | null;

  image: string | null;

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
