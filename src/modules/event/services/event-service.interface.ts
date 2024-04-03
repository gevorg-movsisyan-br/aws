import { EventKey, IEvent } from '../interfaces/event.interface';

export type CreateEventData = {
  name: string;
  userId: string;
  description: string;
  startDate: Date;
};

export interface ICreate {
  create(data: CreateEventData): Promise<IEvent>;
}

export type UpdateEventData = {
  name: string;
  description: string;
  startDate: Date;
};

export interface IUpdate {
  update(key: EventKey, data: UpdateEventData): Promise<IEvent>;
}

export type FindByUserIdData = {
  userId: string;
  searchText?: string;
  onlyUpcoming?: boolean;
};

export interface IFindByUserId {
  findByUserId(data: FindByUserIdData): Promise<IEvent[]>;
}
