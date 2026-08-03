export interface OfflineQueueItem {
  idempotencyToken: string;
  sessionId: string;
  action: 'PUSH_SYMPTOM' | 'REMOVE_SYMPTOM' | 'COMMIT_SESSION';
  payload: any;
  timestamp: number;
}

/**
 * OFFLINE RECOVERY ENGINE
 * Manages front-end transaction persistence during network failures.
 */
export class MateriaGridSyncQueue {
  private static STORAGE_KEY = 'materiagrid_offline_queue';

  public static enqueueTransaction(
    item: Omit<OfflineQueueItem, 'timestamp'>
  ): void {
    const queue = this.getQueue();
    queue.push({ ...item, timestamp: Date.now() });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(queue));
    console.warn(
      `[OFFLINE DETECTED] Transaction cached locally. Token: ${item.idempotencyToken}`
    );
  }

  public static getQueue(): OfflineQueueItem[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  /**
   * Automatically flushes cached local transactions back to the production server
   * in chronological order when the network status changes back to online.
   */
  public static async flushQueueToServer(): Promise<void> {
    const queue = this.getQueue();
    if (queue.length === 0) return;

    console.log(
      `[SYNC RETRY] Internet restored. Flashing ${queue.length} offline actions...`
    );

    for (const action of queue) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Idempotency-Token': action.idempotencyToken,
          },
          body: JSON.stringify({
            sessionStateId: action.sessionId,
            currentMessage: action.payload.message || '',
            patientBaselines: action.payload.baselines,
            offlineSyncTrigger: true,
          }),
        });

        if (response.ok) {
          // Remove item from local cache if server safely saved the record
          const currentQueue = this.getQueue().filter(
            (i) => i.idempotencyToken !== action.idempotencyToken
          );
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentQueue));
        }
      } catch (err) {
        console.error(
          `[SYNC DELAY] Failed to sync action token ${action.idempotencyToken}. Retrying next interval.`,
          err
        );
        break; // Hinder execution trail if server is still unresponsive
      }
    }
  }
}
