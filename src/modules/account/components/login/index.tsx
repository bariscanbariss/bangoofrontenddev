import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import Input from "@modules/common/components/input"
import { useActionState } from "react"
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
      {pending ? "Giriş yapılıyor..." : children}
    </button>
  )
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-md w-full flex flex-col items-center px-4"
      data-testid="login-page"
    >
      <h1 className="text-3xl font-bold text-[#9865e8] mb-4">Tekrar Hoş Geldiniz</h1>
      <p className="text-center text-base text-gray-600 mb-8">
        Hesabınıza giriş yaparak alışverişe devam edin.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="E-posta"
            name="email"
            type="email"
            title="Geçerli bir e-posta adresi girin."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Şifre"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButtonWithStyle>
          Giriş Yap
        </SubmitButtonWithStyle>
      </form>
      <span className="text-center text-gray-600 text-sm mt-6">
        Henüz üye değil misiniz?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-[#9865e8] hover:text-[#7d4fd1] underline font-semibold transition-colors"
          data-testid="register-button"
        >
          Kayıt Olun
        </button>
      </span>
    </div>
  )
}

export default Login
