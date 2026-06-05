import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { PortalShell } from '../components/portal/PortalShell';
import { isAdminEmail } from '../lib/adminEmails';

export const PortalPage: React.FC = () => {
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (loading) return;

    // Not logged in → redirect to login
    if (!user) {
      window.location.href = '/login';
      return;
    }

    // Admin users → redirect to admin portal
    const email = user.email?.toLowerCase();
    if (email && isAdminEmail(email)) {
      window.location.href = '/admin';
      return;
    }
  }, [user, loading]);

  // Show loader while auth resolves or during redirect
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-brand animate-spin" />
      </div>
    );
  }

  // If admin email, show loader during redirect
  // if (email && ADMIN_EMAILS.includes(email)) {
  //   return (
  //     <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
  //       <Loader2 className="w-6 h-6 text-brand animate-spin" />
  //     </div>
  //   );
  // }

  // Extract user display info
  const userName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const userAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture || undefined;

  return (
    <PortalShell
      userName={userName}
      userEmail={user.email || ''}
      userAvatar={userAvatar}
      onSignOut={signOut}
    />
  );
};
