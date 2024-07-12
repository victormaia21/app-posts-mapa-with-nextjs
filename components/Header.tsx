import Link from "next/link";

export default function Header() {
    return (
        <header className="header">
            <ul>
                <li><Link href="/">Posts</Link></li>
            </ul>
        </header>
    )
}