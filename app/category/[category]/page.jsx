export default function ProductCategory({ params }) {
    const { category } = params;
    return <h1>Category {category}</h1>;
}