import { CMS_NAME } from "@/lib/constants";
import Image from "next/image";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-8 md:mb-12 text-lg md:text-2xl">
      <Image src="/logo.png" alt="Logo-SVG" width={150} height={150} />
    </section>
  );
}
