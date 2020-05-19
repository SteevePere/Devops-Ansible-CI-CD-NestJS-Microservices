import { bookings_x_rooms_bxr } from './bookings-rooms.entity';

export const bookingsRoomsProviders = [
  {
    provide: 'BOOKINGS_ROOMS_REPOSITORY',
    useValue: bookings_x_rooms_bxr,
  }
];
