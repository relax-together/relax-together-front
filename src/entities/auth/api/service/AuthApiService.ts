import ApiService from '@/shared/api/service/ApiService';
import { BASE_URL } from '@/shared/lib/constants';
import { SigninUser, SignupUser } from '../../model/user';

class SignupApiService extends ApiService {
  async signup({
    email,
    password,
    name,
    companyName,
  }: {
    email: string;
    password: string;
    name: string;
    companyName: string;
  }) {
    const response = await this.post<SignupUser>(
      `${BASE_URL}/api/auths/signup`,
      {
        email,
        password,
        name,
        companyName,
      },
    );
    return response;
  }
  async checkEmail(email: string) {
    const response = await this.post(`${BASE_URL}/api/auths/check-email`, {
      email,
    });
    return response;
  }
}

export const signupApiService = new SignupApiService();

export type Tokens = { accessToken: string };
class SigninApiService extends ApiService {
  async signin({ email, password }: SigninUser) {
    const response = await this.post<Tokens>(`${BASE_URL}/api/auths/login`, {
      email,
      password,
    });
    return response;
  }
}

export const signinApiService = new SigninApiService();
