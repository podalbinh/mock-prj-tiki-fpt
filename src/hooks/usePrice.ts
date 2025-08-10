export default function usePrice() {
    const formattedPrice = (price: number) => new Intl.NumberFormat('vi-VN', {
        currency: 'VND',
    }).format(price);

    return {
        formattedPrice
    }
}