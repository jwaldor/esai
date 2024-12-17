'use client'

import { useState, useEffect } from 'react';
import Link from "next/link"
import { Home, CreditCard, History } from 'lucide-react'

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

export function Sidebar() {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <>
            <div className="hidden md:block fixed left-0 top-0 h-screen w-64 p-4 border-r bg-white">
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
                    {isDesktop && (
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
                    )}
                </nav>
            </div>

            <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white">
                <nav className="flex justify-around p-4">
                    <Link href="/" className="flex flex-col items-center text-gray-600">
                        <Home size={24} />
                        <span className="text-xs mt-1">Home</span>
                    </Link>
                    <Link href="/cards" className="flex flex-col items-center text-gray-600">
                        <CreditCard size={24} />
                        <span className="text-xs mt-1">Cards</span>
                    </Link>
                    <Link href="/history" className="flex flex-col items-center text-gray-600">
                        <History size={24} />
                        <span className="text-xs mt-1">History</span>
                    </Link>
                </nav>
            </div>
        </>
    )
} 