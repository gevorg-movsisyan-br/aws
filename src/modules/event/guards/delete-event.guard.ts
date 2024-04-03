import { CanActivate, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EventService } from '../services/event.service';
import { ICurrentUser } from '../../auth/types/current-user.types';

@Injectable()
export class DeleteEventGuard implements CanActivate {
  constructor(private readonly eventService: EventService) {}

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    try {
      const { id: eventId } = ctx.getArgs() as { id: string };

      const event = await this.eventService.findOne({ id: eventId });

      if (!event) {
        return false;
      }

      const currentUser = ctx.getContext().req.user as ICurrentUser;

      return currentUser.sub !== event.userId;
    } catch {
      return false;
    }
  }
}
