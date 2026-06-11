import {
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineBriefcase,
  HiOutlineHeart,
  HiOutlineGift,
  HiOutlineTicket,
  HiOutlineSupport,
} from 'react-icons/hi';
import type { IconType } from 'react-icons';
import { ROUTES } from './routes';

export interface NavItem {
  label: string;
  path: string;
  icon: IconType;
  children?: NavItem[];
}

export const SIDEBAR_NAV: NavItem[] = [
  {
    label: 'Home',
    path: ROUTES.DASHBOARD,
    icon: HiOutlineHome,
  },
  {
    label: 'Categories',
    path: '#',
    icon: HiOutlineViewGrid,
    children: [
      { label: 'Live Casino', path: ROUTES.LIVE_CASINO, icon: HiOutlineViewGrid },
      { label: 'Slots', path: ROUTES.SLOTS, icon: HiOutlineViewGrid },
      { label: 'Crash', path: ROUTES.CASINO, icon: HiOutlineViewGrid },
    ],
  },
  {
    label: 'Game Providers',
    path: ROUTES.PROVIDERS,
    icon: HiOutlineBriefcase,
  },
  {
    label: 'Favorites',
    path: ROUTES.FAVORITES,
    icon: HiOutlineHeart,
  },
  {
    label: 'Promotions',
    path: ROUTES.BONUS,
    icon: HiOutlineGift,
  },
  {
    label: 'Referral',
    path: ROUTES.REFERRAL,
    icon: HiOutlineTicket,
  },
  {
    label: 'Live Support',
    path: '#',
    icon: HiOutlineSupport,
    children: [
      { label: 'Support', path: ROUTES.SUPPORT, icon: HiOutlineSupport },
      { label: 'Tickets', path: ROUTES.TICKETS, icon: HiOutlineSupport },
    ],
  },
];

export const HEADER_NAV = [
  { label: 'Home', path: ROUTES.DASHBOARD },
  { label: 'Promotions', path: ROUTES.BONUS },
  { label: 'Categories', path: '#', hasDropdown: true },
];
