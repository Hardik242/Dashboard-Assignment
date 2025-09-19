import { Widget as WidgetType } from "@/types";
import { X } from "lucide-react";
import { ReactNode } from "react";

export default function Widget({
  widget,
  toggleVisibility,
  position,
  children,
}: {
  widget?: WidgetType;
  toggleVisibility?: (widgetPos: number) => void;
  position?: number;
  children?: ReactNode;
}) {
  if (widget && toggleVisibility && position !== undefined)
    return (
      <div className="relative h-[230px] w-[400px] flex-none">
        <X
          className="absolute top-2 right-3 size-3 cursor-pointer hover:bg-stone-100 hover:ring"
          onClick={() => toggleVisibility(position)}
        />
        <div className="flex h-full w-full flex-col gap-2 rounded-xl bg-white p-2">
          <h3 className="font-bold">{widget.title}</h3>
          <p className="">{widget.text}</p>
        </div>
      </div>
    );

  if (children)
    return (
      <div className="h-[230px] w-[400px] flex-none">
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-white p-2">
          {children}
        </div>
      </div>
    );
}
