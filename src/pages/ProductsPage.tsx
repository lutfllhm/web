import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import { featuredCategories } from "../data/featured-categories";

export default function ProductsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-neutral-50"
    >
      <PageHero
        label="Katalog Produk"
        title="Semua Produk"
        description={`${featuredCategories.length} kategori produk tersedia`}
        breadcrumbs={[{ label: "Beranda", to: "/" }, { label: "Produk" }]}
      />

      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/produk/${category.slug}`}
              className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-neutral-900">{category.label}</h3>
                <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{category.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
