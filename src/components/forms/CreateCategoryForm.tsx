import { Form, Input, Button, Space } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import type { Category } from "@/constant/interfaces";
import SearchableSelector from "@/components/common/SearchableSelector";
import { useCategory } from "@/hooks/useCategory";

interface CreateCategoryFormProps {
  onSubmit?: (values: Category) => void;
  onCancel?: () => void;
  loading?: boolean;
  defaultValues?: Category;
}

export default function CreateCategoryForm({
  onSubmit,
  onCancel,
  loading = false,
  defaultValues,
}: CreateCategoryFormProps) {
  const [form] = Form.useForm();
  const { searchCategories } = useCategory();

  const handleFinish: FormProps<Category>["onFinish"] = (values) => {
    onSubmit?.(values);
  };

  const onSelectOption = (option: Category) => {
    form.setFieldsValue({ parentId: option.id });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form
        form={form}
        name="createCategory"
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
        className="space-y-4"
        initialValues={{
          ...defaultValues,
          parentId: defaultValues?.parent?.id || undefined,
        }}
      >
        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">
              Tên danh mục
            </span>
          }
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên danh mục!" },
            { min: 2, message: "Tên danh mục phải có ít nhất 2 ký tự!" },
            { max: 50, message: "Tên danh mục không được vượt quá 50 ký tự!" },
          ]}
        >
          <Input
            prefix={<AppstoreOutlined className="text-gray-400" />}
            placeholder="Nhập tên danh mục"
            className="h-10"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">
              Danh mục cha
            </span>
          }
          name="parentId"
        >
          <SearchableSelector<Category>
            placeholder="Chọn danh mục cha"
            valueKey="id"
            labelKey="name"
            pageSize={10}
            defaultValue={defaultValues?.parent?.id}
            fetchData={searchCategories}
            onSelect={onSelectOption}
          />
        </Form.Item>

        <Form.Item className="mb-0 pt-4">
          <Space className="w-full justify-end">
            <Button onClick={onCancel} className="px-6">
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              {defaultValues ? "Sửa danh mục" : "Tạo danh mục"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
