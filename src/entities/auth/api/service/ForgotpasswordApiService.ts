import ApiService from '@/shared/api/service/ApiService';
import { BASE_URL } from '@/shared/lib/constants';

class ForgotPasswordApiService extends ApiService {
  constructor() {
    super();
  }
  async sendForgotPasswordEmail(email: string) {
    const response = await this.post(`${BASE_URL}/api/auths/forgot-password`, {
      email,
    });
    return response;
  }

  // 비밀번호 재설정 요청 (토큰과 새 비밀번호를 전달)
  async resetPassword(token: string, newPassword: string) {
    const response = await this.post(`${BASE_URL}/api/auths/reset-password`, {
      token,
      newPassword,
    });

    // 성공 시 response.data에서 성공 여부 반환
    return response.data;
  }
}

export const forgotPasswordApiService = new ForgotPasswordApiService();
