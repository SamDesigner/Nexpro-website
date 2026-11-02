import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Nexpetro Resources Ltd | Energy Today. Sustainable Tomorrow.', description: 'Nigerian oilfield support, procurement, equipment rental and engineering & construction solutions. Discuss your project with Nexpetro Resources Ltd.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
