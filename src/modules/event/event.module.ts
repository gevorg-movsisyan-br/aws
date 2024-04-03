import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventResolver } from './event.resolver';
import { DynamooseModule } from 'nestjs-dynamoose';
import { EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'Event',
        schema: EventSchema,
        options: {
          tableName: 'event',
        },
      },
    ]),
  ],
  providers: [EventResolver, EventService],
})
export class EventModule {}
