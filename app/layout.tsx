
import Navbar from '@/components/Navbar';
import './globals.css';

import { PropsWithChildren, ReactNode } from 'react';

export const metadata = {
  title: 'Hacker News',
  description: 'Built by kethan',
};

const  RootLayout = (props : PropsWithChildren) => {
  return (
    <html lang="en">
      <body >
          <Navbar />
        <main className="p-4 max-w-3xl mx-auto">{props.children}</main>
      </body>
    </html>
  );
}


export default  RootLayout

