import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ParkingSquare, Calendar, CreditCard, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useParkingStore } from '../store/parkingStore';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { parkingLots, bookings } = useParkingStore();

  const myLots = parkingLots.filter(lot => lot.ownerId === user?.id);
  const myBookings = bookings.filter(booking => booking.userId === user?.id);

  const stats = [
    {
      title: 'Total Parking Lots',
      value: myLots.length,
      icon: ParkingSquare,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Bookings',
      value: myBookings.filter(b => b.status === 'active').length,
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Payments',
      value: myBookings.filter(b => !b.paid).length,
      icon: CreditCard,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600">Here's what's happening with your parking lots</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <button
              onClick={() => navigate('/bookings')}
              className="text-indigo-600 hover:text-indigo-800"
            >
              View all
            </button>
          </div>
          {myBookings.slice(0, 5).map((booking) => {
            const lot = parkingLots.find(l => l.id === booking.parkingLotId);
            return (
              <div key={booking.id} className="border-b py-3 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{lot?.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.startTime).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'active' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/my-lots')}
              className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
            >
              <span className="flex items-center">
                <ParkingSquare className="h-5 w-5 mr-3 text-indigo-600" />
                Manage Parking Lots
              </span>
            </button>
            <button
              onClick={() => navigate('/bookings')}
              className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
            >
              <span className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-indigo-600" />
                View Bookings
              </span>
            </button>
            <button
              className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
            >
              <span className="flex items-center">
                <Settings className="h-5 w-5 mr-3 text-indigo-600" />
                Account Settings
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}