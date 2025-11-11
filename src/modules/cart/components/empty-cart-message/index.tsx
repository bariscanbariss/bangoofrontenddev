import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <h1 className="text-3xl font-bold text-[#9865e8] mb-4">
        Sepetiniz Boş
      </h1>
      <p className="text-base text-gray-600 mt-4 mb-6 max-w-[32rem]">
        Sepetinizde henüz ürün bulunmuyor. Hemen alışverişe başlamak için aşağıdaki bağlantıyı kullanabilirsiniz.
      </p>
      <div>
        <InteractiveLink href="/store">Ürünleri Keşfet</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
