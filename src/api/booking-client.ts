import type { APIRequestContext, APIResponse } from '@playwright/test';

export class BookingApiClient {
  constructor(private readonly request: APIRequestContext) {}

  getAvailability(checkin: string, checkout: string): Promise<APIResponse> {
    return this.request.get('/api/booking/unavailable', {
      params: { checkin, checkout },
    });
  }

  getRooms(): Promise<APIResponse> {
    return this.request.get('/api/room');
  }

  getRoomById(id: number): Promise<APIResponse> {
    return this.request.get(`/api/room/${id}`);
  }
}
