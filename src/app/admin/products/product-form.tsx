"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProduct, updateProduct } from "@/lib/admin-actions";
import { ImageUpload } from "@/components/admin/image-upload";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
  product?: {
    id: string;
    name: string;
    sku: string;
    categoryId: string;
    basePrice: number | { toString(): string };
    compareAtPrice?: number | { toString(): string } | null;
    stock: number;
    description: string;
    shortDescription?: string | null;
    ingredients?: string | null;
    benefits?: string | null;
    storageInfo?: string | null;
    isActive: boolean;
    isFeatured: boolean;
    isBestSeller: boolean;
    isNew: boolean;
    images?: { url: string; isPrimary?: boolean }[];
  };
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(
    () =>
      product?.images?.find((i) => i.isPrimary)?.url ??
      product?.images?.[0]?.url ??
      "",
  );
  const isEdit = !!product;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    const payload = {
      name: fd.get("name") as string,
      sku: fd.get("sku") as string,
      categoryId: fd.get("categoryId") as string,
      basePrice: Number(fd.get("basePrice")),
      compareAtPrice: fd.get("compareAtPrice")
        ? Number(fd.get("compareAtPrice"))
        : undefined,
      stock: Number(fd.get("stock")),
      description: fd.get("description") as string,
      shortDescription: (fd.get("shortDescription") as string) || undefined,
      ingredients: (fd.get("ingredients") as string) || undefined,
      benefits: (fd.get("benefits") as string) || undefined,
      storageInfo: (fd.get("storageInfo") as string) || undefined,
      imageUrl: imageUrl || undefined,
      isActive: fd.get("isActive") === "on",
      isFeatured: fd.get("isFeatured") === "on",
      isBestSeller: fd.get("isBestSeller") === "on",
      isNew: fd.get("isNew") === "on",
    };

    startTransition(async () => {
      try {
        if (isEdit && product) {
          await updateProduct(product.id, payload);
          toast.success("Product updated");
        } else {
          await createProduct(payload);
          toast.success("Product created");
        }
        router.push("/admin/products");
        router.refresh();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        setError(message);
        toast.error(message);
      }
    });
  };

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-sunset mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <h1 className="text-2xl font-black text-charcoal mb-6">
        {isEdit ? "Edit Product" : "Add Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 p-6 max-w-3xl space-y-5"
      >
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{error}</div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" name="name" required defaultValue={product?.name} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="sku">SKU *</Label>
            <Input id="sku" name="sku" required defaultValue={product?.sku} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="categoryId">Category *</Label>
            <select
              id="categoryId"
              name="categoryId"
              required
              defaultValue={product?.categoryId}
              className="mt-1 flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-sunset"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="basePrice">Price (₹) *</Label>
            <Input
              id="basePrice"
              name="basePrice"
              type="number"
              min="0"
              step="1"
              required
              defaultValue={product ? Number(product.basePrice) : ""}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="compareAtPrice">Compare at Price (₹)</Label>
            <Input
              id="compareAtPrice"
              name="compareAtPrice"
              type="number"
              min="0"
              step="1"
              defaultValue={
                product?.compareAtPrice ? Number(product.compareAtPrice) : ""
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="stock">Stock *</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              required
              defaultValue={product?.stock ?? 0}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <ImageUpload value={imageUrl} onChange={setImageUrl} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              defaultValue={product?.shortDescription ?? ""}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="description">Full Description *</Label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              defaultValue={product?.description ?? ""}
              className="mt-1 flex w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sunset"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Input
              id="ingredients"
              name="ingredients"
              defaultValue={product?.ingredients ?? ""}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="benefits">Benefits</Label>
            <Input
              id="benefits"
              name="benefits"
              defaultValue={product?.benefits ?? ""}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="storageInfo">Storage Info</Label>
            <Input
              id="storageInfo"
              name="storageInfo"
              defaultValue={product?.storageInfo ?? ""}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" defaultChecked={product?.isActive ?? true} />
            Active (visible in store)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isFeatured" defaultChecked={product?.isFeatured} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isBestSeller" defaultChecked={product?.isBestSeller} />
            Best Seller
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isNew" defaultChecked={product?.isNew} />
            New
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </Button>
          <Button type="button" variant="ghost" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
