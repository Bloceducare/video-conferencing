import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdHome,
} from 'react-icons/md';

const routes = [
  {
    name: 'Dashboard',
    layout: '/dashboard',
    path: '',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Room',
    layout: '/room',
    path: '',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Preview',
    layout: '/preview',
    path: '',
    icon: <MdHome className="h-6 w-6" />,
  },
];
export default routes;
