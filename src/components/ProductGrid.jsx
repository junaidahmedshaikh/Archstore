"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, ArrowLeft } from "lucide-react";
import AddProductForm from "./AddProductForm";
import { initialProducts } from "../../constant";

function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const discountedPrice = product.price * (1 - product.discount / 100);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="group shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:shadow-hover transition-all duration-300 overflow-hidden rounded-lg ">
      <div className="p-0 ">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <img
            src={product.images[currentImageIndex] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {product.images.length > 1 && (
            <>
              <button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-card opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 flex items-center justify-center"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4 text-neutral-700" />
              </button>
              <button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-card opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 flex items-center justify-center"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4 text-neutral-700" />
              </button>

              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? "bg-white shadow-card"
                        : "bg-white/50"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </>
          )}

          {product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{product.discount}%
            </span>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-neutral-900">
              {product.name}
            </h3>
            <p className="text-sm text-neutral-500">{product.brand}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-success-600">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-neutral-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button className="w-full mt-3 cursor-pointer bg-[#ebeafc] text-[#6e62e5] hover:bg-primary-600  py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const [products, setProducts] = useState(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: Math.max(...products.map((p) => p.id)) + 1,
    };
    setProducts([product, ...products]);
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <button
            variant="ghost"
            onClick={() => setShowAddForm(false)}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </button>
          <h2 className="text-2xl font-bold text-neutral-900">
            Add New Product
          </h2>
        </div>
        <AddProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setShowAddForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 py-6 ">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Product Catalog
          </h2>
          <p className="text-neutral-600">
            Browse our collection of tech products
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#6e62e5] flex items-center gap-2  hover:bg-primary-600 text-white px-2 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          <Plus className="h-4 w-4 " />
          Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 bg-neutral-50 rounded-lg">
          <p className="text-neutral-500 text-lg">No products found</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-4 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Your First Product
          </button>
        </div>
      )}
    </div>
  );
}
