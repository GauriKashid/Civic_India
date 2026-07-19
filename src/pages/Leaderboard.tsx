import { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star,
  Loader2,
  Crown
} from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  user_id: string;
  full_name: string;
  points: number;
  city: string;
  badge_count: number;
}

interface UserBadge {
  badge_id: string;
  badges: {
    name: string;
    icon: string;
  };
}

export default function Leaderboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, user_id, full_name, points, city')
        .order('points', { ascending: false })
        .limit(50);

      if (error) throw error;

      // Get badge counts
      const userIds = data?.map(p => p.user_id) || [];
      const { data: badgeCounts } = await supabase
        .from('user_badges')
        .select('user_id')
        .in('user_id', userIds);

      const badgeCountMap: Record<string, number> = {};
      badgeCounts?.forEach(b => {
        badgeCountMap[b.user_id] = (badgeCountMap[b.user_id] || 0) + 1;
      });

      const enrichedData = data?.map(p => ({
        ...p,
        badge_count: badgeCountMap[p.user_id] || 0,
      })) || [];

      setLeaderboard(enrichedData);

      // Find user's rank
      if (user) {
        const userIndex = enrichedData.findIndex(p => p.user_id === user.id);
        if (userIndex !== -1) {
          setUserRank(userIndex + 1);
          setUserPoints(enrichedData[userIndex].points);
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchUserBadges = useCallback(async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('user_badges')
      .select(`
        badge_id,
        badges (
          name,
          icon
        )
      `)
      .eq('user_id', user.id);

    setUserBadges(data as unknown as UserBadge[] || []);
  }, [user]);

  useEffect(() => {
    fetchLeaderboard();
    if (user) {
      fetchUserBadges();
    }
  }, [user, fetchLeaderboard, fetchUserBadges]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="w-6 text-center font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-4">
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-medium">Community Champions</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('lb_title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('lb_desc')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Main Leaderboard */}
            <div className="lg:col-span-2">
              {/* Top 3 Podium */}
              {leaderboard.length >= 3 && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {/* Second Place */}
                  <div className="pt-8">
                    <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3">
                          <Medal className="h-6 w-6 text-gray-500" />
                        </div>
                        <Avatar className="w-16 h-16 mx-auto mb-2 border-4 border-gray-300">
                          <AvatarFallback className="bg-gray-100 text-gray-600 font-bold">
                            {getInitials(leaderboard[1].full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-semibold truncate">{leaderboard[1].full_name || 'Anonymous'}</p>
                        <p className="text-2xl font-display font-bold text-secondary">{leaderboard[1].points}</p>
                        <p className="text-xs text-muted-foreground">{t('lb_points')}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* First Place */}
                  <div>
                    <Card className="text-center bg-gradient-to-b from-yellow-50 to-card border-yellow-200 animate-fade-in-up">
                      <CardContent className="pt-6">
                        <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                          <Crown className="h-8 w-8 text-yellow-500" />
                        </div>
                        <Avatar className="w-20 h-20 mx-auto mb-2 border-4 border-yellow-400">
                          <AvatarFallback className="bg-yellow-100 text-yellow-700 font-bold text-xl">
                            {getInitials(leaderboard[0].full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-semibold truncate">{leaderboard[0].full_name || 'Anonymous'}</p>
                        <p className="text-3xl font-display font-bold text-secondary">{leaderboard[0].points}</p>
                        <p className="text-xs text-muted-foreground">{t('lb_points')}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Third Place */}
                  <div className="pt-12">
                    <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      <CardContent className="pt-6">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                          <Medal className="h-5 w-5 text-amber-600" />
                        </div>
                        <Avatar className="w-14 h-14 mx-auto mb-2 border-4 border-amber-300">
                          <AvatarFallback className="bg-amber-50 text-amber-700 font-bold">
                            {getInitials(leaderboard[2].full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-semibold text-sm truncate">{leaderboard[2].full_name || 'Anonymous'}</p>
                        <p className="text-xl font-display font-bold text-secondary">{leaderboard[2].points}</p>
                        <p className="text-xs text-muted-foreground">{t('lb_points')}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Full List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Rankings</CardTitle>
                  <CardDescription>Top 50 civic champions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboard.map((entry, index) => {
                      const isCurrentUser = user && entry.user_id === user.id;
                      
                      return (
                        <div
                          key={entry.id}
                          className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                            isCurrentUser ? 'bg-secondary/10 border border-secondary/20' : 'hover:bg-muted'
                          }`}
                        >
                          <div className="w-8 flex justify-center">
                            {getRankIcon(index + 1)}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className={isCurrentUser ? 'bg-secondary text-secondary-foreground' : 'bg-muted'}>
                              {getInitials(entry.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {entry.full_name || 'Anonymous Citizen'}
                              {isCurrentUser && <Badge className="ml-2 bg-secondary">You</Badge>}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {entry.city || 'India'}
                              {entry.badge_count > 0 && ` • ${entry.badge_count} badges`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-display font-bold text-lg text-secondary">{entry.points}</p>
                            <p className="text-xs text-muted-foreground">{t('lb_points')}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Your Stats */}
              {user && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-5 w-5 text-secondary" />
                      {t('lb_user_rank')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('lb_rank')}</span>
                      <span className="font-display font-bold text-xl">
                        {userRank ? `#${userRank}` : 'Unranked'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('lb_points')}</span>
                      <span className="font-display font-bold text-xl text-secondary">{userPoints}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Badges</span>
                      <span className="font-display font-bold text-xl">{userBadges.length}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Your Badges */}
              {user && userBadges.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5 text-secondary" />
                      Your Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {userBadges.map((badge) => (
                        <div
                          key={badge.badge_id}
                          className="flex flex-col items-center p-3 rounded-lg bg-muted/50 text-center"
                        >
                          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                            <Award className="h-5 w-5 text-secondary" />
                          </div>
                          <p className="text-xs font-medium">{badge.badges?.name}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* How to Earn Points */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How to Earn Points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-accent">+10</span>
                    </div>
                    <span>Submit a civic report</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-secondary">+10</span>
                    </div>
                    <span>Answer a quiz correctly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">+50</span>
                    </div>
                    <span>Report gets resolved</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
