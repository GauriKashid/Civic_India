const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\Leaderboard.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useState, useEffect, useCallback } from 'react';
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


















export default function Leaderboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);
  const [userPoints, setUserPoints] = useState(0);

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
      const userIds = _optionalChain([data, 'optionalAccess', _ => _.map, 'call', _2 => _2(p => p.user_id)]) || [];
      const { data: badgeCounts } = await supabase
        .from('user_badges')
        .select('user_id')
        .in('user_id', userIds);

      const badgeCountMap = {};
      _optionalChain([badgeCounts, 'optionalAccess', _3 => _3.forEach, 'call', _4 => _4(b => {
        badgeCountMap[b.user_id] = (badgeCountMap[b.user_id] || 0) + 1;
      })]);

      const enrichedData = _optionalChain([data, 'optionalAccess', _5 => _5.map, 'call', _6 => _6(p => ({
        ...p,
        badge_count: badgeCountMap[p.user_id] || 0,
      }))]) || [];

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

    setUserBadges(data  || []);
  }, [user]);

  useEffect(() => {
    fetchLeaderboard();
    if (user) {
      fetchUserBadges();
    }
  }, [user, fetchLeaderboard, fetchUserBadges]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return _jsxDEV(Crown, { className: "h-6 w-6 text-yellow-500"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 116}, this );
      case 2:
        return _jsxDEV(Medal, { className: "h-6 w-6 text-gray-400"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 118}, this );
      case 3:
        return _jsxDEV(Medal, { className: "h-6 w-6 text-amber-600"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 120}, this );
      default:
        return _jsxDEV('span', { className: "w-6 text-center font-bold text-muted-foreground"   , children: ["#", rank]}, void 0, true, {fileName: _jsxFileName, lineNumber: 122}, this);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      _jsxDEV(Layout, { children: 
        _jsxDEV('div', { className: "min-h-[60vh] flex items-center justify-center"   , children: 
          _jsxDEV(Loader2, { className: "h-8 w-8 animate-spin text-primary"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 135}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 134}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 133}, this)
    );
  }

  return (
    _jsxDEV(Layout, { children: 
      _jsxDEV('div', { className: "py-8 lg:py-12" , children: 
        _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
          /* Header */
          _jsxDEV('div', { className: "max-w-3xl mx-auto text-center mb-12"   , children: [
            _jsxDEV('div', { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-4"          , children: [
              _jsxDEV(Trophy, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 148}, this )
              , _jsxDEV('span', { className: "text-sm font-medium" , children: "Community Champions" }, void 0, false, {fileName: _jsxFileName, lineNumber: 149}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 147}, this)
            , _jsxDEV('h1', { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-4"     , children: 
              t('lb_title')
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 151}, this)
            , _jsxDEV('p', { className: "text-muted-foreground text-lg" , children: 
              t('lb_desc')
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 154}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 146}, this)

          , _jsxDEV('div', { className: "max-w-4xl mx-auto grid lg:grid-cols-3 gap-8"    , children: [
            /* Main Leaderboard */
            _jsxDEV('div', { className: "lg:col-span-2", children: [
              /* Top 3 Podium */
              leaderboard.length >= 3 && (
                _jsxDEV('div', { className: "grid grid-cols-3 gap-4 mb-8"   , children: [
                  /* Second Place */
                  _jsxDEV('div', { className: "pt-8", children: 
                    _jsxDEV(Card, { className: "text-center animate-fade-in-up" , style: { animationDelay: '0.1s' }, children: 
                      _jsxDEV(CardContent, { className: "pt-6", children: [
                        _jsxDEV('div', { className: "w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3"        , children: 
                          _jsxDEV(Medal, { className: "h-6 w-6 text-gray-500"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 170}, this )
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 169}, this)
                        , _jsxDEV(Avatar, { className: "w-16 h-16 mx-auto mb-2 border-4 border-gray-300"     , children: 
                          _jsxDEV(AvatarFallback, { className: "bg-gray-100 text-gray-600 font-bold"  , children: 
                            getInitials(leaderboard[1].full_name)
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 173}, this)
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 172}, this)
                        , _jsxDEV('p', { className: "font-semibold truncate" , children: leaderboard[1].full_name || 'Anonymous'}, void 0, false, {fileName: _jsxFileName, lineNumber: 177}, this)
                        , _jsxDEV('p', { className: "text-2xl font-display font-bold text-secondary"   , children: leaderboard[1].points}, void 0, false, {fileName: _jsxFileName, lineNumber: 178}, this)
                        , _jsxDEV('p', { className: "text-xs text-muted-foreground" , children: t('lb_points')}, void 0, false, {fileName: _jsxFileName, lineNumber: 179}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 168}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 167}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 166}, this)

                  /* First Place */
                  , _jsxDEV('div', { children: 
                    _jsxDEV(Card, { className: "text-center bg-gradient-to-b from-yellow-50 to-card border-yellow-200 animate-fade-in-up"     , children: 
                      _jsxDEV(CardContent, { className: "pt-6", children: [
                        _jsxDEV('div', { className: "w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3"        , children: 
                          _jsxDEV(Crown, { className: "h-8 w-8 text-yellow-500"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 189}, this )
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 188}, this)
                        , _jsxDEV(Avatar, { className: "w-20 h-20 mx-auto mb-2 border-4 border-yellow-400"     , children: 
                          _jsxDEV(AvatarFallback, { className: "bg-yellow-100 text-yellow-700 font-bold text-xl"   , children: 
                            getInitials(leaderboard[0].full_name)
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 192}, this)
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 191}, this)
                        , _jsxDEV('p', { className: "font-semibold truncate" , children: leaderboard[0].full_name || 'Anonymous'}, void 0, false, {fileName: _jsxFileName, lineNumber: 196}, this)
                        , _jsxDEV('p', { className: "text-3xl font-display font-bold text-secondary"   , children: leaderboard[0].points}, void 0, false, {fileName: _jsxFileName, lineNumber: 197}, this)
                        , _jsxDEV('p', { className: "text-xs text-muted-foreground" , children: t('lb_points')}, void 0, false, {fileName: _jsxFileName, lineNumber: 198}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 187}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 186}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 185}, this)

                  /* Third Place */
                  , _jsxDEV('div', { className: "pt-12", children: 
                    _jsxDEV(Card, { className: "text-center animate-fade-in-up" , style: { animationDelay: '0.2s' }, children: 
                      _jsxDEV(CardContent, { className: "pt-6", children: [
                        _jsxDEV('div', { className: "w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3"        , children: 
                          _jsxDEV(Medal, { className: "h-5 w-5 text-amber-600"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 208}, this )
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 207}, this)
                        , _jsxDEV(Avatar, { className: "w-14 h-14 mx-auto mb-2 border-4 border-amber-300"     , children: 
                          _jsxDEV(AvatarFallback, { className: "bg-amber-50 text-amber-700 font-bold"  , children: 
                            getInitials(leaderboard[2].full_name)
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 211}, this)
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 210}, this)
                        , _jsxDEV('p', { className: "font-semibold text-sm truncate"  , children: leaderboard[2].full_name || 'Anonymous'}, void 0, false, {fileName: _jsxFileName, lineNumber: 215}, this)
                        , _jsxDEV('p', { className: "text-xl font-display font-bold text-secondary"   , children: leaderboard[2].points}, void 0, false, {fileName: _jsxFileName, lineNumber: 216}, this)
                        , _jsxDEV('p', { className: "text-xs text-muted-foreground" , children: t('lb_points')}, void 0, false, {fileName: _jsxFileName, lineNumber: 217}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 206}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 205}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 204}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 164}, this)
              )

              /* Full List */
              , _jsxDEV(Card, { children: [
                _jsxDEV(CardHeader, { children: [
                  _jsxDEV(CardTitle, { children: "All Rankings" }, void 0, false, {fileName: _jsxFileName, lineNumber: 227}, this)
                  , _jsxDEV(CardDescription, { children: "Top 50 civic champions"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 228}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 226}, this)
                , _jsxDEV(CardContent, { children: 
                  _jsxDEV('div', { className: "space-y-2", children: 
                    leaderboard.map((entry, index) => {
                      const isCurrentUser = user && entry.user_id === user.id;
                      
                      return (
                        _jsxDEV('div', {

                          className: `flex items-center gap-4 p-3 rounded-lg transition-colors ${
                            isCurrentUser ? 'bg-secondary/10 border border-secondary/20' : 'hover:bg-muted'
                          }`,
 children: [
                          _jsxDEV('div', { className: "w-8 flex justify-center"  , children: 
                            getRankIcon(index + 1)
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 242}, this)
                          , _jsxDEV(Avatar, { className: "w-10 h-10" , children: 
                            _jsxDEV(AvatarFallback, { className: isCurrentUser ? 'bg-secondary text-secondary-foreground' : 'bg-muted', children: 
                              getInitials(entry.full_name)
                            }, void 0, false, {fileName: _jsxFileName, lineNumber: 246}, this)
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 245}, this)
                          , _jsxDEV('div', { className: "flex-1 min-w-0" , children: [
                            _jsxDEV('p', { className: "font-medium truncate" , children: [
                              entry.full_name || 'Anonymous Citizen'
                              , isCurrentUser && _jsxDEV(Badge, { className: "ml-2 bg-secondary" , children: "You"}, void 0, false, {fileName: _jsxFileName, lineNumber: 253}, this)
                            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 251}, this)
                            , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: [
                              entry.city || 'India'
                              , entry.badge_count > 0 && ` • ${entry.badge_count} badges`
                            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 255}, this)
                          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 250}, this)
                          , _jsxDEV('div', { className: "text-right", children: [
                            _jsxDEV('p', { className: "font-display font-bold text-lg text-secondary"   , children: entry.points}, void 0, false, {fileName: _jsxFileName, lineNumber: 261}, this)
                            , _jsxDEV('p', { className: "text-xs text-muted-foreground" , children: t('lb_points')}, void 0, false, {fileName: _jsxFileName, lineNumber: 262}, this)
                          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 260}, this)
                        ]}, entry.id, true, {fileName: _jsxFileName, lineNumber: 236}, this)
                      );
                    })
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 231}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 230}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 225}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 161}, this)

            /* Sidebar */
            , _jsxDEV('div', { className: "space-y-6", children: [
              /* Your Stats */
              user && (
                _jsxDEV(Card, { className: "bg-primary/5 border-primary/20" , children: [
                  _jsxDEV(CardHeader, { children: 
                    _jsxDEV(CardTitle, { className: "text-lg flex items-center gap-2"   , children: [
                      _jsxDEV(Star, { className: "h-5 w-5 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 279}, this )
                      , t('lb_user_rank')
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 278}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 277}, this)
                  , _jsxDEV(CardContent, { className: "space-y-4", children: [
                    _jsxDEV('div', { className: "flex justify-between items-center"  , children: [
                      _jsxDEV('span', { className: "text-muted-foreground", children: t('lb_rank')}, void 0, false, {fileName: _jsxFileName, lineNumber: 285}, this)
                      , _jsxDEV('span', { className: "font-display font-bold text-xl"  , children: 
                        userRank ? `#${userRank}` : 'Unranked'
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 286}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 284}, this)
                    , _jsxDEV('div', { className: "flex justify-between items-center"  , children: [
                      _jsxDEV('span', { className: "text-muted-foreground", children: t('lb_points')}, void 0, false, {fileName: _jsxFileName, lineNumber: 291}, this)
                      , _jsxDEV('span', { className: "font-display font-bold text-xl text-secondary"   , children: userPoints}, void 0, false, {fileName: _jsxFileName, lineNumber: 292}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 290}, this)
                    , _jsxDEV('div', { className: "flex justify-between items-center"  , children: [
                      _jsxDEV('span', { className: "text-muted-foreground", children: "Badges"}, void 0, false, {fileName: _jsxFileName, lineNumber: 295}, this)
                      , _jsxDEV('span', { className: "font-display font-bold text-xl"  , children: userBadges.length}, void 0, false, {fileName: _jsxFileName, lineNumber: 296}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 294}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 283}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 276}, this)
              )

              /* Your Badges */
              , user && userBadges.length > 0 && (
                _jsxDEV(Card, { children: [
                  _jsxDEV(CardHeader, { children: 
                    _jsxDEV(CardTitle, { className: "text-lg flex items-center gap-2"   , children: [
                      _jsxDEV(Award, { className: "h-5 w-5 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 307}, this ), "Your Badges"

                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 306}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 305}, this)
                  , _jsxDEV(CardContent, { children: 
                    _jsxDEV('div', { className: "grid grid-cols-2 gap-3"  , children: 
                      userBadges.map((badge) => (
                        _jsxDEV('div', {

                          className: "flex flex-col items-center p-3 rounded-lg bg-muted/50 text-center"      ,
 children: [
                          _jsxDEV('div', { className: "w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2"       , children: 
                            _jsxDEV(Award, { className: "h-5 w-5 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 319}, this )
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 318}, this)
                          , _jsxDEV('p', { className: "text-xs font-medium" , children: _optionalChain([badge, 'access', _7 => _7.badges, 'optionalAccess', _8 => _8.name])}, void 0, false, {fileName: _jsxFileName, lineNumber: 321}, this)
                        ]}, badge.badge_id, true, {fileName: _jsxFileName, lineNumber: 314}, this)
                      ))
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 312}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 311}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 304}, this)
              )

              /* How to Earn Points */
              , _jsxDEV(Card, { children: [
                _jsxDEV(CardHeader, { children: 
                  _jsxDEV(CardTitle, { className: "text-lg", children: "How to Earn Points"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 332}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 331}, this)
                , _jsxDEV(CardContent, { className: "space-y-3 text-sm" , children: [
                  _jsxDEV('div', { className: "flex items-center gap-3"  , children: [
                    _jsxDEV('div', { className: "w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0"       , children: 
                      _jsxDEV('span', { className: "font-bold text-accent" , children: "+10"}, void 0, false, {fileName: _jsxFileName, lineNumber: 337}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 336}, this)
                    , _jsxDEV('span', { children: "Submit a civic report"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 339}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 335}, this)
                  , _jsxDEV('div', { className: "flex items-center gap-3"  , children: [
                    _jsxDEV('div', { className: "w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0"       , children: 
                      _jsxDEV('span', { className: "font-bold text-secondary" , children: "+10"}, void 0, false, {fileName: _jsxFileName, lineNumber: 343}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 342}, this)
                    , _jsxDEV('span', { children: "Answer a quiz correctly"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 345}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 341}, this)
                  , _jsxDEV('div', { className: "flex items-center gap-3"  , children: [
                    _jsxDEV('div', { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"       , children: 
                      _jsxDEV('span', { className: "font-bold text-primary" , children: "+50"}, void 0, false, {fileName: _jsxFileName, lineNumber: 349}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 348}, this)
                    , _jsxDEV('span', { children: "Report gets resolved"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 351}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 347}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 334}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 330}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 273}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 159}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 144}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 143}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 142}, this)
  );
}
