import ForgotPasswordForm from '@/features/auth/forget-password/ui/ForgetPassword';
import AuthHeader from '@/features/auth/ui/AuthHeader';
import AuthImage from '@/features/auth/ui/AuthImage';

export default function Signin() {
  return (
    <>
      <div>
        <AuthHeader
          title="비밀번호를 분실하셨나요?ㅠㅠ"
          content={`이메일로 보낸 링크를 타고 들어와서\n비밀번호 변경이 가능합니다.`}
        />
        <AuthImage />
      </div>
      <ForgotPasswordForm />
    </>
  );
}
