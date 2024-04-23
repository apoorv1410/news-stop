import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed  w-full top-0 left-0 p-6">
            <Link className="font-bold" href="/">
                Home
            </Link>
        </nav>
    )
}
