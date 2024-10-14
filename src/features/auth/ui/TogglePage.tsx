import Link from 'next/link';

type TogglePagePropsMap = {
  signup: {
    span: string;
    href: string;
    link: string;
  };
  signin: {
    span: string;
    href: string;
    link: string;
  };
  forgetPassword: {
    span: string;
    href: string;
    link: string;
  };
};

export default function TogglePage({
  page,
}: {
  page: keyof TogglePagePropsMap;
}) {
  const PageMap: TogglePagePropsMap = {
    signup: {
      span: '이미 회원이신가요?',
      href: '/signin',
      link: '로그인',
    },
    signin: {
      span: '같이 달램이 처음이신가요?',
      href: '/signup',
      link: '회원가입',
    },
    forgetPassword: {
      span: '비밀번호를 잊어버리셨나요?',
      href: '/forget-password',
      link: '비밀번호 찾기',
    },
  };

  return (
    <div className="mt-10 flex h-[18px] flex-col items-center justify-center gap-1 text-[15px] font-medium">
      {/* 로그인 페이지에서는 회원가입과 비밀번호 찾기 링크 모두 출력 */}
      {page === 'signin' && (
        <>
          <div className="flex">
            <p className="text-gray-500">{PageMap.signin.span}</p>
            <Link
              href={PageMap.signin.href}
              className="ml-2 text-green-500 underline"
            >
              {PageMap.signin.link}
            </Link>
          </div>
          <div className="mt-10 flex">
            <p className="text-gray-500">{PageMap.forgetPassword.span}</p>
            <Link
              href={PageMap.forgetPassword.href}
              className="ml-2 text-gray-500 underline"
            >
              {PageMap.forgetPassword.link}
            </Link>
          </div>
        </>
      )}

      {/* 비밀번호 찾기 페이지에서는 회원가입 링크만 출력 */}
      {page === 'forgetPassword' && (
        <div className="relative top-[-30px] flex text-[15px] font-medium">
          <p className="text-gray-800">{PageMap.signin.span}</p>
          <Link
            href={PageMap.signin.href}
            className="ml-2 text-green-500 underline"
          >
            {PageMap.signin.link}
          </Link>
        </div>
      )}
    </div>
  );
}
