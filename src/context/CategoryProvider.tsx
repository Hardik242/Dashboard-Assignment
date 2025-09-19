"use client";

import { initialCategories } from "@/data";
import { Categories, Widget } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type UpdateCategoryArgs = {
  mode: "Toggle Visibility" | "Add Widget" | "Delete Widget";
  catPosition: number;
  widPosition?: number;
  newWidget?: Widget;
};

type CategoryContextType = {
  categories: Categories;
  updateCategory: (args: UpdateCategoryArgs) => void;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

export default function CategoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [categoryVal, setCategoryStore] = useState(initialCategories);

  function updateCategory({
    mode,
    catPosition,
    widPosition,
    newWidget,
  }: UpdateCategoryArgs) {
    if (mode === "Toggle Visibility" && widPosition !== undefined) {
      setCategoryStore((currentCategories) =>
        currentCategories.map((category, catIdx) => {
          if (catIdx !== catPosition) return category;

          return {
            ...category,
            widgets: category.widgets.map((widget, widIdx) => {
              if (widIdx !== widPosition) return widget;

              return { ...widget, visibility: !widget.visibility };
            }),
          };
        }),
      );
    } else if (mode === "Add Widget" && newWidget) {
      setCategoryStore((currentCategories) =>
        currentCategories.map((category, catIdx) => {
          if (catIdx !== catPosition) return category;

          return {
            ...category,
            widgets: [...category.widgets, newWidget],
          };
        }),
      );
    } else if (mode === "Delete Widget" && widPosition !== undefined) {
      setCategoryStore((currentCategories) =>
        currentCategories.map((category, catIdx) => {
          if (catIdx !== catPosition) return category;

          return {
            ...category,
            widgets: category.widgets.filter(
              (widget, widIdx) => widIdx !== widPosition,
            ),
          };
        }),
      );
    }
  }

  const values: CategoryContextType = {
    categories: categoryVal,
    updateCategory,
  };

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const categories = useContext(CategoryContext);

  if (categories === null) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  return categories;
}
