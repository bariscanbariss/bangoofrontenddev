"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { useFormStatus } from "react-dom"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const SubmitButtonWithStyle = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full mt-6 px-6 py-4
                 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600
                 text-white font-semibold rounded-2xl
                 shadow-lg shadow-violet-500/30
                 backdrop-blur-md
                 transition-all duration-500 ease-out
                 hover:shadow-2xl hover:shadow-violet-500/50
                 hover:scale-[1.03] hover:-translate-y-0.5
                 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500
                 active:scale-[0.98] active:translate-y-0
                 disabled:opacity-50 disabled:cursor-not-allowed
                 disabled:hover:scale-100 disabled:hover:translate-y-0
                 relative overflow-hidden
                 before:absolute before:inset-0
                 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
                 before:translate-x-[-200%] hover:before:translate-x-[200%]
                 before:transition-transform before:duration-700"
    >
      {pending ? "İşleniyor..." : children}
    </button>
  )
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="w-full flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
        Bangoo'ya Hoş Geldiniz
      </h1>
      <p className="text-center text-base text-gray-600 mb-8">
        Bangoo üyesi olun, özel kampanyalardan ve avantajlı fiyatlardan yararlanın.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Ad"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Soyad"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="E-posta"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Telefon"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Şifre"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-gray-500 text-sm mt-6">
          Hesap oluşturarak Bangoo&apos;nun{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent hover:from-violet-700 hover:to-purple-700 font-semibold transition-all"
          >
            Gizlilik Politikası
          </LocalizedClientLink>{" "}
          ve{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent hover:from-violet-700 hover:to-purple-700 font-semibold transition-all"
          >
            Kullanım Koşulları
          </LocalizedClientLink>
          &apos;nı kabul etmiş olursunuz.
        </span>
        <SubmitButtonWithStyle>
          Kayıt Ol
        </SubmitButtonWithStyle>
      </form>
      <span className="text-center text-gray-600 text-sm mt-6">
        Zaten üye misiniz?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent hover:from-violet-700 hover:to-purple-700 font-bold transition-all"
        >
          Giriş Yapın
        </button>
      </span>
    </div>
  )
}

export default Register
