/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Check if using the default offline Supabase project URL
const isMockEnabled = !supabaseUrl || supabaseUrl.includes("nhhuekcumaocmjohdior.supabase.co");

class MockQueryBuilder {
  private tableName: string;
  private filters: Array<(item: any) => boolean> = [];
  private orderCol: string | null = null;
  private orderAscending = true;
  private limitCount: number | null = null;
  private insertValues: any[] | null = null;
  private updateValues: any | null = null;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  private getData() {
    const data = localStorage.getItem(`mock_${this.tableName}`);
    return data ? JSON.parse(data) : [];
  }

  private saveData(data: any[]) {
    localStorage.setItem(`mock_${this.tableName}`, JSON.stringify(data));
  }

  select(columns?: string) {
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push((item) => {
      return item[column] === value;
    });
    return this;
  }

  in(column: string, values: any[]) {
    this.filters.push((item) => {
      return values.includes(item[column]);
    });
    return this;
  }

  order(column: string, { ascending = true } = {}) {
    this.orderCol = column;
    this.orderAscending = ascending;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  insert(values: any | any[]) {
    this.insertValues = Array.isArray(values) ? values : [values];
    return this;
  }

  update(values: any) {
    this.updateValues = values;
    return this;
  }

  async then(onfulfilled?: (value: any) => any) {
    let resultData: any = null;
    let resultError: any = null;

    try {
      if (this.insertValues !== null) {
        const list = this.getData();
        const insertedRows = this.insertValues.map((row: any) => {
          const newRow = {
            id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...row
          };

          // Auto-generate report_number for reports
          if (this.tableName === 'reports' && (!newRow.report_number || newRow.report_number === 'TEMP')) {
            const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            const randomDigits = Math.floor(10000 + Math.random() * 90000);
            newRow.report_number = `CIV${dateStr}-${randomDigits}`;
          }

          // Award points on new quiz progress completion
          if (this.tableName === 'user_quiz_progress' && newRow.is_correct) {
            const quizzes = JSON.parse(localStorage.getItem('mock_quizzes') || '[]');
            const quiz = quizzes.find((q: any) => q.id === newRow.quiz_id);
            const points = quiz ? (quiz.points || 10) : 10;

            const profiles = JSON.parse(localStorage.getItem('mock_profiles') || '[]');
            const profileIdx = profiles.findIndex((p: any) => p.user_id === newRow.user_id);
            if (profileIdx !== -1) {
              profiles[profileIdx].points = (profiles[profileIdx].points || 0) + points;
              localStorage.setItem('mock_profiles', JSON.stringify(profiles));
            }
          }

          // Award points and badges for reports
          if (this.tableName === 'reports') {
            const profiles = JSON.parse(localStorage.getItem('mock_profiles') || '[]');
            const profileIdx = profiles.findIndex((p: any) => p.user_id === newRow.user_id);
            if (profileIdx !== -1) {
              profiles[profileIdx].points = (profiles[profileIdx].points || 0) + 15;
              localStorage.setItem('mock_profiles', JSON.stringify(profiles));
            }

            // Award 'First Report' badge
            const userBadges = JSON.parse(localStorage.getItem('mock_user_badges') || '[]');
            const hasFirstReportBadge = userBadges.some((ub: any) => ub.user_id === newRow.user_id && ub.badge_id === 'first-report-badge-id');
            if (!hasFirstReportBadge) {
              userBadges.push({
                id: `ub-${Date.now()}`,
                user_id: newRow.user_id,
                badge_id: 'first-report-badge-id',
                earned_at: new Date().toISOString()
              });
              localStorage.setItem('mock_user_badges', JSON.stringify(userBadges));
            }
          }

          list.push(newRow);
          return newRow;
        });

        this.saveData(list);
        resultData = insertedRows;
        this.insertValues = null;
      } else if (this.updateValues !== null) {
        const list = this.getData();
        const updatedRows: any[] = [];

        list.forEach((item: any, idx: number) => {
          let matches = true;
          for (const filter of this.filters) {
            if (!filter(item)) {
              matches = false;
              break;
            }
          }
          if (matches) {
            list[idx] = {
              ...item,
              ...this.updateValues,
              updated_at: new Date().toISOString()
            };
            updatedRows.push(list[idx]);
          }
        });

        this.saveData(list);
        resultData = updatedRows;
        this.updateValues = null;
      } else {
        let list = this.getData();

        // Apply filters
        for (const filter of this.filters) {
          list = list.filter(filter);
        }

        // Apply ordering
        if (this.orderCol) {
          list.sort((a: any, b: any) => {
            const valA = a[this.orderCol!];
            const valB = b[this.orderCol!];
            if (valA < valB) return this.orderAscending ? -1 : 1;
            if (valA > valB) return this.orderAscending ? 1 : -1;
            return 0;
          });
        }

        // Apply limit
        if (this.limitCount !== null) {
          list = list.slice(0, this.limitCount);
        }

        // Relation fetches intercept
        if (this.tableName === 'user_badges') {
          const badgesList = JSON.parse(localStorage.getItem('mock_badges') || '[]');
          list = list.map((item: any) => {
            const badgeDetail = badgesList.find((b: any) => b.id === item.badge_id);
            return {
              ...item,
              badges: badgeDetail ? { name: badgeDetail.name, icon: badgeDetail.icon } : null
            };
          });
        }

        resultData = list;
      }
    } catch (err) {
      resultError = err;
    }

    const res = { data: resultData, error: resultError };
    return onfulfilled ? onfulfilled(res) : res;
  }

  async single() {
    const { data } = await this;
    return { data: data && data.length > 0 ? data[0] : null, error: data && data.length > 0 ? null : new Error("No rows found") };
  }

  async maybeSingle() {
    const { data } = await this;
    return { data: data && data.length > 0 ? data[0] : null, error: null };
  }
}

type AuthChangeListener = (event: string, session: any | null) => void;

class MockAuth {
  private listeners: Set<AuthChangeListener> = new Set();

  constructor() {
    this.seedDefaults();
  }

  private seedDefaults() {
    // Seed default users if empty
    const users = localStorage.getItem('mock_auth_users');
    if (!users) {
      const defaultUsers = [
        {
          id: 'admin-user-id',
          email: 'admin@example.com',
          password: 'password123',
          full_name: 'Admin User',
          role: 'admin'
        },
        {
          id: 'citizen-user-id',
          email: 'user@example.com',
          password: 'password123',
          full_name: 'Citizen User',
          role: 'user'
        }
      ];
      localStorage.setItem('mock_auth_users', JSON.stringify(defaultUsers));
      
      // Also seed user_roles
      localStorage.setItem('mock_user_roles', JSON.stringify([
        { id: 'role-1', user_id: 'admin-user-id', role: 'admin' },
        { id: 'role-2', user_id: 'citizen-user-id', role: 'user' }
      ]));

      // Also seed profiles
      localStorage.setItem('mock_profiles', JSON.stringify([
        { id: 'profile-1', user_id: 'admin-user-id', full_name: 'Admin User', points: 150, city: 'Delhi', state: 'Delhi' },
        { id: 'profile-2', user_id: 'citizen-user-id', full_name: 'Citizen User', points: 40, city: 'Mumbai', state: 'Maharashtra' }
      ]));

      // Also seed user_badges
      localStorage.setItem('mock_user_badges', JSON.stringify([
        { id: 'badge-1', user_id: 'citizen-user-id', badge_id: 'first-report-badge-id', earned_at: new Date().toISOString() }
      ]));
    }

    // Seed default quiz categories and quizzes
    if (!localStorage.getItem('mock_quiz_categories')) {
      const categories = [
        { id: 'traffic-rules-id', name: 'Traffic Rules', description: 'Test your knowledge of Indian traffic rules and road safety', icon: 'car' },
        { id: 'civic-resp-id', name: 'Civic Responsibilities', description: 'Learn about your duties as a responsible citizen', icon: 'users' },
        { id: 'env-awareness-id', name: 'Environmental Awareness', description: 'Understand waste management and environmental protection', icon: 'leaf' },
        { id: 'public-safety-id', name: 'Public Safety', description: 'Know about emergency services and safety protocols', icon: 'shield' }
      ];
      localStorage.setItem('mock_quiz_categories', JSON.stringify(categories));
    }

    if (!localStorage.getItem('mock_quizzes')) {
      const quizzes = [
        { id: 'quiz-1', category_id: 'traffic-rules-id', question: 'What is the minimum age for obtaining a driving license for a motorcycle in India?', options: ["16 years", "18 years", "21 years", "14 years"], correct_answer: 1, points: 10 },
        { id: 'quiz-2', category_id: 'traffic-rules-id', question: 'What color is the stop signal on a traffic light?', options: ["Green", "Yellow", "Red", "Blue"], correct_answer: 2, points: 10 },
        { id: 'quiz-3', category_id: 'civic-resp-id', question: 'Which of the following is a civic duty of every Indian citizen?', options: ["Pay taxes", "Vote in elections", "Follow laws", "All of the above"], correct_answer: 3, points: 10 },
        { id: 'quiz-4', category_id: 'env-awareness-id', question: 'What should you do with wet and dry waste at home?', options: ["Mix them together", "Burn them", "Segregate them separately", "Throw anywhere"], correct_answer: 2, points: 10 },
        { id: 'quiz-5', category_id: 'public-safety-id', question: 'What is the emergency number for police in India?', options: ["100", "101", "102", "108"], correct_answer: 0, points: 10 }
      ];
      localStorage.setItem('mock_quizzes', JSON.stringify(quizzes));
    }

    if (!localStorage.getItem('mock_badges')) {
      const defaultBadges = [
        { id: 'first-report-badge-id', name: 'First Report', description: 'Submit your first civic issue report', icon: 'award', points_required: 0 },
        { id: 'active-citizen-badge-id', name: 'Active Citizen', description: 'Submit 5 civic issue reports', icon: 'star', points_required: 50 },
        { id: 'community-champ-badge-id', name: 'Community Champion', description: 'Submit 10 civic issue reports', icon: 'trophy', points_required: 100 },
        { id: 'quiz-master-badge-id', name: 'Quiz Master', description: 'Complete 5 quizzes', icon: 'brain', points_required: 50 },
        { id: 'civic-scholar-badge-id', name: 'Civic Scholar', description: 'Complete all education modules', icon: 'graduation-cap', points_required: 200 }
      ];
      localStorage.setItem('mock_badges', JSON.stringify(defaultBadges));
    }

    // Seed mock reports
    if (!localStorage.getItem('mock_reports')) {
      const mockReports = [
        {
          id: 'report-1',
          report_number: 'CIV20260719-12345',
          user_id: 'citizen-user-id',
          category: 'garbage',
          severity: 'medium',
          status: 'submitted',
          title: 'Accumulated garbage near park entrance',
          description: 'A large pile of household garbage has been accumulating near the main entrance of the sector park. It is causing a foul smell and attracting stray animals.',
          latitude: 28.6139,
          longitude: 77.2090,
          address: 'Gate 2, Sector 4 Park',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
          image_urls: ['https://picsum.photos/600/400?random=1'],
          created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
        },
        {
          id: 'report-2',
          report_number: 'CIV20260719-67890',
          user_id: 'citizen-user-id',
          category: 'pothole',
          severity: 'high',
          status: 'in_progress',
          title: 'Deep pothole on main avenue road',
          description: 'A very deep pothole has formed in the middle of the road, right after the traffic light. It is extremely dangerous for two-wheelers especially at night.',
          latitude: 19.0760,
          longitude: 72.8777,
          address: 'Main Avenue Rd, near HDFC Bank',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          image_urls: ['https://picsum.photos/600/400?random=2'],
          assigned_to: 'Municipal Road Division',
          authority_remarks: 'Team has been dispatched to patch the road.',
          created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
        }
      ];
      localStorage.setItem('mock_reports', JSON.stringify(mockReports));
    }
  }

  private getSessionFromStorage() {
    const sessionStr = localStorage.getItem('mock_auth_session');
    return sessionStr ? JSON.parse(sessionStr) : null;
  }

  private saveSessionToStorage(session: any | null) {
    if (session) {
      localStorage.setItem('mock_auth_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('mock_auth_session');
    }
  }

  async getSession() {
    return { data: { session: this.getSessionFromStorage() }, error: null };
  }

  onAuthStateChange(listener: AuthChangeListener) {
    this.listeners.add(listener);
    const session = this.getSessionFromStorage();
    // Fire event asynchronously
    setTimeout(() => {
      listener('SIGNED_IN', session);
    }, 0);

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this.listeners.delete(listener);
          }
        }
      }
    };
  }

  private notifyListeners(event: string, session: any | null) {
    this.listeners.forEach(listener => listener(event, session));
  }

  async signUp({ email, password, options }: any) {
    const users = JSON.parse(localStorage.getItem('mock_auth_users') || '[]');
    if (users.some((u: any) => u.email === email)) {
      return { data: null, error: new Error('User already registered') };
    }

    const userId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11);
    const fullName = options?.data?.full_name || '';

    const newUser = {
      id: userId,
      email,
      password,
      full_name: fullName,
      role: 'user'
    };
    users.push(newUser);
    localStorage.setItem('mock_auth_users', JSON.stringify(users));

    // Create user role
    const roles = JSON.parse(localStorage.getItem('mock_user_roles') || '[]');
    roles.push({ id: `role-${userId}`, user_id: userId, role: 'user' });
    localStorage.setItem('mock_user_roles', JSON.stringify(roles));

    // Create profile
    const profiles = JSON.parse(localStorage.getItem('mock_profiles') || '[]');
    profiles.push({
      id: `profile-${userId}`,
      user_id: userId,
      full_name: fullName,
      points: 0,
      city: '',
      state: ''
    });
    localStorage.setItem('mock_profiles', JSON.stringify(profiles));

    const sessionUser = {
      id: userId,
      email,
      user_metadata: {
        full_name: fullName
      }
    };
    const session = {
      access_token: 'mock-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      user: sessionUser
    };
    this.saveSessionToStorage(session);
    this.notifyListeners('SIGNED_IN', session);

    return { data: { user: sessionUser, session }, error: null };
  }

  async signInWithPassword({ email, password }: any) {
    const users = JSON.parse(localStorage.getItem('mock_auth_users') || '[]');
    const matchedUser = users.find((u: any) => u.email === email && u.password === password);
    if (!matchedUser) {
      return { data: null, error: new Error('Invalid email or password') };
    }

    const sessionUser = {
      id: matchedUser.id,
      email: matchedUser.email,
      user_metadata: {
        full_name: matchedUser.full_name
      }
    };
    const session = {
      access_token: 'mock-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      user: sessionUser
    };
    this.saveSessionToStorage(session);
    this.notifyListeners('SIGNED_IN', session);

    return { data: { user: sessionUser, session }, error: null };
  }

  async signOut() {
    this.saveSessionToStorage(null);
    this.notifyListeners('SIGNED_OUT', null);
    return { error: null };
  }
}

const mockStorage = {
  from: (bucketName: string) => ({
    upload: async (fileName: string, file: File) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          const key = `mock_storage_${fileName}`;
          try {
            localStorage.setItem(key, base64data);
          } catch (e) {
            console.warn('LocalStorage quota exceeded, using sessionStorage fallback');
            try {
              sessionStorage.setItem(key, base64data);
            } catch (se) {
              console.warn('SessionStorage failed:', se);
            }
          }
          resolve({ data: { path: fileName }, error: null });
        };
        reader.readAsDataURL(file);
      });
    },
    getPublicUrl: (fileName: string) => {
      const key = `mock_storage_${fileName}`;
      const stored = localStorage.getItem(key) || sessionStorage.getItem(key);
      return { data: { publicUrl: stored || `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}` } };
    }
  })
};

const createMockSupabaseClient = () => {
  const auth = new MockAuth();
  return {
    auth,
    from: (tableName: string) => new MockQueryBuilder(tableName),
    storage: mockStorage
  } as any;
};

// Export active supabase client (real or local storage mock fallback)
export const supabase = isMockEnabled 
  ? createMockSupabaseClient()
  : createClient(supabaseUrl, supabaseKey);