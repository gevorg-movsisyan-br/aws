import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { EventKey, IEvent } from '../interfaces/event.interface';
import {
  CreateEventData,
  FindByUserIdData,
  ICreate,
  IFindByUserId,
  IUpdate,
  UpdateEventData,
} from './event-service.interface';
import { v4 as uuidv4 } from 'uuid';
import { ConditionInitializer } from 'dynamoose/dist/Condition';

@Injectable()
export class EventService implements ICreate, IUpdate, IFindByUserId {
  constructor(
    @InjectModel('Event')
    private eventModel: Model<IEvent, EventKey>,
  ) {}

  async create(data: CreateEventData) {
    return this.eventModel
      .create({ ...data, id: uuidv4() })
      .then((createdEvent) => createdEvent);
  }

  async findByUserId(data: FindByUserIdData) {
    const { userId, searchText, onlyUpcoming } = data;

    const condition: ConditionInitializer = { userId };

    if (searchText) {
      condition.name = { contains: searchText };
    }

    if (onlyUpcoming) {
      condition.startDate = { gt: new Date().getTime() };
    }

    return this.eventModel.scan(condition).exec();
  }

  async findOne(key: EventKey) {
    const event = await this.eventModel.get(key);

    return event;
  }

  async update(key: EventKey, data: UpdateEventData) {
    const { name, description, startDate } = data;

    const updatedEvent = await this.eventModel.update(key, {
      name,
      description,
      startDate,
    });

    return updatedEvent;
  }

  async remove(key: EventKey) {
    await this.eventModel.delete(key);
  }
}
