import { useState } from 'react';
import { forgotPasswordApiService } from '../../api/service/ForgotpasswordApiService';
// API 호출 서비스

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);

  async function sendForgotPasswordEmail(email: string) {
    setLoading(true);
    try {
      const response =
        await forgotPasswordApiService.sendForgotPasswordEmail(email);

      // 응답에서 data를 통해 success를 확인
      if (response.data && response.data.success) {
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: '이메일 전송에 실패했습니다.' };
    } finally {
      setLoading(false);
    }
  }

  return { sendForgotPasswordEmail, loading };
}
