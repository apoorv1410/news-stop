import Link from "next/link";
import AppBar from '@mui/material/AppBar';

export default function Navbar() {
    return (
        <Link className="p-4 font-bold text-black" href="/">
            Home
        </Link>
    )
}
