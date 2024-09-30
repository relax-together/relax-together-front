import useSelectDateTime from '@/entities/gatherings/model/hook/useSelectDateTime';
import {
  checkButtonAvailabilityByTime,
  getAddHoursDateISOString,
} from '@/entities/gatherings/model/lib/utils';
import CreateGatheringDateTimeSelector from '@/entities/gatherings/ui/create-gathering-form/CreateGatheringDateTimeSelector';
import CreateGatheringFormLabel from '@/entities/gatherings/ui/create-gathering-form/CreateGatheringFormLabel';
import { CreateGathering } from '@/entities/gatherings/ui/main/GatheringCreateModal';
import { ChipTimeProps } from '@/shared/common/ui/chip-time';
import { Calendar } from '@/shared/ui/calendar';
import { FormControl, FormField, FormItem } from '@/shared/ui/form';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type ChipTimeCommonProps = Omit<ChipTimeProps, 'isSelected' | 'onClick'>;

const AMTimes: Array<ChipTimeCommonProps> = [
  { hour: 9, minute: 0, state: 'enabled' },
  { hour: 10, minute: 0, state: 'enabled' },
  { hour: 11, minute: 0, state: 'enabled' },
];

const PMTimes: Array<ChipTimeCommonProps> = [
  { hour: 12, minute: 0, state: 'enabled' },
  { hour: 13, minute: 0, state: 'enabled' },
  { hour: 14, minute: 0, state: 'enabled' },
  { hour: 15, minute: 0, state: 'enabled' },
  { hour: 16, minute: 0, state: 'enabled' },
  { hour: 17, minute: 0, state: 'enabled' },
  { hour: 18, minute: 0, state: 'enabled' },
];

interface CreateGatheringDateTimeFormFiledProps {
  form: UseFormReturn<CreateGathering>;
}
export default function CreateGatheringDateTimeFormFiled({
  form,
}: CreateGatheringDateTimeFormFiledProps) {
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } =
    useSelectDateTime();

  useEffect(() => {
    form.setValue(
      'dateTime',
      getAddHoursDateISOString(selectedDate, selectedTime),
    );
    form.setValue(
      'registrationEnd',
      getAddHoursDateISOString(selectedDate, selectedTime),
    );
  }, [selectedDate, selectedTime]);
  return (
    <FormField
      control={form.control}
      name="dateTime"
      render={({ field }) => (
        <FormItem>
          <CreateGatheringFormLabel label="날짜" />
          <FormControl>
            <div className="space-y-4">
              <div className="flex w-full justify-center rounded-md border border-gray-200 px-2.5 pb-4 pt-2.5">
                <Calendar
                  mode="single"
                  disabled={{ before: new Date() }}
                  selected={selectedDate}
                  onSelect={date => setSelectedDate(date || selectedDate)}
                />
              </div>
              <CreateGatheringDateTimeSelector
                title="오전"
                timeItems={checkButtonAvailabilityByTime(selectedDate, AMTimes)}
                selectedValue={selectedTime}
                onClick={e => setSelectedTime(e.currentTarget.value)}
              />
              <CreateGatheringDateTimeSelector
                title="오후"
                timeItems={checkButtonAvailabilityByTime(selectedDate, PMTimes)}
                selectedValue={selectedTime}
                onClick={e => setSelectedTime(e.currentTarget.value)}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}