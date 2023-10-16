import type { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import { AppContextProvider } from "../context/contextProvider"
import { NotificationsProvider } from "@mantine/notifications"
import "../styles/globals.scss"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient()

  return (
    <AppContextProvider>
      <NotificationsProvider>
        <QueryClientProvider client={client}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </NotificationsProvider>
    </AppContextProvider>
  )
}

export default MyApp
