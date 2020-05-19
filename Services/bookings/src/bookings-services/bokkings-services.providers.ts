import { bookings_x_services_bxs } from './bookings-services.entity';

export const bookingsServicesProviders = [
    {
        provide: 'BOOKINGS_SERVICES_REPOSITORY',
        useValue: bookings_x_services_bxs,
    }
];