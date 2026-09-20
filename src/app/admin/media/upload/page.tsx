import { BackToDashboard } from "@/components/custom/admin-actions";
import { FileUploader } from "@/components/custom/file-uploader";

export default function MediaUploadPage() {
  return (
    <div className="w-full max-w-screen-xl mt-24 flex flex-col p-8 gap-6 mx-auto">
      <BackToDashboard></BackToDashboard>
      <FileUploader></FileUploader>
    </div>
  );
}
