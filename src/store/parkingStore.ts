import { create } from 'zustand';
import { ParkingLot, Booking } from '../types';

interface ParkingState {
  parkingLots: ParkingLot[];
  bookings: Booking[];
  addParkingLot: (lot: ParkingLot) => void;
  updateParkingLot: (id: string, lot: Partial<ParkingLot>) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
}

export const useParkingStore = create<ParkingState>((set) => ({
  parkingLots: [],
  bookings: [],
  addParkingLot: (lot) =>
    set((state) => ({ parkingLots: [...state.parkingLots, lot] })),
  updateParkingLot: (id, lot) =>
    set((state) => ({
      parkingLots: state.parkingLots.map((p) =>
        p.id === id ? { ...p, ...lot } : p
      ),
    })),
  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
  updateBooking: (id, booking) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, ...booking } : b
      ),
    })),
}));