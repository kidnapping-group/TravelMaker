const formatDateToYYYYMMDD = (dateString: Date) => {
  const date = new Date(dateString);

  // 년, 월, 일을 가져옵니다.
  const year = date.getFullYear();
  // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  // padStart()를 사용하여 한 자리 숫자일 경우 앞에 0을 붙입니다.
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // 원하는 형식으로 조합합니다.
  return `${year}-${month}-${day}`;
};

export default formatDateToYYYYMMDD;
