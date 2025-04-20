// ProductLinkItem.tsx
import Link from "next/link";

type ItemProps = {
  label: string;
  href: string;
};

export function LinkItem({ label, href }: ItemProps) {
  return (
    <li>
      <Link className="text-gray-600 transition hover:text-gray-900" href={href}>
        {label}
      </Link>
    </li>
  );
}