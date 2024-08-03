const formatTime = (updatedAt: string): string => {
  const updatedAtUTC = Date.parse(updatedAt);
  const now = new Date();
  const diff = now.getTime() - updatedAtUTC;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  switch (true) {
    case days > 0:
      return `${days}일 전`;
    case hours > 0:
      return `${hours}시간 전`;
    case minutes > 0:
      return `${minutes}분 전`;
    default:
      return `방금 전`;
  }
};

export default formatTime;
