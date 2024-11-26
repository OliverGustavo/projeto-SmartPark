import React from 'react';
import { MapPin, Car, Clock } from 'lucide-react';
import { ParkingLot } from '../types';
import { Link } from 'react-router-dom';

interface ParkingLotCardProps {
  lot: ParkingLot;
}

export function ParkingLotCard({ lot }: ParkingLotCardProps) {
  return (
    <Link
      to={`/lot/${lot.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={lot.image}
        alt={lot.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{lot.name}</h3>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{lot.address}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Car className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {lot.availableSpots} spots available
            </span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">${lot.hourlyRate}/hour</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {lot.features.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}