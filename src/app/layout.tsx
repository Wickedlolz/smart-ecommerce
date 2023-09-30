import type { Metadata } from 'next';
import Header from '@/components/Header';
import Layout from '@/components/Layout';

import './globals.css';
import 'slick-carousel/slick/slick.css';

export const metadata: Metadata = {
    title: 'Shopping Mart - A place for all',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="font-bodyFont w-full bg-main-bg text-darkText">
                <Layout>
                    <Header />
                    {children}
                </Layout>
            </body>
        </html>
    );
}
