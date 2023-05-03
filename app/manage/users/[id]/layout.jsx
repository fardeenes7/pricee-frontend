import Breadcrumb from "./breadcrumb";
import Tabs from "./tabs";

const profile = {
  id: "1",
  name: "Ricardo Cooper",
  imageUrl:
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  coverImageUrl:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Phone: "(555) 123-4567",
    Email: "ricardocooper@example.com",
    Title: "Senior Front-End Developer",
    Team: "Product Development",
    Location: "San Francisco",
    Sits: "Oasis, 4th floor",
    Salary: "$145,000",
    Birthday: "June 8, 1990",
  },
};

async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_MANAGE_URL}/users/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function UserLayout({ params, children }) {
  const data = await getData(params.id);
  return (
    <div>
      <Breadcrumb name={params.id} />
      <article className="mt-4">
        {/* Profile header */}
        <div>
          <div>
            <img
              className="h-32 w-full object-cover lg:h-48"
              src={profile.coverImageUrl}
              alt=""
            />
          </div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.profile_pic}`}
                  alt=""
                />
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                  <h1 className="truncate text-2xl font-bold text-gray-900">
                    {data.name}
                  </h1>
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    <i
                      className="fa-solid fa-envelope my-auto -ml-1 mr-2 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {data.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs id={profile.id} />
        {children}
      </article>
    </div>
  );
}
