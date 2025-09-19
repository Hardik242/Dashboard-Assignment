import SideBar from "@/components/SideBar";
import { useCategory } from "@/context/CategoryProvider";
import { LucideTrash2, Pen, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function CustomiseCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const context = useCategory();

  if (context === null) return;

  const { categories, updateCategory } = context;

  return (
    <>
      {isOpen && (
        <SideBar
          title="Customise Categories"
          setIsOpen={() => {
            setIsOpen(false);
          }}
        >
          <div className="flex flex-col gap-2">
            <p>Personalise Dashboard by Toggeling Widgets categorywise</p>

            <div className="h-0 w-full border border-stone-500"></div>

            <div className="flex flex-col gap-4 overflow-hidden p-1">
              <div className="mx-2 flex gap-2 overflow-x-auto border-b border-black border-b-gray-300 pt-1">
                {categories.map(({ title }, index) => (
                  <span
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`flex-none cursor-pointer border-0 px-3 py-2 hover:border-b-2 ${activeCategory === index ? "border-b-2 bg-gray-100 font-bold" : "font-semibold"}`}
                  >
                    {title}
                  </span>
                ))}

                <span
                  className={`flex flex-none cursor-pointer items-center justify-center border-0 px-3 py-2 hover:border-b-2 ${activeCategory === categories.length + 1 ? "border-b-2 bg-gray-100 font-bold" : "font-semibold"}`}
                >
                  <PlusCircle className="size-4" />
                </span>
              </div>

              <div className="flex flex-col gap-2 px-2">
                {categories[activeCategory].widgets.length !== 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Toggle Visibility</span>
                    <span>Delete</span>
                  </div>
                )}

                {categories[activeCategory].widgets.length === 0 ? (
                  <div>No widget available for this category</div>
                ) : (
                  categories[activeCategory].widgets?.map(
                    ({ title, visibility }, index) => {
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="flex w-full gap-2 rounded-md border-stone-300 bg-stone-200 p-2 hover:bg-stone-300"
                            onClick={() =>
                              updateCategory({
                                mode: "Toggle Visibility",
                                catPosition: activeCategory,
                                widPosition: index,
                              })
                            }
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-500"
                              name={title}
                              value={title}
                              readOnly
                              checked={visibility}
                            />
                            <label htmlFor={title}>{title}</label>
                          </div>

                          <div
                            className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-red-100 hover:bg-red-200 hover:font-bold"
                            onClick={() =>
                              updateCategory({
                                mode: "Delete Widget",
                                catPosition: activeCategory,
                                widPosition: index,
                              })
                            }
                          >
                            <LucideTrash2 className="size-5" />
                          </div>
                        </div>
                      );
                    },
                  )
                )}
              </div>
            </div>
          </div>
        </SideBar>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-gray-400 bg-gray-100 p-1 text-sm hover:bg-gray-50 focus:outline"
      >
        <span>Customise</span> <Pen className="size-3" />
      </button>
    </>
  );
}
