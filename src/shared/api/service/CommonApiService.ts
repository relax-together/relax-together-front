import { Tokens } from '@/entities/auth/api/service/AuthApiService';
import ApiService from '@/shared/api/service/ApiService';
import { BASE_URL } from '@/shared/lib/constants';
import { User } from '@/shared/model';

class CommonApiService extends ApiService {
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor() {
    super();
    this.setupInterceptors();
  }

  private setupInterceptors() {
    CommonApiService.instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (
          !(
            error.config.url === `${BASE_URL}/api/auths/logout` ||
            error.config.url === `${BASE_URL}/api/auths/login`
          ) &&
          error.response &&
          error.response.status === 401 &&
          !error.response.data.message.includes('토큰이 만료되었습니다') &&
          !originalRequest._retry
        ) {
          if (this.isRefreshing) {
            return new Promise(resolve => {
              this.refreshSubscribers.push((token: string) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                resolve(CommonApiService.instance(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshResponse = await this.refreshToken();
            const newAccessToken = refreshResponse.data.accessToken;

            localStorage.setItem('accessToken', newAccessToken);
            CommonApiService.setAccessToken(newAccessToken);

            this.refreshSubscribers.forEach(callback =>
              callback(newAccessToken),
            );
            this.refreshSubscribers = [];

            originalRequest.headers['Authorization'] =
              `Bearer ${newAccessToken}`;
            return CommonApiService.instance(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('signin-user-data');
            CommonApiService.setAccessToken('');
            window.location.href = '/';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async signout() {
    const response = await this.post(`${BASE_URL}/api/auths/logout`);
    return response;
  }

  async leaveGatheringById(gatheringId: number) {
    const response = await this.delete(
      `${BASE_URL}/api/gatherings/${gatheringId}/leave`,
    );
    return response;
  }
  async refreshToken() {
    try {
      const response = await this.get<Tokens>(
        `${BASE_URL}/api/auths/refresh-token`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getUserInfo() {
    const response = await this.get<User>(`${BASE_URL}/api/auths/me`);
    return response;
  }
}

export const commonApiService = new CommonApiService();
