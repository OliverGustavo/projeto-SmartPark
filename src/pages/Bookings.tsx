import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import { useParkingStore } from '../store/parkingStore';
import { useAuthStore } from '../store/authStore';

export function Bookings() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { bookings, parkingLots, updateBooking } = useParkingStore();

  const myBookings = bookings.filter(booking => booking.userId === user?.id);

  const handlePayment = (bookingId: string) => {
    updateBooking(bookingId, { paid: true, status: 'active' });
  };

  const handleCancel = (bookingId: string) => {
    updateBooking(bookingId, { status: 'cancelled' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

      <div className="space-y-6">
        {myBookings.map((booking) => {
          const lot = parkingLots.find(l => l.id === booking.parkingLotId);
          return (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {lot?.name}
                  </h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{lot?.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {new Date(booking.startTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        {new Date(booking.startTime).toLocaleTimeString()} - 
                        {new Date(booking.endTime).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span>${booking.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    booking.status === 'active' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                {booking.status === 'pending' && !booking.paid && (
                  <>
                    <button
                      onClick={() => handlePayment(booking.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Pay Now
                    </button>
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </>
                )}
                <button
                  onClick={() => navigate(`/lot/${lot?.id}`)}
                  className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  View Lot
                </button>
              </div>
            </div>
          );
        })}

        {myBookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">No bookings yet</h2>
            <p className="text-gray-600 mt-2">Start by finding a parking spot</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-indigo-600 hover:text-indigo-500"
            >
              Browse Parking Lots
            </button>
          </div>
        )}
      </div>
    </div>
  );
}