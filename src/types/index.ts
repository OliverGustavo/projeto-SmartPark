export interface User {
  id: string;
  email: string;
  name: string;
  role: 'host' | 'user';
}

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
  hourlyRate: number;
  ownerId: string;
  features: string[];
  image: string;
}

export interface Booking {
  id: string;
  userId: string;
  parkingLotId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  totalAmount: number;
  paid: boolean;
}