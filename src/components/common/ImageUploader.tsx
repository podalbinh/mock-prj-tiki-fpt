import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import type { UploadFile, UploadProps, GetProp } from "antd";
import type { RcFile } from "antd/es/upload";
import useUpload from "@/hooks/useUpload";
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface ImageUploadProps {
  multiple?: boolean;
  maxCount?: number;
  listType?: "picture-card" | "picture" | "text";
  value?: string[];
  onChange?: (urls: string[]) => void;
  toggleUploading?: (value: boolean) => void;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload: React.FC<ImageUploadProps> = ({
  multiple = false,
  maxCount = 1,
  listType = "picture-card",
  value = [],
  onChange,
  toggleUploading,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(
    value?.map((url, idx) => ({
      uid: String(idx),
      name: `image-${idx}`,
      status: "done",
      url,
    })) || []
  );
  const { uploadImage, deleteImage } = useUpload();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    file,
    fileList: newFileList,
  }) => {
    setFileList(newFileList);

    const uploadedUrls = newFileList
      .filter((f) => f.status === "done" && (f.url || f.response?.url))
      .map((f) => f.url || f.response?.url);

    onChange?.(uploadedUrls as string[]);

    if (file.status === "error") {
      message.error(`${file.name} upload failed.`);
    }

    if (file.status === "done" && toggleUploading) {
      toggleUploading(false);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ được upload file ảnh!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const customRequest = async (options: RcCustomRequestOptions) => {
    const { file, onSuccess, onError } = options;

    try {
      if (toggleUploading) {
        toggleUploading(true);
      }
      const res = await uploadImage(file as RcFile);
      onSuccess?.(res);
    } catch (err) {
      onError?.(err as Error);
    }
  };

  const handleRemove: UploadProps["onRemove"] = async (file) => {
    try {
      const imageId = file.response?.id;
      if (!imageId) return;
      if (toggleUploading) {
        toggleUploading(true);
      }
      await deleteImage(imageId);

      message.success("Xoá ảnh thành công");
      return true;
    } catch (err) {
      message.error("Xoá ảnh thất bại");
      console.error("Error deleting image:", err);

      return false;
    } finally {
      if (toggleUploading) {
        toggleUploading(false);
      }
    }
  };

  return (
    <>
      <Upload
        customRequest={customRequest}
        listType={listType}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        multiple={multiple}
        maxCount={maxCount}
        onRemove={handleRemove}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageUpload;
