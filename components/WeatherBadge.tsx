export function WeatherBadge({ children }: { children: string }) {
  return (
    <span
      className="
        inline-flex
        items-center
        px-2.5
        py-0.5
        rounded-lg
        text-xs
        font-semibold
        text-gray-700
        bg-[#F6F8FC]
        border
        border-[#E5E7EB]
      "
    >
      {children}
    </span>
  );
}
