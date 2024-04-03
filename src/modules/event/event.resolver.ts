import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventService } from './services/event.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ICurrentUser } from '../auth/types/current-user.types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetEventsInput } from './dto/get-events.input';
import { UpdateEventGuard } from './guards/update-event.guard';
import { DeleteEventGuard } from './guards/delete-event.guard';

@UseGuards(AuthGuard)
@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Event)
  createEvent(
    @CurrentUser() user: ICurrentUser,
    @Args('createEventInput') createEventInput: CreateEventInput,
  ) {
    return this.eventService.create({ ...createEventInput, userId: user.sub });
  }

  @Query(() => [Event], { name: 'events' })
  findAll(
    @CurrentUser() user: ICurrentUser,
    @Args('getEventsInput') { searchText, onlyUpcoming }: GetEventsInput,
  ) {
    return this.eventService.findByUserId({
      userId: user.sub,
      searchText,
      onlyUpcoming,
    });
  }

  @Query(() => Event, { name: 'event', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.eventService.findOne({ id });
  }

  @UseGuards(UpdateEventGuard)
  @Mutation(() => Event)
  updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventService.update(
      { id: updateEventInput.id },
      updateEventInput,
    );
  }

  @UseGuards(DeleteEventGuard)
  @Mutation(() => Boolean, { nullable: true })
  removeEvent(@Args('id', { type: () => String }) id: string) {
    return this.eventService.remove({ id });
  }
}
