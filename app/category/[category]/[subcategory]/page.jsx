export default async function ProductSubcategory({ params }) {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const product = await data.json();

    const { category, subcategory } = params;
    return <h1>Category {category} Subcategory {subcategory}</h1>;
}