import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Select, Spin } from "antd";
import { debounce } from "lodash";
import type { PageableParams } from "@/constant/interfaces";
import { SearchOutlined } from "@ant-design/icons";

interface SearchableSelectorProps<T> {
  placeholder?: string;
  valueKey: keyof T;
  labelKey: keyof T;
  className?: string;
  onSelect?: (option: T) => void;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  pageSize?: number;
  fetchData: (params: PageableParams) => Promise<T[]>;
  renderExtraInfo?: (item: T) => React.ReactNode;
  defaultValue?: any;
}

function SearchableSelector<T>({
  placeholder = "Tìm kiếm và chọn...",
  valueKey,
  labelKey,
  className = "",
  onSelect,
  disabled = false,
  size = "large",
  pageSize = 20,
  fetchData,
  renderExtraInfo,
  defaultValue,
}: SearchableSelectorProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  const selectRef = useRef<any>(null);

  const handleFetchData = async (searchTerm = "") => {
    setLoading(true);
    try {
      const result = await fetchData({
        keyword: searchTerm,
        size: pageSize,
      } as PageableParams);
      setData(result);
    } catch (error) {
      console.error("Lỗi khi fetch data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(handleFetchData, 500), [
    fetchData,
    pageSize,
  ]);

  useEffect(() => {
    debouncedFetch(searchValue);
  }, [searchValue, debouncedFetch]);

  const filteredOptions = useMemo(() => {
    if (!data.length) return [];
    return data.map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
      data: item,
    }));
  }, [data, valueKey, labelKey]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = (value: any) => {
    const selectedData = filteredOptions.find((opt) => opt.value === value);
    if (selectedData && onSelect) {
      onSelect(selectedData.data);
    }
    setSearchValue("");
    setOpen(false);
    selectRef.current?.blur()
  };

  return (
    <div className={`relative ${className}`}>
      <Select
        ref={selectRef}
        showSearch
        allowClear
        placeholder={placeholder}
        size={size}
        loading={loading}
        disabled={disabled}
        open={open}
        defaultValue={defaultValue}
        onOpenChange={setOpen}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onClear={() => setSearchValue("")}
        filterOption={false}
        searchValue={searchValue}
        className="w-full"
        prefix={
          loading ? (
            <Spin size="small" />
          ) : (
            <SearchOutlined className="text-gray-400" />
          )
        }
        notFoundContent={
          loading ? (
            <div className="flex items-center justify-center py-4">
              <Spin size="small" className="mr-2" />
              Đang tải...
            </div>
          ) : (
            <div className="flex items-center justify-center py-4 text-gray-500">
              Không tìm thấy
            </div>
          )
        }
      >
        {filteredOptions.map((option) => (
          <Select.Option
            key={option.value as string}
            value={option.value as string}
            className="hover:bg-blue-50 rounded-lg my-1"
          >
            <div className="py-2 px-1">
              <div className="font-medium text-gray-900 truncate">
                {option.label as string}
              </div>
              {renderExtraInfo && renderExtraInfo(option.data)}
            </div>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default SearchableSelector;
