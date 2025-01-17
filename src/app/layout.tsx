import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NavBar from '../components/NavBar';
import InitAuthState from '@/components/InitAuthState';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'End Overdose',
    description: 'Web app created by LA Blueprint',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="flex h-screen">
                    <div className="w-1/8 bg-black text-white">
                        <NavBar />
                    </div>
                    <div className="flex-1 p-4">
                        <InitAuthState>{children}</InitAuthState>
                    </div>
                </div>
            </body>
        </html>
    );
}
