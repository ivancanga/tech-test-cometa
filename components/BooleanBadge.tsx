import clsx from "clsx";

export function BooleanBadge({ value }: { value: string }) {
  const isTrue = value !== "0" && value !== "unknown";

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold",
        isTrue
          ? "bg-[#F7FAFF] text-gray-700 border border-[#E5E7EB]"
          : "bg-red-100 text-red-700"
      )}
    >
      {isTrue ? "Sí" : "No"}
    </span>
  );
}
