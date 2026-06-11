export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  country?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_submitted';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  category: 'general' | 'payment' | 'account' | 'game' | 'bonus' | 'technical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  content: string;
  sender: 'user' | 'support';
  createdAt: string;
}

export interface ReferralInfo {
  code: string;
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  referralLink: string;
  referrals: ReferralUser[];
}

export interface ReferralUser {
  id: string;
  username: string;
  joinedAt: string;
  status: 'active' | 'inactive';
  earnings: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  prize?: number;
}

export interface Bonus {
  id: string;
  title: string;
  description: string;
  type: 'welcome' | 'deposit' | 'cashback' | 'referral' | 'loyalty' | 'promotional';
  amount: number;
  percentage?: number;
  minDeposit?: number;
  maxBonus?: number;
  wageringRequirement: number;
  expiresAt: string;
  status: 'available' | 'claimed' | 'expired' | 'completed';
  image?: string;
}
