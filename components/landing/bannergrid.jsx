export default async function BannerGrid({ data }) {
  return (
    <div className="bannergrid mb-4 grid grid-cols-3 gap-2 md:mx-0 md:grid-cols-4">
      {data.map((banner, id) => (
        <div
          key={id}
          className={`break-inside-avoid overflow-hidden rounded-xl ${
            banner.size === "3x1"
              ? "col-span-3 row-span-1 aspect-[3/1] lg:col-span-3"
              : "aspect-square col-span-3 row-span-1 md:col-span-1"
          }`}
        >
          <img
            className="h-full w-full object-cover"
            src={`${process.env.MEDIA_URL}/${banner.image}`}
            alt={banner.name}
          />
        </div>
      ))}
      {/* {data.bannerAds.map((banner) => (
        <div
          className={`overflow-hidden rounded-xl ${
            banner.size === "2x1"
              ? "order-last col-span-2 row-span-1 lg:col-span-2"
              : `${
                  banner.size === "1x1"
                    ? "col-span-1 row-span-1"
                    : "col-span-1 row-span-2"
                }`
          }`}
          key={banner.id}
        >
          <img
            className="h-full w-full object-cover"
            src={`${process.env.MEDIA_URL}/${banner.image}`}
            alt={banner.name}
          />
        </div>
      ))} */}
    </div>
  );
}
