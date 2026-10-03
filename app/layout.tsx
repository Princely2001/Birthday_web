import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'For Ovini · A Birthday Love Story',description:'A little love. A little magic. A birthday surprise for Ovini Dissanayake, October 5.',icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
