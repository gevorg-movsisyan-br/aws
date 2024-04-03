import { Schema } from 'dynamoose';

export const EventSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
});
