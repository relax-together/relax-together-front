import { FilterParams } from '@/entities/gatherings/model/params';

import { FetchParams } from '@/entities/mypage/api/queries';
import { CreateGathering } from '@/features/gatherings/model/create-gathring';
import ApiService from '@/shared/api/service/ApiService';
import { BASE_URL, LIMIT } from '@/shared/lib/constants';
import { Gathering, Response } from '@/shared/model';

class GatheringsApiService extends ApiService {
  async getGatherings({
    pageParam,
    type,
    location,
    date,
    size = LIMIT,
    sortBy,
  }: FetchParams & Partial<FilterParams>) {
    const response = await this.get<Response<Gathering>>(
      `${BASE_URL}/api/gatherings?type=${type}&location=${location ?? ''}&date=${date ?? ''}&page=${pageParam}&size=${size}&sortBy=${sortBy}`,
    );
    return response;
  }
  async createGathering(data: CreateGathering) {
    const response = await this.post<Response<Gathering>>(
      `${BASE_URL}/api/gatherings`,
      data,
    );
    return response;
  }
}

export const gatheringsApiService = new GatheringsApiService();
