import CategoryPageLayout from "./CategoryPageLayout";

export default function AllInOnePosSystemPage() {
  return (
    <CategoryPageLayout
      slug="all-in-one-pos-system"
      hero={{
        bg: "/product/POS ALL IN ONE/assets/bgpos.png",
        productImage: "/product/POS ALL IN ONE/assets/posats.png",
        heading: "POS All in One",
        tagline: "Point of sales dilengkapi dengan layar touchscreen dan sistem operasi Windows maupun Android",
        dark: true,
        video: "/product/POS ALL IN ONE/assets/poscoba.mp4",
        videoCaption: "POS All in One",
        videoSubCaption: "DUAL LAYAR",
        showcase: {
          bg: "/product/POS ALL IN ONE/assets/bg.png",
          image: "/product/POS ALL IN ONE/pos all in one windows/dual layar/HB-8DW.png",
          label: "POS All in One",
          model: "HB-8DW",
          badges: [
            { type: "windows", text: "Windows 10" },
            { type: "ram", text: "RAM 8GB ROM 128GB" },
            { type: "intel", text: "Intel Core i5" },
          ],
          specs: [
            "Dual Monitor 15,6\" + 15,6\" LED",
            "OS : Windows 10 Trial",
            "CPU : Intel Core i5-4217U @1.80GHz",
            "Memory : 8GB, Internal 128GB",
            "Interface : USB, LAN, HDMI",
          ],
          note: "Untuk usaha ritel, toko online, swalayan, pergudangan, kafe, supermarket, toko, restoran dll.",
        },
        showcaseLight: {
          image: "/product/POS ALL IN ONE/pos all in one windows/dual layar/x-293ii-transparent.png",
          label: "POS All in One",
          model: "X-293II",
          specs: [
            { icon: "lcd", label: "Dual Touchscreen", value: "15,6\" + 15,6\"" },
            { icon: "os", label: "Operation System", value: "Windows 7" },
            { icon: "harddisk", label: "Hard Disk", value: "256 GB" },
            { icon: "ram", label: "RAM Memory", value: "8 Gigabytes" },
            { icon: "resolution", label: "Resolution", value: "1920x1080px" },
            { icon: "printer", label: "Thermal Printer", value: "80mm" },
          ],
          note: "Untuk usaha ritel, toko online, swalayan, pergudangan, kafe, supermarket, toko, restoran dll.",
        },
        showcaseLightTabs: {
          image: "/product/POS ALL IN ONE/assets/PXAseries.png",
          bg: "/product/POS ALL IN ONE/assets/bg3.png",
          dark: true,
          label: "POS All in One",
          items: [
            {
              model: "PXA-38",
              specs: [
                { icon: "lcd", label: "Dual Monitor", value: "15,6\" + 15,6\" (Touchscreen)" },
                { icon: "os", label: "Operation System", value: "Android 11" },
                { icon: "ram", label: "Memory", value: "4GB, Internal 64GB" },
                { icon: "resolution", label: "Interface", value: "Wifi + Bluetooth" },
                { icon: "printer", label: "Printer", value: "80mm Auto Cutter" },
              ],
              imageLabel: { top: "6%", left: "24%" },
            },
            {
              model: "PXA-02D",
              specs: [
                { icon: "lcd", label: "Dual Monitor", value: "15,6\" Touchscreen + 10,1\"" },
                { icon: "os", label: "Support", value: "Android 11" },
                { icon: "ram", label: "Memory", value: "4GB, Internal 64GB" },
                { icon: "resolution", label: "Interface", value: "USB, LAN" },
                { icon: "harddisk", label: "Port", value: "RJ-11" },
              ],
              imageLabel: { top: "20%", left: "52%" },
            },
            {
              model: "PXA-P2",
              specs: [
                { icon: "lcd", label: "Dual Monitor", value: "15,6\" + 11,6\" (Touchscreen)" },
                { icon: "os", label: "Operation System", value: "Android 11" },
                { icon: "ram", label: "Memory", value: "4GB, Internal 64GB" },
                { icon: "resolution", label: "Interface", value: "Wifi + Bluetooth" },
                { icon: "harddisk", label: "Port", value: "RJ-11" },
              ],
              imageLabel: { top: "28%", left: "78%" },
            },
          ],
          note: "Untuk usaha ritel, toko online, swalayan, pergudangan, kafe, supermarket, toko, restoran dll.",
        },
      }}
    />
  );
}
