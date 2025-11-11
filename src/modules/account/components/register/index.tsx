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
      className="w-full mt-6 px-6 py-3 bg-[#9865e8] text-white font-semibold rounded-lg
                 transition-all duration-300 ease-in-out
                 hover:bg-[#7d4fd1] hover:shadow-lg hover:scale-105
                 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                 disabled:hover:scale-100"
    >
      {pending ? "İşleniyor..." : children}
    </button>
  )
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-md w-full flex flex-col items-center px-4"
      data-testid="register-page"
    >
      <h1 className="text-3xl font-bold text-[#9865e8] mb-4">
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
            className="text-[#9865e8] hover:text-[#7d4fd1] underline transition-colors"
          >
            Gizlilik Politikası
          </LocalizedClientLink>{" "}
          ve{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-[#9865e8] hover:text-[#7d4fd1] underline transition-colors"
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
          className="text-[#9865e8] hover:text-[#7d4fd1] underline font-semibold transition-colors"
        >
          Giriş Yapın
        </button>
      </span>
    </div>
  )
}

export default Register
