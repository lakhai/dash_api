import { Repository, EntityRepository } from 'typeorm';
import { Feed } from './feed.entity';

@EntityRepository(Feed)
export class FeedsRepository extends Repository<Feed> { }