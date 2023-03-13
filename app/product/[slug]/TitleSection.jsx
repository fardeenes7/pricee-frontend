export default function TitleSection(props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className=" font-bold md:text-xl">{props.name}</h1>
      <div className="flex flex-col gap-2 text-sm">
        <h1 className="font-bold">
          Brand: <span className="text-gray-500">{props.brand}</span>
        </h1>
        <h1 className="font-bold">
          Model: <span className="text-gray-500">{props.model}</span>
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {props.links.map((link, id) => (
          <button
            className={`${
              link.price === props.best_price &&
              "row-start-auto border-accent-1"
            } relative flex h-full flex-col content-start rounded-lg border-2 border-transparent bg-white p-2 px-4 shadow-lg hover:border-accent-1`}
            key={id}
          >
            {link.price === props.best_price && (
              <span className="font-bold text-accent-1">Best Price **</span>
            )}
            <div className="flex w-full items-center justify-between">
              <img
                className={`my-auto ${
                  link.shop.slug === "startech" ? "h-[50%]" : "h-[30%]"
                } ${link.shop.slug === "techland" && "greyscale invert"} `}
                src={link.shop.logo}
                alt={link.shop.name}
              />
              <span className="my-auto font-bold">BDT {link.price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
