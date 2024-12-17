import Link from "next/link"

export function Sidebar() {
    return (
        <div className="fixed left-0 top-0 h-screen w-64 p-4 border-r bg-white">
            <nav className="space-y-4">
                <Link href="/" className="text-2xl font-bold block mb-8">
                    ESAI
                </Link>
                <div className="space-y-2">
                    <Link href="/" className="text-gray-600 block">
                        All ESAI Tools
                    </Link>
                    <Link href="/cards" className="text-gray-600 block">
                        My Cards
                    </Link>
                    <Link href="/history" className="text-gray-600 block">
                        History
                    </Link>

                </div>
                <div className="mt-8">
                    <h3 className="text-sm font-medium text-purple-600 mb-4">
                        Track Your Progress with ESAI Punch Cards
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded-lg" />
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    )
} 