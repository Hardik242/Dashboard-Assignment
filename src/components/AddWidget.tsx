import SideBar from "@/components/SideBar";
import { useCategory } from "@/context/CategoryProvider";
import { Widget } from "@/types";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";

export default function AddWidget({ cateogryPos }: { cateogryPos?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState(
    cateogryPos !== undefined ? cateogryPos : "",
  );

  const context = useCategory();

  if (context === null) return;

  const { categories, updateCategory } = context;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const newWidget: Widget = {
      title: data.title as string,
      text: data.text as string,
      visibility: true,
    };

    const categoryPosition = parseInt(data.category as string);

    updateCategory({
      mode: "Add Widget",
      catPosition: categoryPosition,
      newWidget,
    });
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <SideBar
          title="Add Widget"
          setIsOpen={() => {
            setIsOpen(false);
            setCategoryName("");
          }}
          handleSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <p>Personalise Dashboard by adding widget</p>

            <div className="h-0 w-full border border-stone-500"></div>

            <div className="flex flex-col gap-4 p-2">
              <div className="relative h-fit w-full">
                <label
                  htmlFor="category"
                  className="absolute top-[3px] left-4 text-xs"
                >
                  Choose Category
                </label>
                {cateogryPos !== undefined && (
                  <input type="hidden" name="category" value={cateogryPos} />
                )}
                <select
                  name="category"
                  id="category"
                  required
                  defaultValue={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  disabled={cateogryPos ? true : false}
                  className="ml-2 w-full rounded-xl border border-gray-500 bg-gray-100 p-2 pt-5 focus:outline disabled:cursor-not-allowed disabled:bg-stone-300"
                >
                  <option
                    value=""
                    disabled
                    className="bg-stone-300 text-stone-600"
                  >
                    -- Select a category --
                  </option>
                  {categories?.map(({ title }, index) => (
                    <option value={index} key={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative h-fit w-full">
                <label
                  htmlFor="title"
                  className="absolute top-[3px] left-4 text-xs"
                >
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  required
                  className="ml-2 w-full rounded-xl border border-gray-500 bg-gray-100 p-2 pt-5 focus:outline"
                />
              </div>

              <div className="relative h-fit w-full">
                <label
                  htmlFor="text"
                  className="absolute top-[3px] left-4 text-xs"
                >
                  Title
                </label>

                <textarea
                  name="text"
                  rows={4}
                  autoCorrect="on"
                  required
                  className="ml-2 w-full resize-y rounded-xl border border-gray-500 bg-gray-100 p-2 pt-5 focus:outline"
                />
              </div>
            </div>
          </div>
        </SideBar>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-gray-400 bg-gray-100 p-1 text-sm hover:bg-gray-50 focus:outline"
      >
        <span>Add Widget</span> <Plus className="size-3" />
      </button>
    </>
  );
}
