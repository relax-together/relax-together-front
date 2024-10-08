'use client';

import {
  GatheringsInfoTypes,
  ParticipantListTypes,
} from '@/entities/gatherings-detail/model/information';
import { Progress } from '@/shared/ui/progress';
import { useEffect, useState } from 'react';
import Capacity from './Capacity';
import Participants from './Participants';

interface InformationBottomProps {
  gatheringsInfo: GatheringsInfoTypes;
  participantList: ParticipantListTypes;
}

export default function InformationBottom({
  gatheringsInfo,
  participantList,
}: InformationBottomProps) {
  const [progress, setProgress] = useState<number>(0);

  // progress bar 애니메이션
  useEffect(() => {
    const timer = setTimeout(
      () => setProgress(gatheringsInfo.participantCount),
      500,
    );
    return () => clearTimeout(timer);
  }, [gatheringsInfo.participantCount]);

  return (
    <div className="border-t-2 border-dashed border-gray-200 p-6 pt-3 md:pt-6">
      <Participants
        gatheringsInfo={gatheringsInfo}
        participantList={participantList}
      />
      <Progress
        className="mt-3"
        value={progress}
        capacity={gatheringsInfo.capacity}
      />
      <Capacity gatheringsInfo={gatheringsInfo} />
    </div>
  );
}
