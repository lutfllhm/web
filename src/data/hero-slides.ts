export type HeroSlide = {
  image: string;
  series: string;
  title: string;
  subtitle: string;
  objectPosition: string;
};

/** Path aman untuk nama file banner (spasi, +, dll.) */
export function bannerSrc(filename: string) {
  return `/banner/${encodeURIComponent(filename)}`;
}

export const heroSlides: HeroSlide[] = [
  {
    image: bannerSrc("Flat-Panel-A-Series-Pro.jpg"),
    series: "A-Series Pro",
    title: "Flat Panel Display Pro",
    subtitle: "Tampilan jernih untuk signage dan sistem informasi.",
    objectPosition: "50% center",
  },
  {
    image: bannerSrc("Flat-Panel-A-Series-Plus.jpg"),
    series: "A-Series Plus",
    title: "Flat Panel Display Plus",
    subtitle: "Solusi display ekonomis dengan kualitas visual solid.",
    objectPosition: "48% center",
  },
  {
    image: bannerSrc("LM-190.jpg"),
    series: "LM-190",
    title: "Label Printer Desktop",
    subtitle: "Ideal untuk label produk dan rak display.",
    objectPosition: "50% center",
  },
];
