import { getAllMedia } from "@/server";
import { BackToDashboardButton } from "@/components/custom/nav-buttons";
import { MediaCard } from "@/components/custom/media-card";

export default async function BrowseAllMediaPage() {
  const allMedia = (await getAllMedia()).data;

  return (
    <div className="w-full max-w-screen-md flex flex-col p-8 gap-6 mx-auto">
      <BackToDashboardButton />
      {allMedia?.length === 0 ? (
        <div>No Media Found </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {allMedia?.map((media, idx) => {
            return <MediaCard key={idx + media} url={media} />;
          })}
        </div>
      )}
    </div>
  );
}
