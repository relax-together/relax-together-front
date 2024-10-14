'use client';

import { useForgotPassword } from '@/entities/auth/model/hooks/useForgetPassword';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import GenericFormField from '../../ui/GenericFormField';
import TogglePage from '../../ui/TogglePage';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email('이메일 형식을 입력해주세요.'),
});

export type ForgotPasswordFormType = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const router = useRouter();
  const formValid = form.formState.isValid;
  const { sendForgotPasswordEmail } = useForgotPassword(); // 비밀번호 찾기 API 요청 훅 사용
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(values: ForgotPasswordFormType) {
    try {
      const res = await sendForgotPasswordEmail(values.email);
      if (res && res.success) {
        setEmailSent(true); // 이메일 전송 성공
        setErrorMessage(null);
      } else {
        setErrorMessage('해당 이메일은 등록되지 않았습니다.');
      }
    } catch (error) {
      setErrorMessage('이메일 전송에 실패했습니다. 다시 시도해주세요.');
    }
  }

  return (
    <div className="mt-8 h-[321px] w-full rounded-xl bg-white px-4 py-8 md:mx-auto md:mt-[49px] md:w-[608px] md:px-[54px] xl:mx-0 xl:mt-32 xl:w-[510px] xl:px-16 xl:py-8">
      <div className="mb-8 text-center text-xl font-semibold text-gray-800 md:text-2xl">
        비밀번호 찾기
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <GenericFormField
            form={form}
            name="email"
            label="아이디"
            placeholder="이메일을 입력해주세요"
          />

          <div className="!mt-2 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {emailSent ? (
                <div className="text-success text-center text-sm font-semibold">
                  이메일이 전송되었습니다. 받은 편지함을 확인해주세요.
                </div>
              ) : errorMessage ? (
                <div className="text-center text-sm font-semibold text-error">
                  {errorMessage}
                </div>
              ) : null}
              <Button
                disabled={!formValid}
                variant={`${formValid ? 'enabled' : 'disabled'}`}
                size="full"
                className="md:h-11 md:text-base"
              >
                메일 보내기
              </Button>
            </div>
            <TogglePage page="forgetPassword" />
          </div>
        </form>
      </Form>
    </div>
  );
}
