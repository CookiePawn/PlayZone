'use client';

import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
        >
            <ThemeToggle />
            {children}
        </ThemeProvider>
    );
}