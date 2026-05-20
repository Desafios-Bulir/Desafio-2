import { api } from "./api";

export interface BookingResponse {
  id: string;
  clientId: string;
  serviceId: string;
  status: string;
  scheduledAt: string;
  createdAt: string;
  client: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    phone?: string;
  };
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
}

export const bookingsService = {
  getProviderBookings: async () => {
    const response = await api.get<BookingResponse[]>("/api/v1/bookings/provider/bookings");
    return response.data;
  },

  getMyBookings: async () => {
    const response = await api.get<BookingResponse[]>("/api/v1/bookings/my-bookings");
    return response.data;
  },
};
