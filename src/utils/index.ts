export function formatCurrency (amount: number) {
    return new Intl.NumberFormat('es-EU', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount)
}