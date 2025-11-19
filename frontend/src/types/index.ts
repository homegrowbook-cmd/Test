export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  avatar?: string;
  bio?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  createdAt: string;
}

export interface Run {
  id: string;
  title: string;
  description?: string;
  strainName: string;
  strainType?: string;
  isPublic: boolean;
  lightType?: string;
  lightWatts?: number;
  medium?: string;
  nutrients?: string;
  phase: 'SEEDLING' | 'VEGETATIVE' | 'FLOWERING' | 'DRYING' | 'CURING';
  startDate: string;
  endDate?: string;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
  _count?: {
    entries: number;
    likes: number;
    comments: number;
  };
}

export interface Entry {
  id: string;
  title: string;
  content?: string;
  dayNumber: number;
  weekNumber: number;
  temperature?: number;
  humidity?: number;
  vpd?: number;
  ec?: number;
  ph?: number;
  ppfd?: number;
  images: string[];
  runId: string;
  userId: string;
  user?: User;
  run?: Run;
  createdAt: string;
  updatedAt: string;
  _count?: {
    comments: number;
  };
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  user?: User;
  runId?: string;
  entryId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  userId: string;
  runId: string;
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}
