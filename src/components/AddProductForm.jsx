"use client";

import { useState } from "react";
import { X, Upload, Plus } from "lucide-react";

export default function AddProductForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: 0,
    discount: 0,
    images: [],
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      const url = newImageUrl.trim().startsWith("http")
        ? newImageUrl.trim()
        : `/placeholder.svg?height=300&width=300`;

      setImageUrls((prev) => [...prev, url]);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
      setNewImageUrl("");
    }
  };

  const removeImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.brand && formData.price > 0) {
      // If no images provided, add a placeholder
      const finalProduct = {
        ...formData,
        images:
          formData.images.length > 0
            ? formData.images
            : ["/placeholder.svg?height=300&width=300"],
      };
      onSubmit(finalProduct);
    }
  };

  return (
    <div className=" mx-auto w-full">
      <div className="flex justify-between items-center">
        <h1>Product Information</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name">
                Product Name<span className="text-red-500">* </span>
              </label>
              <input
                id="name"
                value={formData.name}
                className="border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6e62e5]"
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="brand">
                Brand<span className="text-red-500">* </span>
              </label>
              <input
                id="brand"
                className="border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6e62e5]"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                placeholder="Enter brand name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="price">
                Price<span className="text-red-500">* </span>
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                className="border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6e62e5]"
                value={formData.price || ""}
                onChange={(e) =>
                  handleInputChange(
                    "price",
                    Number.parseFloat(e.target.value) || 0
                  )
                }
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="discount">Discount (%) </label>
              <input
                id="discount"
                type="number"
                min="0"
                max="100"
                className="border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6e62e5]"
                value={formData.discount || ""}
                onChange={(e) =>
                  handleInputChange(
                    "discount",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label>Product Images</label>

            <div className="flex gap-2">
              <input
                value={newImageUrl}
                className="flex-1 border-[1px] border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6e62e5]"
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL or leave empty for placeholder"
                // className="flex-1"
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="bg-[#6e62e5] text-white rounded-md px-4 py-2"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <Upload className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Add image URLs above or leave empty to use placeholder images
              </span>
            </div>
          </div>

          <div className="flex w-full justify-end gap-4 pt-4">
            <button
              type="submit"
              className="bg-[#6e62e5] text-white rounded-md p-2"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="border-2 border-[#6e62e5] text-[#6e62e5] rounded-md p-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
