import { BackToDashboard } from "@/components/custom/admin-actions";
import { FileUploader } from "@/components/custom/file-uploader";

export default function MediaUploadPage() {
  return (
    <>
      <BackToDashboard></BackToDashboard>
      <FileUploader></FileUploader>
    </>
  );
}
