import { expect, test } from '@playwright/test';
import { BookingApiClient } from '../../src/api/booking-client';

test('returns a room catalog with valid names and types', async ({ request }) => {
  const bookingApi = new BookingApiClient(request);
  const response = await bookingApi.getRooms();

  expect(response.status()).toBe(200);

  const catalog: unknown = await response.json();
  expect(catalog).toHaveProperty('rooms');

  if (
    typeof catalog === 'object' &&
    catalog !== null &&
    'rooms' in catalog
  ) {
    expect(Array.isArray(catalog.rooms)).toBe(true);

    if (Array.isArray(catalog.rooms)) {
      for (const room of catalog.rooms) {
        expect(room).toHaveProperty('roomName');
        expect(typeof room.roomName).toBe('string');
        expect(room).toHaveProperty('type');
        expect(typeof room.type).toBe('string');
      }
    }
  }
});

test('room detail matches its catalog entry', async ({ request }) => {
  const bookingApi = new BookingApiClient(request);
  const catalogResponse = await bookingApi.getRooms();

  expect(catalogResponse.status()).toBe(200);

  const catalog: unknown = await catalogResponse.json();
  expect(catalog).toHaveProperty('rooms');

  if (
    typeof catalog !== 'object' ||
    catalog === null ||
    !('rooms' in catalog) ||
    !Array.isArray(catalog.rooms)
  ) {
    throw new Error('Room catalog response does not contain a rooms array');
  }

  const room = catalog.rooms.find(
    (candidate: unknown) =>
      typeof candidate === 'object' &&
      candidate !== null &&
      'roomid' in candidate &&
      typeof candidate.roomid === 'number',
  );

  expect(room).toBeDefined();

  if (
    typeof room !== 'object' ||
    room === null ||
    !('roomid' in room) ||
    typeof room.roomid !== 'number'
  ) {
    throw new Error('Room catalog contains no room with a numeric roomid');
  }

  const detailResponse = await bookingApi.getRoomById(room.roomid);
  expect(detailResponse.status()).toBe(200);

  const detail: unknown = await detailResponse.json();
  expect(detail).toHaveProperty('roomid', room.roomid);
  expect(detail).toHaveProperty('roomName', room.roomName);
  expect(detail).toHaveProperty('type', room.type);
});
