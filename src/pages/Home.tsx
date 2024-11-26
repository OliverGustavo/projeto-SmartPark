import React from 'react';
import { Search } from 'lucide-react';
import { ParkingLotCard } from '../components/ParkingLotCard';
import { useParkingStore } from '../store/parkingStore';

export function Home() {
  const { parkingLots } = useParkingStore();

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Parking Spot
        </h1>
        <p className="text-xl text-gray-600">
          Book parking spots in advance and save time
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center bg-white rounded-lg shadow-md p-4">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by location or parking lot name..."
            className="w-full outline-none text-gray-700"
          />
          <button className="ml-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parkingLots.map((lot) => (
          <ParkingLotCard key={lot.id} lot={lot} />
        ))}
      </div>
    </div>
  );
}