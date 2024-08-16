const formatTime = (updatedAt: string): string => {
  const updatedAtUTC = Date.parse(updatedAt);
  const now = new Date();
  const diff = now.getTime() - updatedAtUTC;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  }
  if (hours > 0) {
    return `${hours}시간 전`;
  }
  if (minutes > 0) {
    return `${minutes}분 전`;
  }
  return `방금 전`;
};

export default formatTime;
