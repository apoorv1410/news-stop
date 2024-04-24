import Link from "next/link";
import {Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
export default function App() {
  return (
    <Navbar
        className="px-4 bg-yellow-200 shadow-lg block"
        classNames={{
            wrapper: "p-0 m-0"
        }}
        isBlurred={false}
    >
      <NavbarContent className="px-0">
        <NavbarItem className="px-0 m-0 s">
            <Link className="p-0 font-bold text-black m-0" href="/">
                Home
            </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
