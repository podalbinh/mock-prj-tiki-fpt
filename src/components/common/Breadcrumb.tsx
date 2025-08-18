import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export interface CustomBreadcrumbProps {
  items: Array<{ title: string; href?: string }>;
}

const CustomBreadcrumb = ({ items }: CustomBreadcrumbProps) => {
  return (
    <Breadcrumb
      className="pt-4 hidden lg:block"
      separator={<RightOutlined />}
      items={items.map((item, index) => ({
        title: item.href ? (
          <Link
            to={item.href}
            className={
              index === items.length - 1
                ? "font-semibold !text-black !hover:bg-none"
                : "!hover:bg-none"
            }
          >
            {item.title}
          </Link>
        ) : (
          item.title
        ),
      }))}
    />
  );
};

export default CustomBreadcrumb;
