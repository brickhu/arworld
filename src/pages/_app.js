import "@/styles/globals.css"
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/header'
import { ThemeProvider } from 'next-themes'


export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider
        attribute = 'class'
        defaultTheme = 'system'
        enableSystem
        disableTransitionOnChange
      >
        <Header title={"arworld"}/>
        <main className="mt-8"><Component {...pageProps}/></main>
        <Toaster/>
      </ThemeProvider>  
    </>
  )
}
