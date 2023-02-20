export default async function ProductSubcategory({ params }) {
  const { category, subcategory } = params;
  return (
    <h1>
      Category {category} Subcategory {subcategory}
    </h1>
  );
}
