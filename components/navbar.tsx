import Link from "next/link";
import AppBar from '@mui/material/AppBar';

export default function Navbar() {
    return (
        <AppBar position="fixed" enableColorOnDark={false} className="p-4 bg-yellow-100">
            <Link className="font-bold text-black" href="/">
                Home
            </Link>
        </AppBar>
    )
}
