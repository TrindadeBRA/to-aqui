import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="h-12 flex flex-col  justify-center w-full">
      <Image src="/assets/DASH_LOGO.png" className="w-28 hidden dark:block" alt="ToAqui Logo" width={300} height={100} />
      <Image src="/assets/DASH_DARK_LOGO.png" className="w-28 dark:hidden" alt="ToAqui Logo" width={300} height={100} />

    </Link>
  )
}
