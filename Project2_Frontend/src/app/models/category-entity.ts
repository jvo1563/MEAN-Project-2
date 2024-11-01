export class CategoryEntity {
  id: number;
  category_name: string;

  constructor(id: number = 0, category_name: string = '') {
    this.id = id;
    this.category_name = category_name;
  }
}
