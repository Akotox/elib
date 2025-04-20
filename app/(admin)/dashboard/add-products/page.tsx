"use client";

import { useActionState, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { ActionResponse, submitProduct } from "@/app/actions/product-actions";
import MediaUpload from "@/components/media_uploader";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function AddProducts() {
  const [state, action, isPending] = useActionState<ActionResponse, FormData>(
    submitProduct,
    initialState
  );
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
        <CardDescription>Enter the product details below.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          action={async (formData) => {
           
            if (fileUrl) formData.set("filePath", fileUrl);
            if (imageUrl) formData.set("imagePath", imageUrl);
            return action(formData);
          }}
          className="space-y-6"
          autoComplete="on"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Cool Product"
                required
                className={state?.errors?.name ? "border-red-500" : ""}
              />
              {state?.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceInCents">Price (in cents)</Label>
              <Input
                id="priceInCents"
                name="priceInCents"
                type="number"
                min={1}
                placeholder="1999"
                required
                className={state?.errors?.priceInCents ? "border-red-500" : ""}
              />
              {state?.errors?.priceInCents && (
                <p className="text-sm text-red-500">
                  {state.errors.priceInCents[0]}
                </p>
              )}
            </div>

            <MediaUpload
              label="Upload File"
              id="filePath"
              // name="filePath"
              required
              accept=".pdf,.doc,.docx"
              error={state?.errors?.filePath?.[0]}
              onUpload={(url) => setFileUrl(url)}
            />

            <MediaUpload
              label="Upload Image"
              id="imagePath"
              // name="imagePath"
              required
              accept="image/*"
              error={state?.errors?.imagePath?.[0]}
              onUpload={(url) => setImageUrl(url)}
            />

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="A brief description of the product"
                required
                className={state?.errors?.description ? "border-red-500" : ""}
              />
              {state?.errors?.description && (
                <p className="text-sm text-red-500">
                  {state.errors.description[0]}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isAvailableForPurchase"
                name="isAvailableForPurchase"
                defaultChecked
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 transition"
              />
              <Label
                htmlFor="isAvailableForPurchase"
                className="text-sm font-medium text-gray-700"
              >
                Available for Purchase
              </Label>
            </div>
          </div>

          {state?.message && (
            <Alert variant={state.success ? "default" : "destructive"}>
              {state.success && <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
