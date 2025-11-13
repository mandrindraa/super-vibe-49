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
export { useUserVote, useVote } from "./use-savoirs";

// Comments hooks
export { useComments, useCreateComment } from "./use-savoirs";

// Reactions hooks
export { useReaction, useReactions } from "./use-savoirs";

// Favorites hooks
export { useFavorites, useIsFavorite, useToggleFavorite } from "./use-savoirs";

// Follow hooks
export { useIsFollowing, useToggleFollow } from "./use-savoirs";

// Profile hooks
export { useCurrentUser, useProfile, useUpdateProfile } from "./use-savoirs";

// Activities hooks
export { useActivities } from "./use-savoirs";

// Search hooks
export { useSearch } from "./use-savoirs";
