import * as React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const CustomUpload = ({ setFile, defaultImage }) => {
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(defaultImage);
  function handleChange(info) {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(loading);
      });
    }
  }
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 16;
    if (!isLt2M) {
      message.error("Image must smaller than 16MB!");
    }
    setFile(file);
    return isJpgOrPng && isLt2M;
  }
  function dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
      onSuccess("ok");
    }, []);
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      customRequest={dummyRequest}
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      maxCount={1}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default CustomUpload;
