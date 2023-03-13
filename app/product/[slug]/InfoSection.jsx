export default function InfoSection(props) {
  return (
    <>
      <h2 className="my-4 text-2xl font-bold">Product Information</h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-y-8 lg:gap-x-4">
        {props.features.map((feature, id) => (
          <div key={id} className="border-t border-gray-200 pt-4">
            <dt className="text-sm font-medium text-gray-900">
              {feature.name}
            </dt>
            <dd className="mt-2 text-sm text-gray-500">{feature.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
