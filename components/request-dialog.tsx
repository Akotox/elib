"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResponse } from "@/app/actions/product-actions";
import { useActionState } from "react";
import { submitRequest } from "@/app/actions/submit_request";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function RequestBookDialog() {
  const [open, setOpen] = useState(false);

  const [state, action, isPending] = useActionState<ActionResponse, FormData>(
    async (prevState: ActionResponse | null, formData: FormData) => {
        const result = await submitRequest(prevState, formData); 
        if (result.success) {
          setOpen(false);
        }
        return result;
      },
    initialState
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="btn w-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:ml-4 sm:w-auto">
          Request e-book
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a Book</DialogTitle>
          <DialogDescription>
            Let us know what book you'd like to see added to the library.
          </DialogDescription>
        </DialogHeader>
        <form
          action={action}
          className="space-y-6"
          autoComplete="on"
        >
          <div className="space-y-2">
            <Label htmlFor="book-title">Book Title</Label>
            <Input
              id="book-title"
              name="title"
              required
              placeholder="e.g. Atomic Habits"
              aria-label="Book title"
            />
            {state?.errors?.title && (
              <p className="text-red-500 text-sm">
                {state.errors.title[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="book-author">Author</Label>
            <Input
              id="book-author"
              name="author"
              required
              placeholder="e.g. James Clear"
              aria-label="Book author"
            />
            {state?.errors?.author && (
              <p className="text-red-500 text-sm">
                {state.errors.author[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea
              id="details"
              name="additional"
              required
              placeholder="Why do you recommend this book? Or where can we find it?"
              aria-label="Additional details"
            />
            {state?.errors?.additional && (
              <p className="text-red-500 text-sm">
                {state.errors.additional[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}