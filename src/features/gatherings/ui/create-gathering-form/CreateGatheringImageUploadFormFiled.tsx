import { CreateGatheringCommonProps } from '@/features/gatherings/model/create-gathring';
import CreateGatheringFormLabel from '@/features/gatherings/ui/create-gathering-form/CreateGatheringFormLabel';
import FileUpload from '@/features/gatherings/ui/create-gathering-form/FileUpLoad';

import { FormControl, FormField, FormItem } from '@/shared/ui/form';

export default function CreateGatheringImageUploadFormFiled({
  control,
  selectedFilter,
}: CreateGatheringCommonProps) {
  return (
    <FormField
      control={control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <CreateGatheringFormLabel label="이미지" />
          <FormControl>
            <FileUpload
              onChange={field.onChange}
              imageUrl={field.value ?? ''}
              selectedFilter={selectedFilter}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}