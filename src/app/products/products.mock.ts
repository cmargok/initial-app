export const productsList: Product[] = [
    { id: 1, name: 'Lavandina', price: 799, description: 'Lavandina de 1 litro' },
    { id: 2, name: 'Detergenete', price: 699, description: 'Detergente en polvo de 1 kilo' },
    { id: 3, name: 'Limpia vidros', price: 299, description: 'Limpia vidrios de 500 ml' },
    { id: 4, name: 'Desodorante de ambiente', price: 599 },
    { id: 5, name: 'Lavavajilla', price: 499, description: 'Lavavajilla de 500 ml' },
    { id: 6, name: 'Jabon en polvo', price: 399, description: 'Jabon en polvo de 1 kilo' },
    { id: 7, name: 'Suavizante', price: 499 }, 
    { id: 8, name: 'Desinfectante', price: 399, description: 'Desinfectante de 500 ml' },
    { id: 9, name: 'Limpiador de piso', price: 299, description: 'Limpiador de piso de 500 ml' },
    { id: 10, name: 'Desengrasante', price: 399, description: 'Desengrasante de 500 ml' }

]


export interface Product{
    id: number;
    name: string;
    price: number;
    description?: string;
}