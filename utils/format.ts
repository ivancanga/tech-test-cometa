export const formatNumber = (value: string, suffix?: string) => {
  if (value === "unknown") return "—";
  const num = Number(value);
  return suffix ? `${num.toLocaleString()} ${suffix}` : num.toLocaleString();
};

export const formatPopulation = (v: string) => 
  v === "unknown" ? "—" : Number(v).toLocaleString();

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}