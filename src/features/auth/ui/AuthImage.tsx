import AuthSvgImage from '@/shared/assets/auth-img.svg';

export default function AuthImage() {
  return (
    <div className="flex justify-center">
      <AuthSvgImage className="h-[188px] w-[290px] md:h-[270px] md:w-[410px] lg:h-[400px] lg:w-[600px]" />
    </div>
  );
}
