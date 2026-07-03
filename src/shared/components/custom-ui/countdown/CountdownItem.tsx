interface CountdownItemProps {
  value: number | string;
  label: string;
}

export function CountdownItem({ value, label }: CountdownItemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 p-2">
      <span className="text-lg leading-none font-bold sm:text-xl">{value}</span>

      <span className="text-xs leading-none font-normal">{label}</span>
    </div>
  );
}
