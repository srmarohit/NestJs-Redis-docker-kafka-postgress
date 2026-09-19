import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('video', { concurrency:3 }) // Set concurrency to 3 for processing multiple jobs in parallel
export class VideoProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    const totalSteps = 5;

    // Implement Attempt on failing jobs logic example:
    if (job.attemptsMade < 2 && typeof job.id === 'string' && parseInt(job.id) % 3 === 0) {
      throw new Error(`Job ${job.id} failed after ${job.attemptsMade} attempts `);
    }

    // Simulate a long-running task with progress updates
    for (let step = 1; step <= totalSteps; step++) {
      // Simulate some processing work
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for each step

      //calculate progress percentage
      const progress = Math.round((step / totalSteps) * 100);
      job.updateProgress(progress); // Update the job's progress
    }
  }

  // Event listeners for job events
  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(`Job ${job.id} is now active`);
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job, progress: number) {
    console.log(`Job ${job.id} is ${progress}% complete`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job ${job.id} has been completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    console.log(`Job ${job.id} has failed with error: ${error.message}`);
  }
}
