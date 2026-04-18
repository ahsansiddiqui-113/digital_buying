"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProduct, uploadProductFile } from "@/actions/products";

interface ProductFormProps {
  onSuccess?: () => void;
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!file) {
        throw new Error("Please select a file");
      }

      const fileUrl = await uploadProductFile(file);

      await createProduct(
        title,
        slug,
        description,
        Math.round(parseFloat(price) * 100),
        fileUrl
      );

      setMessage({
        type: "success",
        text: "Product created successfully!",
      });

      setTitle("");
      setSlug("");
      setDescription("");
      setPrice("");
      setFile(null);

      onSuccess?.();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Title"
            placeholder="Amazing Digital Product"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />

          <Input
            label="Slug"
            placeholder="amazing-digital-product"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            disabled={loading}
          />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
              rows={4}
            />
          </div>

          <Input
            label="Price (USD)"
            type="number"
            placeholder="9.99"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            disabled={loading}
          />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Product File
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              disabled={loading}
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
