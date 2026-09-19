import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('video', { concurrency: 3 }) // Set concurrency to 3 for processing multiple jobs in parallel
export class VideoProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    const totalSteps = 5;

    switch (job.name) {
      case 'process':
        console.log(`Processing video: ${job.data.filename}`);
        await this.runTaskWithProgress(job, totalSteps);
        break;
      case 'compress':
        console.log(`Compressing video: ${job.data.filename}`);
        await this.runTaskWithProgress(job, totalSteps);
        break;
      default:
        console.log(`Unknown job type: ${job.name}`);
        return;
    }
  }

  async runTaskWithProgress(job: Job, totalSteps: number): Promise<void> {
    for (let step = 1; step <= totalSteps; step++) {
      // Simulate some work being done
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Failed job simulation for demonstration purposes
      if (job.name === 'compress' && step === 3) {
        throw new Error('Compression failed due to an unexpected error.');
      }

      // Update job progress
      const progress = (step / totalSteps) * 100;
      await job.updateProgress(progress);
    }
  }

  // Event listeners for job events
  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(`[${job.name}] Job ${job.id} is now active`);
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job, progress: number) {
    console.log(`[${job.name}] Job ${job.id} is ${progress}% complete`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`[${job.name}] Job ${job.id} has been completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    console.log(`[${job.name}] Job ${job.id} has failed with error: ${error.message}`);
  }
}
