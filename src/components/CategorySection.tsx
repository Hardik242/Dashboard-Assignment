import { Category } from "@/types";
import Widget from "./Widget";
import AddWidget from "./AddWidget";
import { useCategory } from "@/context/CategoryProvider";

export default function CategorySection({
  category,
  position,
}: {
  category: Category;
  position: number;
}) {
  const categoryObj = useCategory();

  if (!categoryObj) return;

  const { updateCategory } = categoryObj;

  function handleWidgetClose(widgetPos: number) {
    updateCategory({
      mode: "Toggle Visibility",
      catPosition: position,
      widPosition: widgetPos,
    });
  }

  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden rounded-md p-2">
      <h2 className="text-lg font-semibold">{category.title}</h2>

      <div className="flex w-full gap-3 overflow-auto">
        {category.widgets.map((widget, index) =>
          widget.visibility ? (
            <Widget
              widget={widget}
              toggleVisibility={handleWidgetClose}
              position={index}
              key={index}
            />
          ) : null,
        )}

        <Widget>
          <AddWidget cateogryPos={position} />
        </Widget>
      </div>
    </div>
  );
}
