export function generateRandomColor(): string {
  const colors = [
    '#4488ff', // blue
    '#ff4444', // red
    '#44ff44', // green
    '#ff44ff', // magenta
    '#ffff44', // yellow
    '#44ffff', // cyan
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}