export interface EventKey {
  id: string;
}

export interface IEvent extends EventKey {
  name: string;
  userId: string;
  description: string;
  startDate: Date;
}
