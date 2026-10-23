import { expect, test } from '@playwright/test';
import { BookingApiClient } from '../../src/api/booking-client';

test('returns available rooms for a future date range', async ({ request }) => {
  const bookingApi = new BookingApiClient(request);

  const checkinDate = new Date();
  checkinDate.setUTCDate(checkinDate.getUTCDate() + 30);

  const checkoutDate = new Date(checkinDate);
  checkoutDate.setUTCDate(checkoutDate.getUTCDate() + 2);

  const response = await bookingApi.getAvailability(
    checkinDate.toISOString().slice(0, 10),
    checkoutDate.toISOString().slice(0, 10),
  );

  expect(response.status()).toBe(200);

  const availability: unknown = await response.json();
  expect(Array.isArray(availability)).toBe(true);

  if (Array.isArray(availability)) {
    for (const entry of availability) {
      expect(entry).toHaveProperty('roomid');
      expect(typeof entry.roomid).toBe('number');
    }
  }
});
