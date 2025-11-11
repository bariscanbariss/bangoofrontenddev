import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Zaten hesabınız var mı?
        </h2>
        <p className="text-base text-gray-600 mt-2">
          Daha iyi bir deneyim için giriş yapın.
        </p>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <button
            className="px-6 py-2 bg-white text-[#9865e8] border-2 border-[#9865e8] font-semibold rounded-lg
                       transition-all duration-300 ease-in-out
                       hover:bg-[#9865e8] hover:text-white hover:shadow-md hover:scale-105
                       active:scale-95"
            data-testid="sign-in-button"
          >
            Giriş Yap
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
