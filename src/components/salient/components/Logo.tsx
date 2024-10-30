import Link from "next/link";
import Image from "next/image";

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <Link href="/" className="">
      <Image src="/assets/LOGO_SITE.png" className="w-[170px]" alt="ToAqui Logo" width={300} height={100} />
    </Link>
  )
}
