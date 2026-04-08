import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { categorySchema } from "../utils/libs/sanitize";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe } from "lucide-react";
import * as z from "zod";
import { createCategory, getAllCategories } from "../api/AdminApi";
import Swal from "sweetalert2";

const languages = ["en", "am", "or"] as const;

// Infer the type from your Zod schema
type CategoryFormValues = z.infer<typeof categorySchema>;

type AddCategoryProps = {
  openForCategory: boolean;
  setOpenForCategory: (open: boolean) => void;
};

function AddCategory({
  openForCategory,
  setOpenForCategory,
}: AddCategoryProps) {


  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: {
        en: "",
        am: "",
        or: "",
      },
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
    //   console.log("Form data:", data);
    const response = await createCategory(data);
    // console.log("Category created successfully:", response);
    Swal.fire({
      title: "Success!",
      text: response.message || "Category created successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
      setOpenForCategory(false);
      reset();
    } catch (error:any) {
      // console.error("Error creating category:", error);
const err =
  error?.response?.data?.message ||
  error?.message ||
  "Failed to create category.";      Swal.fire({
        title: "Error!",
        text: err,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Dialog open={openForCategory} onOpenChange={setOpenForCategory}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Create a new category for your suits. Provide names in multiple
              languages to reach a wider audience.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 border-t border-slate-100 my-4">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={14} className="text-amber-700" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-950">
                Localization
              </span>
            </div>

            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-none bg-slate-200 border border-slate-300 p-1 h-12">
                {languages.map((lang) => (
                  <TabsTrigger
                    key={lang}
                    value={lang}
                    className="rounded-none font-black text-[10px] uppercase tracking-[0.2em] text-slate-700 data-[state=active]:bg-slate-950 data-[state=active]:text-white transition-all"
                  >
                    {lang === "en"
                      ? "English"
                      : lang === "am"
                        ? "አማርኛ"
                        : "Oromoo"}
                  </TabsTrigger>
                ))}
              </TabsList>

              {languages.map((lang) => (
                <TabsContent key={lang} value={lang} className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Category Name ({lang})
                    </Label>
                    <Input
                      {...register(`name.${lang}`)}
                      placeholder="e.g. Wedding Collection"
                      className={`rounded-none border-slate-300 focus:border-amber-700 text-lg font-bold h-12 ${
                        errors.name?.[lang] ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name?.[lang] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name[lang]?.message}
                      </p>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenForCategory(false)}
              className="bg-slate-50 text-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-950 text-white hover:bg-slate-800"
            >
              {isSubmitting ? "Saving..." : "Save Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategory;
