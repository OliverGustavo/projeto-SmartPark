import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useParkingStore } from '../store/parkingStore';
import { useAuthStore } from '../store/authStore';
import { ParkingLot } from '../types';
import { useNavigate } from 'react-router-dom';

export function MyLots() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { parkingLots, addParkingLot, updateParkingLot } = useParkingStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLot, setEditingLot] = useState<ParkingLot | null>(null);

  // Redirect if user is not a host
  if (!user || user.role !== 'host') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="text-gray-600 mt-2">Only hosts can manage parking lots</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-indigo-600 hover:text-indigo-500"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const myLots = parkingLots.filter(lot => lot.ownerId === user?.id);

  const handleAddLot = () => {
    setEditingLot(null);
    setIsModalOpen(true);
  };

  const handleEditLot = (lot: ParkingLot) => {
    setEditingLot(lot);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Parking Lots</h1>
        <button
          onClick={handleAddLot}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Lot</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myLots.map((lot) => (
          <div key={lot.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={lot.image}
              alt={lot.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{lot.name}</h3>
              <p className="text-gray-600 mt-2">{lot.address}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-gray-700">
                  <p>${lot.hourlyRate}/hour</p>
                  <p>{lot.availableSpots}/{lot.totalSpots} spots available</p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditLot(lot)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ParkingLotModal
          lot={editingLot}
          onClose={() => setIsModalOpen(false)}
          onSave={(data) => {
            if (editingLot) {
              updateParkingLot(editingLot.id, data);
            } else {
              addParkingLot({
                ...data,
                id: Math.random().toString(),
                ownerId: user?.id || '',
                availableSpots: data.totalSpots,
                features: ['24/7 Access', 'Security Cameras', 'Covered Parking'],
              } as ParkingLot);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

interface ParkingLotModalProps {
  lot: ParkingLot | null;
  onClose: () => void;
  onSave: (data: Partial<ParkingLot>) => void;
}

function ParkingLotModal({ lot, onClose, onSave }: ParkingLotModalProps) {
  const [formData, setFormData] = useState<Partial<ParkingLot>>(lot || {
    name: '',
    address: '',
    totalSpots: 0,
    availableSpots: 0,
    hourlyRate: 0,
    features: ['24/7 Access', 'Security Cameras', 'Covered Parking'],
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">
          {lot ? 'Edit Parking Lot' : 'Add New Parking Lot'}
        </h2>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Spots</label>
              <input
                type="number"
                value={formData.totalSpots || ''}
                onChange={(e) => setFormData({ ...formData, totalSpots: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.hourlyRate || ''}
                onChange={(e) => setFormData({ ...formData, hourlyRate: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}