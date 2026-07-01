import { login } from "@lib/data/customer"
import { sdk } from "@lib/config"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import Input from "@modules/common/components/input"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  countryCode: string
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
      {pending ? "Giriş yapılıyor..." : children}
    </button>
  )
}

const Login = ({ setCurrentView, countryCode }: Props) => {
  const [message, formAction] = useActionState(login, null)

  const handleGoogleLogin = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'https://admin.bangoocyp.com'
      const response = await fetch(`${backendUrl}/auth/customer/google`, {
        credentials: 'include'
      })
      const data = await response.json()

      if (data.location) {
        window.location.href = data.location
      }
    } catch (error) {
      console.error('Google login error:', error)
    }
  }

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
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
              data-testid="remember-me-checkbox"
            />
            Beni Hatırla
          </label>
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButtonWithStyle>
          Giriş Yap
        </SubmitButtonWithStyle>
      </form>

      <div className="w-full flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-500 text-sm">veya</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full px-6 py-4
                   bg-white/80 backdrop-blur-xl
                   text-gray-700 font-semibold rounded-2xl
                   border-2 border-gray-200/60
                   shadow-lg shadow-gray-400/20
                   transition-all duration-500 ease-out
                   hover:bg-white/90 hover:border-violet-300/60
                   hover:shadow-2xl hover:shadow-violet-400/30
                   hover:scale-[1.03] hover:-translate-y-0.5
                   active:scale-[0.98] active:translate-y-0
                   flex items-center justify-center gap-3
                   relative overflow-hidden
                   before:absolute before:inset-0
                   before:bg-gradient-to-r before:from-transparent before:via-violet-100/30 before:to-transparent
                   before:translate-x-[-200%] hover:before:translate-x-[200%]
                   before:transition-transform before:duration-700"
        data-testid="google-login-button"
      >
        <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="relative z-10">Google ile Giriş Yap</span>
      </button>

      <span className="text-center text-gray-600 text-sm mt-6">
        Henüz üye değil misiniz?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-[#9865e8] hover:text-[#7d4fd1] underline font-semibold transition-colors"
          data-testid="register-button"
        >
          Kayıt Ol
        </button>
      </span>
    </div>
  )
}

export default Login
