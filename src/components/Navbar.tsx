import React from 'react';
import { Link } from 'react-router-dom';
import { Car, UserCircle, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8" />
            <span className="font-bold text-xl">SmartPark</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>
                {user?.role === 'host' && (
                  <Link to="/my-lots" className="hover:text-indigo-200">My Lots</Link>
                )}
                <Link to="/bookings" className="hover:text-indigo-200">Bookings</Link>
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-1 hover:text-indigo-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-indigo-200"
              >
                <UserCircle className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}