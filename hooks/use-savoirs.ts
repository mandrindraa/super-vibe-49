import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ============================================
// TYPES
// ============================================

interface SavoirFilters {
  category?: string;
  era?: string;
  region?: string;
  search?: string;
  sort?: "recent" | "votes" | "trending";
  page?: number;
  limit?: number;
}

interface CreateSavoirData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  era: string;
  region?: string;
  images?: string[];
  tags?: string[];
  published?: boolean;
}

interface Savoir {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  era: string;
  region: string | null;
  images: string[];
  tags: string[];
  contributor_id: string;
  votes_count: number;
  approval_rate: number;
  views_count: number;
  comments_count: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    username: string;
    full_name: string;
    avatar_url: string | null;
  };
}

interface Comment {
  id: string;
  savoir_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  profiles?: {
    username: string;
    full_name: string;
    avatar_url: string | null;
  };
  replies?: Comment[];
}

// ============================================
// SAVOIRS HOOKS
// ============================================

/**
 * Fetch all savoirs with optional filters
 * @example
 * const { data, isLoading } = useSavoirs({ category: 'Agriculture', sort: 'votes' })
 */
export function useSavoirs(filters: SavoirFilters = {}) {
  return useQuery({
    queryKey: ["savoirs", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });

      const response = await fetch(`/api/savoirs?${params}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch savoirs");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Fetch a single savoir by ID
 * @example
 * const { data: savoir } = useSavoir('abc-123')
 */
export function useSavoir(id: string) {
  return useQuery({
    queryKey: ["savoir", id],
    queryFn: async () => {
      const response = await fetch(`/api/savoirs/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch savoir");
      }
      return response.json() as Promise<Savoir>;
    },
    enabled: !!id,
  });
}

/**
 * Create a new savoir
 * @example
 * const createSavoir = useCreateSavoir()
 * createSavoir.mutate({ title: 'Mon Savoir', ... })
 */
export function useCreateSavoir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSavoirData) => {
      const response = await fetch("/api/savoirs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create savoir");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savoirs"] });
    },
  });
}

/**
 * Update an existing savoir
 * @example
 * const updateSavoir = useUpdateSavoir('abc-123')
 * updateSavoir.mutate({ title: 'Nouveau titre' })
 */
export function useUpdateSavoir(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<CreateSavoirData>) => {
      const response = await fetch(`/api/savoirs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update savoir");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savoir", id] });
      queryClient.invalidateQueries({ queryKey: ["savoirs"] });
    },
  });
}

/**
 * Delete a savoir
 * @example
 * const deleteSavoir = useDeleteSavoir()
 * deleteSavoir.mutate('abc-123')
 */
export function useDeleteSavoir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/savoirs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete savoir");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savoirs"] });
    },
  });
}

// ============================================
// VOTES HOOKS
// ============================================

/**
 * Get user's current vote for a savoir
 * @example
 * const { data } = useUserVote('savoir-id')
 * // data.vote: 1 (upvote), -1 (downvote), or null
 */
export function useUserVote(savoir_id: string) {
  return useQuery({
    queryKey: ["user-vote", savoir_id],
    queryFn: async () => {
      const response = await fetch(`/api/votes?savoir_id=${savoir_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch vote");
      }
      return response.json() as Promise<{ vote: number | null }>;
    },
    enabled: !!savoir_id,
  });
}

/**
 * Cast or update a vote
 * @example
 * const vote = useVote()
 * vote.mutate({ savoir_id: 'abc', vote_type: 1 }) // Upvote
 */
export function useVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      savoir_id,
      vote_type,
    }: {
      savoir_id: string;
      vote_type: 1 | -1;
    }) => {
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savoir_id, vote_type }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to vote");
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["savoir", variables.savoir_id],
      });
      queryClient.invalidateQueries({ queryKey: ["savoirs"] });
      queryClient.invalidateQueries({
        queryKey: ["user-vote", variables.savoir_id],
      });
    },
  });
}

// ============================================
// COMMENTS HOOKS
// ============================================

/**
 * Fetch all comments for a savoir
 * @example
 * const { data: comments } = useComments('savoir-id')
 */
export function useComments(savoir_id: string) {
  return useQuery({
    queryKey: ["comments", savoir_id],
    queryFn: async () => {
      const response = await fetch(`/api/comments?savoir_id=${savoir_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      return response.json() as Promise<Comment[]>;
    },
    enabled: !!savoir_id,
  });
}

/**
 * Create a new comment
 * @example
 * const createComment = useCreateComment()
 * createComment.mutate({
 *   savoir_id: 'abc',
 *   content: 'Super article !',
 *   parent_id: 'xyz' // Optional for replies
 * })
 */
export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      savoir_id: string;
      content: string;
      parent_id?: string;
    }) => {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create comment");
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.savoir_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["savoir", variables.savoir_id],
      });
    },
  });
}

// ============================================
// REACTIONS HOOKS
// ============================================

/**
 * Get reactions for a savoir
 * @example
 * const { data: reactions } = useReactions('savoir-id')
 */
export function useReactions(savoir_id: string) {
  return useQuery({
    queryKey: ["reactions", savoir_id],
    queryFn: async () => {
      const response = await fetch(`/api/reactions?savoir_id=${savoir_id}`);
      if (!response.ok) throw new Error("Failed to fetch reactions");
      return response.json();
    },
    enabled: !!savoir_id,
  });
}

/**
 * Add or remove a reaction
 * @example
 * const react = useReaction()
 * react.mutate({ savoir_id: 'abc', emoji: '👍' })
 */
export function useReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      savoir_id,
      emoji,
    }: {
      savoir_id: string;
      emoji: string;
    }) => {
      const response = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savoir_id, emoji }),
      });
      if (!response.ok) throw new Error("Failed to add reaction");
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reactions", variables.savoir_id],
      });
    },
  });
}

// ============================================
// FAVORITES HOOKS
// ============================================

/**
 * Get user's favorites
 * @example
 * const { data: favorites } = useFavorites()
 */
export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await fetch("/api/favorites");
      if (!response.ok) throw new Error("Failed to fetch favorites");
      return response.json();
    },
  });
}

/**
 * Check if a savoir is favorited
 * @example
 * const { data: isFavorited } = useIsFavorite('savoir-id')
 */
export function useIsFavorite(savoir_id: string) {
  return useQuery({
    queryKey: ["is-favorite", savoir_id],
    queryFn: async () => {
      const response = await fetch(
        `/api/favorites/check?savoir_id=${savoir_id}`
      );
      if (!response.ok) throw new Error("Failed to check favorite");
      return response.json() as Promise<{ isFavorite: boolean }>;
    },
    enabled: !!savoir_id,
  });
}

/**
 * Toggle favorite status
 * @example
 * const toggleFavorite = useToggleFavorite()
 * toggleFavorite.mutate('savoir-id')
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (savoir_id: string) => {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savoir_id }),
      });
      if (!response.ok) throw new Error("Failed to toggle favorite");
      return response.json();
    },
    onSuccess: (_, savoir_id) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["is-favorite", savoir_id] });
    },
  });
}

// ============================================
// FOLLOW HOOKS
// ============================================

/**
 * Check if current user follows another user
 * @example
 * const { data: isFollowing } = useIsFollowing('user-id')
 */
export function useIsFollowing(user_id: string) {
  return useQuery({
    queryKey: ["is-following", user_id],
    queryFn: async () => {
      const response = await fetch(`/api/follows/check?user_id=${user_id}`);
      if (!response.ok) throw new Error("Failed to check follow status");
      return response.json() as Promise<{ isFollowing: boolean }>;
    },
    enabled: !!user_id,
  });
}

/**
 * Toggle follow status
 * @example
 * const toggleFollow = useToggleFollow()
 * toggleFollow.mutate('user-id')
 */
export function useToggleFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user_id: string) => {
      const response = await fetch("/api/follows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });
      if (!response.ok) throw new Error("Failed to toggle follow");
      return response.json();
    },
    onSuccess: (_, user_id) => {
      queryClient.invalidateQueries({ queryKey: ["is-following", user_id] });
      queryClient.invalidateQueries({ queryKey: ["profile", user_id] });
    },
  });
}

// ============================================
// PROFILE HOOKS
// ============================================

/**
 * Get user profile by username
 * @example
 * const { data: profile } = useProfile('marie-dubois')
 */
export function useProfile(username: string) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const response = await fetch(`/api/profiles/${username}`);
      if (!response.ok) throw new Error("Failed to fetch profile");
      return response.json();
    },
    enabled: !!username,
  });
}

/**
 * Get current authenticated user
 * @example
 * const { data: currentUser } = useCurrentUser()
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await fetch("/api/auth/me");
      if (!response.ok) return null;
      return response.json();
    },
    staleTime: Infinity, // Don't refetch until explicit invalidation
  });
}

/**
 * Update current user's profile
 * @example
 * const updateProfile = useUpdateProfile()
 * updateProfile.mutate({ bio: 'Nouvelle bio' })
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      full_name?: string;
      bio?: string;
      avatar_url?: string;
      region?: string;
      website?: string;
    }) => {
      const response = await fetch("/api/profiles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
}

// ============================================
// ACTIVITIES / FEED HOOKS
// ============================================

/**
 * Get activity feed
 * @example
 * const { data: activities } = useActivities({ page: 1, limit: 20 })
 */
export function useActivities(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["activities", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append("page", String(params.page));
      if (params?.limit) searchParams.append("limit", String(params.limit));

      const response = await fetch(`/api/activities?${searchParams}`);
      if (!response.ok) throw new Error("Failed to fetch activities");
      return response.json();
    },
  });
}

// ============================================
// SEARCH HOOK
// ============================================

/**
 * Full-text search across savoirs
 * @example
 * const { data: results } = useSearch('agriculture bio')
 */
export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query || query.trim().length === 0) {
        return { data: [], total: 0 };
      }

      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to search");
      return response.json();
    },
    enabled: !!query && query.trim().length > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
