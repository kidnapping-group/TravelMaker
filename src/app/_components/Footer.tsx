function Footer() {
  return (
    <footer className="flex w-full justify-center bg-gray-100 px-5 pb-16 pt-10 text-xs text-gray-400 pc:px-10">
      <div className="flex w-full max-w-[1200px] flex-col">
        <p className="font-medium text-gray-500">주식회사 유괴단</p>
        <p>주소 : 서울특별시 을지로3가역 12번 출구 하얀 봉고차</p>
        <div className="flex gap-4">
          <p>고객센터 : 오후 10시 ~ 오전 6시 (주말, 공휴일 포함)</p>
          <p>
            연락처 :{" "}
            <a href="https://github.com/kidnapping-group" target="_blank">
              github.com/kidnapping-group
            </a>
          </p>
        </div>
        <p>
          유괴단은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한
          의무와 책임은 판매자에게 있습니다.
        </p>
        <p className="mt-5">Copyright KIDNAP Corp. All rights cunningly taken.</p>
      </div>
    </footer>
  );
}

export default Footer;
