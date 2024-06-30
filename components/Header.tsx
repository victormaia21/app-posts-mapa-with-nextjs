import Link from "next/link";

export default function Header() {
    return (
        <header className="header">
            <ul>
                <li><Link href="/">Posts</Link></li>
                <li><Link href="/users">Users</Link></li>
            </ul>
        </header>
    )
}