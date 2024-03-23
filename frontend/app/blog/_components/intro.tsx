import { CMS_NAME } from "@/lib/constants";
import Image from "next/image";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <Image src="/logo.png" alt="Logo-SVG" width={100} height={100} />
    </section>
  );
}
