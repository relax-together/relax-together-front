import TagClock from '@/shared/common/ui/tag-clock';
import Image from 'next/image';
import { GatheringsInfoTypes } from '../../model/information';
import Information from '../information';

interface GatheringTopProps {
  id: string;
  gatheringsInfo: GatheringsInfoTypes;
}

export default function GatheringTop({
  id,
  gatheringsInfo,
}: GatheringTopProps) {
  return (
    <div className="gap-6 sm:flex">
      <div className="relative h-[180px] overflow-hidden rounded-xl border-2 border-gray-200 sm:h-[240px] sm:w-1/2 md:h-[270px]">
        <Image
          src={gatheringsInfo.imageUrl}
          alt="이미지"
          width={486}
          height={270}
          className="h-full w-full object-cover"
        />
        <div className="absolute right-0 top-0">
          <TagClock message="오늘 21시 마감" variant="rounded" />
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:w-1/2">
        <Information id={id} gatheringsInfo={gatheringsInfo} />
      </div>
    </div>
  );
}