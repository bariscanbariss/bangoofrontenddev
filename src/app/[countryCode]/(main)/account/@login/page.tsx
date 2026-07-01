import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Giriş Yap | Bangoo",
  description: "Bangoo hesabınıza giriş yapın ve alışverişe devam edin.",
}

export default function Login({
  params,
}: {
  params: { countryCode: string }
}) {
  return <LoginTemplate countryCode={params.countryCode} />
}
