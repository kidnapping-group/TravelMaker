function formatKoreanWon(price: number): string {
  return `₩ ${price.toLocaleString("ko-KR")}`;
}

export default formatKoreanWon;
