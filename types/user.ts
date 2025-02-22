export interface UserProfile {
    username: string | null;
    full_name: string | null;
  }
  
  export interface UserWithProfile {
    id: string;
    email: string | null;
    profiles: UserProfile | null;
  }
  
  export interface DatabaseUser {
    id: string;
    email: string | null;
    profiles: UserProfile[] | null;
  }
  