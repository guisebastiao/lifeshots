export const formatNumber = ({ number }: { number: number }) => {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(number);
};
