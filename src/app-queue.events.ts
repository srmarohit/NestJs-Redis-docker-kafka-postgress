import { OnQueueEvent, QueueEventsHost, QueueEventsListener } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';

@QueueEventsListener('video')
export class VideoQueueEventListener extends QueueEventsHost {
  logger = new Logger('Queue');

  @OnQueueEvent('added')
  onAdded(job: any) {
    this.logger.log(`Job ${job.id} added to video queue`);
  }
}
