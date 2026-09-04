import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { icons: {icon:'/favicon.svg'}, title: 'Салон-Плюс — парикмахерская в Калининграде', description: 'Мужские и женские стрижки. Калининград, ул. Рокоссовского, 24. Ежедневно 09:00–21:00. Запись: +7 (963) 294-19-09.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {return <html lang="ru"><body>{children}</body></html>}



