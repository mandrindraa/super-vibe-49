// ============================================
// CENTRAL HOOKS EXPORT
// Import all hooks from this single file
// ============================================

// Auth hooks
export {
  useAuth,
  useIsAuthenticated,
  useRequireAuth,
  useResetPassword,
  useSignIn,
  useSignInWithProvider,
  useSignOut,
  useSignUp,
  useUpdatePassword,
} from "./use-auth";

// Savoirs hooks
export {
  useCreateSavoir,
  useDeleteSavoir,
  useSavoir,
  useSavoirs,
  useUpdateSavoir,
} from "./use-savoirs";

// Votes hooks
export { useUserVote, useVote } from "./use-votes";

// Comments hooks
export { useComments, useCreateComment } from "./use-comments";

// Reactions hooks
export { useReaction, useReactions } from "./use-reactions";

// Favorites hooks
export { useFavorites, useIsFavorite, useToggleFavorite } from "./use-favorites";

// Follow hooks
export { useIsFollowing, useToggleFollow } from "./use-follow";

// Profile hooks
export { useCurrentUser, useProfile, useUpdateProfile } from "./use-profile";

// Activities hooks
export { useActivities } from "./use-activities";

// Search hooks
export { useSearch } from "./use-search";
