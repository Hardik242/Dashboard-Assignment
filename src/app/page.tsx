"use client";

import AddWidget from "@/components/AddWidget";
import CategorySection from "@/components/CategorySection";
import CustomiseCategories from "@/components/CustomiseCategory";
import { useCategory } from "@/context/CategoryProvider";

export default function Home() {
  const context = useCategory();

  if (context === null) return;

  const { categories } = context;

  return (
    <main className="relative flex h-screen w-full flex-col gap-3 overflow-y-auto bg-gray-200 py-3">
      <div className="flex w-full items-center justify-between px-2 md:px-4">
        <h1 className="text-xl font-extrabold">My Dashboard</h1>

        <div className="flex items-center justify-center gap-3">
          <AddWidget />

          <CustomiseCategories />
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 px-3 md:px-5">
        {categories?.map((category, index) => (
          <CategorySection category={category} position={index} key={index} />
        ))}
      </div>
    </main>
  );
}
