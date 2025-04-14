import { Fragment, useState } from 'react'
import {
  Trash,
} from '@phosphor-icons/react'

import { QuantityInput } from '../../components/Form/QuantityInput'
import {
  CartTotal,
  CartTotalInfo,
  CheckoutButton,
  Coffee,
  CoffeeInfo,
  Container,
  InfoContainer,
} from './styles'
import { Description, Tags } from '../../components/CoffeeCard/styles'

import { useEffect } from 'react'

import { useCart } from '../../hooks/useCart'

export interface Item {
  id: string
  quantity: number
}
export interface Order {
  id: number
  items: CoffeeInCart[]
}

interface CoffeeInCart {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
  subTotal: number;
} 


export interface OrderInfo {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: 'credit' | 'debit' | 'cash';
}


const DELIVERY_PRICE = 3.75;

export function Cart() {
  const {cart, checkout } = useCart()
  const [coffeesInCart, setCoffeesInCart] = useState<CoffeeInCart[]>([]);

  const mapeiaCart =  cart.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    tags: item.tags,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
    subTotal: item.price * item.quantity,
  }));

  useEffect(() => {
    setCoffeesInCart(mapeiaCart)
  }, [cart])

  const submitCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const order: OrderInfo = {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      paymentMethod: 'cash'
    }
  
    checkout(order);

  }

  const amountTags: string[] = [];
  
  /** Adicionando os tags dos cafés no array amountTags
   * Se o tag já existir, não adiciona*/ 
  coffeesInCart.map(coffee => coffee.tags.map((tag) => {
    if (!amountTags.includes(tag)) {
      amountTags.push(tag);
    }
  }));
  
  // valor total dos cafés no carrinho
  const totalItemsPrice = coffeesInCart.reduce((currencyValue, coffee) => {
    return currencyValue + coffee.price * coffee.quantity
  }, 0)

  function handleItemIncrement(itemId: string) {
    const novaQt = coffeesInCart.map(coffee => coffee.id === itemId ?
       {...coffee, quantity: coffee.quantity + 1,
         subTotal: (coffee.quantity + 1) * coffee.price} : coffee)
    setCoffeesInCart(novaQt);
  }

  function handleItemDecrement(itemId: string) {
    const novaQt = coffeesInCart.map(coffee => coffee.id === itemId && coffee.quantity > 1 ? 
      {...coffee, quantity: coffee.quantity - 1,
         subTotal: (coffee.quantity - 1) * coffee.price} : coffee)
    setCoffeesInCart(novaQt);
  }

  function handleItemRemove(itemId: string) {
    const novaLista = coffeesInCart.filter(coffee => coffee.id !== itemId);
    setCoffeesInCart(novaLista);
    
  }

  return (
    <Container>

      <InfoContainer>
        <h2>Cafés selecionados</h2>

        <CartTotal>
          {coffeesInCart.map((coffee) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.title} />

                  <div>
                    <span>{coffee.title}</span>
                      <Tags>
                        {coffee.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </Tags>

                    <CoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleItemIncrement(coffee.id)}
                        decrementQuantity={() => handleItemDecrement(coffee.id)}
                      />

                      <button onClick={() => handleItemRemove(coffee.id)}>
                        <Trash />
                        <span>Remover</span>
                      </button>
                    </CoffeeInfo>
                  </div>
                </div>

                <aside>R$ {coffee.subTotal?.toFixed(2)}</aside>
              </Coffee>

              <span />
            </Fragment>
          ))}

          <CartTotalInfo>
            <div>
              <span>Total de itens</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice)}
              </span>
            </div>

            <div>
              <span>Entrega</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(DELIVERY_PRICE)}
              </span>
            </div>

            <div>
              <span>Total</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice + (DELIVERY_PRICE * amountTags.length))}
              </span>
            </div>
          </CartTotalInfo>

          <form id="order" onSubmit={submitCheckout}>
            <CheckoutButton type="submit" form="order">
              Confirmar pedido
            </CheckoutButton>
          </form>
          
        </CartTotal>
      </InfoContainer>
    </Container>
  )
}
