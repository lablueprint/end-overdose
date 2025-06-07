import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NavBar from '../components/NavBar';
import InitAuthState from '@/components/InitAuthState';
import { Inter } from 'next/font/google';
//import '@fontsource/roboto'; // Defaults to weight 400
//import '@fontsource/roboto-condensed'; // Defaults to weight 400

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

// const geistSans = localFont({
//     src: './fonts/GeistVF.woff',
//     variable: '--font-geist-sans',
//     weight: '100 900',
// });
// const geistMono = localFont({
//     src: './fonts/GeistMonoVF.woff',
//     variable: '--font-geist-mono',
//     weight: '100 900',
// });

export const metadata: Metadata = {
    title: 'End Overdose',
    description: 'Web app created by LA Blueprint',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex min-h-screen">
                    <div className="flex-shrink-0 transition-all duration-500 ease-in-out bg-[#0C1321] text-white">
                        <NavBar />
                    </div>
                    <div className="flex-1">
                        <InitAuthState>{children}</InitAuthState>
                    </div>
                </div>
            </body>
        </html>
    );
}
