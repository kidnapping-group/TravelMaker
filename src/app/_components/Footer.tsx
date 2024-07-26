import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-green text-white pt-8 pb-16 h-40 ">
        <div className="flex mx-auto items-center justify-center flex-col gap-y-6 tablet:flex-row gap-x-14 pc:gap-x-96">
            <div className="flex flex-row gap-x-3 tablet:gap-x-14 pc:gap-x-96">
                <div>&copy;TravelMaker-2024</div>
                <div className="flex flex-row gap-x-7">
                    <div>Privacy Policy</div>
                    <div>FAQ</div>
                </div>
            </div>
            <div className="flex flex-row gap-x-3">
                <Link href="https://www.facebook.com">
                    <Image src="/icons/icon-facebook.svg" width={20} height={20} alt="페이스북" priority/>
                </Link>
                <Link href="https://x.com/?lang=ko">
                    <Image src="/icons/icon-twitter.svg" width={20} height={20} alt="트위터" priority/>
                </Link>
                <Link href="https://www.youtube.com/">
                    <Image src="/icons/icon-youtube.svg" width={20} height={20} alt="유튜브" priority/>
                </Link>
                <Link href="https://www.instagram.com/">
                    <Image src="/icons/icon-instagram.svg" width={20} height={20} alt="인스타그램" priority/>
                </Link>
            </div>
        </div>
        
    </footer>
  );
};

export default Footer;
