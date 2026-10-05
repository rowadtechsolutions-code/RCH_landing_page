import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { LocaleProvider } from '@/i18n/LocaleProvider'
import { Home } from '@/pages/Home/Home'

export function App() {
  return (
    <LocaleProvider>
      <Header />
      <Home />
      <Footer />
    </LocaleProvider>
  )
}
