import { Injectable } from '@nestjs/common';

@Injectable()
export class BusinessEntityService {
  create(createBusinessEntityDto) {
    return 'This action adds a new businessEntity';
  }

  findAll() {
    return `This action returns all businessEntity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessEntity`;
  }

  update(id: number, updateBusinessEntityDto) {
    return `This action updates a #${id} businessEntity`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessEntity`;
  }
}
