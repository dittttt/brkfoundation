export const getRelativeTime = (date: string | null) => {
  if (!date) return 'Recently';
  const now = new Date();
  const past = new Date(date);
  const diffInSecs = Math.floor((now.getTime() - past.getTime()) / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) return 'Just now';
  if (diffInMins < 60) return `${diffInMins} min${diffInMins > 1 ? 's' : ''} ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays <= 7) return `${diffInDays} days ago`;
  return past.toLocaleDateString();
};
