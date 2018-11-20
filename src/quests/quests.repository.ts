import { Repository, EntityRepository } from 'typeorm';
import { Quest } from './quest.entity';

@EntityRepository(Quest)
export class QuestsRepository extends Repository<Quest> { }