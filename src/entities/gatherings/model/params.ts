import { PaginationParams } from '@/entities/mypage/model';
import { GatheringLocation, GatheringType } from '@/shared/model';

export type SortBy =
  | 'registrationEnd'
  | 'participantCount'
  | 'createdDate'
  | 'score';
export type FilterParams = {
  type: GatheringType;
  location?: GatheringLocation;
  date?: string;
  sortBy?: SortBy;
} & PaginationParams;
