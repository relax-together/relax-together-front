'use client';
import { SortByValueType } from '@/entities/gatherings/model/params';
import useCommonSearchParams from '@/entities/mypage/model/hooks/useCommonSearchParams';
import CommonSelect, {
  CommonSelectItem,
} from '@/shared/common/ui/common-select';
import DatePicker from '@/shared/common/ui/date-picker';
import FilterButtonGroup from '@/shared/common/ui/filter-button-group';
import { commonFilters } from '@/shared/fixture/filter';
import { commonSelectItems } from '@/shared/fixture/select-items';
import useSearchFilter from '@/shared/hooks/useSearchFilter';

import { SubPage } from '@/shared/lib/constants';
import { FilterIconType } from '@/shared/lib/constants/ui';
import { SelectedValue } from '@/shared/store/useSearchFilterStore';

interface CommonSearchFilterProps {
  sortItems: Array<CommonSelectItem>;
  path: string;
}
export default function CommonSearchFilter({
  sortItems,
  path,
}: CommonSearchFilterProps) {
  const { currentSubPage } = useCommonSearchParams();
  const {
    searchFilterValues,
    setDate,
    setSelectedValue,
    setSelectedSortValue,
  } = useSearchFilter(path);

  return (
    <div
      className={`flex w-full flex-col-reverse items-start justify-between sm:flex-row sm:items-center md:py-5 ${path === 'reviews' ? '' : 'xl:w-[996px] xl:pb-6 xl:pt-[30px]'}`}
    >
      <div className="flex w-full justify-between py-3 sm:w-min md:gap-2 md:py-0">
        <div className="flex justify-between gap-1.5 md:gap-2">
          <CommonSelect
            filterIconType={FilterIconType.DEFAULT}
            menuItems={commonSelectItems}
            onValueChange={selectedValue =>
              setSelectedValue(selectedValue as SelectedValue)
            }
            placeholder="지역 전체"
            selectedValue={searchFilterValues.selectedValue}
          />
          <DatePicker date={searchFilterValues.date} setDate={setDate} />
        </div>
        <CommonSelect
          variant="sort"
          filterIconType={FilterIconType.SORT}
          menuItems={sortItems}
          onValueChange={selectedSortValue =>
            setSelectedSortValue(selectedSortValue as SortByValueType)
          }
          placeholder={sortItems[0].label}
          selectedValue={searchFilterValues.selectedSortValue}
        />
      </div>
      {currentSubPage === SubPage.DALAEMFIT && (
        <div className="w-full border-b-2 border-gray-200 py-3 sm:w-auto sm:border-none md:py-0">
          <FilterButtonGroup filters={commonFilters} path={path} />
        </div>
      )}
    </div>
  );
}
