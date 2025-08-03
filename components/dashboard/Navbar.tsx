import Image from "next/image";
import Link from "next/link";
import AccountDropdown from "./AccountDropdown";
import ProjectSelector from "./ProjectSelector";
import SidebarToggleButton from "./SidebarToggleButton";

export default function Navbar() {
  return (
    <nav className="flex items-center h-(--header-height) ">
      <Link href="/" className="w-3xs p-5 hidden md:flex">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={175}
          height={175}
          objectFit="cover"
        />
      </Link>
      <div className="flex-1 flex justify-between items-center mx-2.5">
        {/* Header: Project Selector */}
        <div className="flex items-center gap-2">
          <SidebarToggleButton />

          <ProjectSelector />
        </div>

        {/* Header: User Account */}
        <div>
          <AccountDropdown />
        </div>
      </div>
    </nav>
  );
}
