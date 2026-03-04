import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <div className="bg-brand-light">
      <Hero />
      <FeaturedProducts />
    </div>
  );
}
