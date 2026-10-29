"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit, Layers, Save } from "lucide-react";
import { Store } from "@/lib/data/store";
import { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(Store.getCategories());
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newCat: Category = {
      id: editingId || `cat-${Date.now()}`,
      name,
      slug,
      description,
      image,
      productCount: 0,
    };

    Store.saveCategory(newCat);
    setCategories([...Store.getCategories()]);
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const handleEdit = (c: Category) => {
    setEditingId(c.id);
    setName(c.name);
    setDescription(c.description || "");
    if (c.image) setImage(c.image);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-henna">
          Category Taxonomy Management
        </h1>
        <p className="text-xs text-henna-dark/70 mt-1">
          Organize henna powders, ready cones, hair ritual elixirs, and aftercare salves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Category Creation / Edit Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-sand/30 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-henna flex items-center gap-2">
            <Layers className="w-5 h-5 text-terracotta" />
            <span>{editingId ? "Edit Category" : "Add New Category"}</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-henna-800 block mb-1">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bridal Cones & Pastes"
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2.5 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="font-semibold text-henna-800 block mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Curated collection of freshly rolled cones..."
                className="w-full bg-cream-soft border border-henna-200 rounded-xl p-3 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="font-semibold text-henna-800 block mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-cream-soft border border-henna-200 rounded-xl px-3.5 py-2 text-xs text-henna-900 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-terracotta text-white font-bold uppercase tracking-wider text-xs hover:bg-terracotta-dark shadow-md flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{editingId ? "Update Category" : "Create Category"}</span>
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setName("");
                    setDescription("");
                  }}
                  className="px-4 py-3 rounded-xl bg-henna-100 text-henna-800 text-xs font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Categories List */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-henna-200/90 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-henna-900">
            Active Store Categories ({categories.length})
          </h2>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-cream-soft border border-henna-100 hover:border-henna-300 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  {cat.image && (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-henna-200">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading font-bold text-sm text-henna-900">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-henna-600 line-clamp-1">
                      {cat.description || "No description added"}
                    </p>
                    <span className="text-[10px] text-terracotta font-mono mt-0.5 block">
                      /{cat.slug}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-1.5 text-henna-600 hover:text-terracotta transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
