import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex flex-col items-start justify-center w-full">
      <Image src="/assets/DASH_LOGO.png" className="h-5 w-auto hidden dark:block object-contain" alt="ToAqui Logo" width={200} height={100} />
      <Image src="/assets/DASH_DARK_LOGO.png" className="h-5 w-auto dark:hidden object-contain" alt="ToAqui Logo" width={200} height={100} />

    </Link>
  )
}