import Image from 'next/image';

export default function AuthImage() {
  return (
    <div className="mb-5 flex justify-center md:mb-[30px]">
      <Image
        src="/assets/auth-img.png"
        alt="auth-img"
        width={290}
        height={0}
        className="md:w-[410px] xl:w-[600px]"
      />
    </div>
  );
}