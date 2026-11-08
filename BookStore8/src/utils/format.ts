// 450000 -> "450.000 đ"
export const formatPrice = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
