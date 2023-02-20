export default function Product({ params }) {
    
  const { slug } = params;
  return <div>{slug}</div>;
}
