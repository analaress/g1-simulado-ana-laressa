import { ShoppingCart } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import { QuantityInput } from '../Form/QuantityInput'
import {
  CoffeeImg,
  Container,
  Control,
  Description,
  Order,
  Price,
  Tags,
  Title,
} from './styles'

type CoffeeCardProps = {
  coffee: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    price: number;
    image: string;
    quantity: number
  },
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
}

export function CoffeeCard({coffee, incrementQuantity, decrementQuantity}: CoffeeCardProps) {
  const theme = useTheme();

  function handleAddItem() {
    console.log('Adicionar item ao carrinho')
    return;
  }

  return (
    <Container>
      <CoffeeImg src={coffee.image} alt="Expresso Tradicional" />

      <Tags>
        {/** Aqui você pode mapear os tags do café */ }
        <span key={'Tradicional'}>{coffee.tags[0]}</span>
        <span key={'Comum'}>{coffee.tags[1]}</span>

      </Tags>

      <Title>{coffee.title}</Title>

      <Description>{coffee.description}</Description>

      <Control>
        <Price>
          <span>R$</span>
          <span>{coffee.price.toFixed(2)}</span> {/** Aqui você pode passar o preço do café */}
        </Price>

        <Order $itemAdded={false}>
          <QuantityInput
            quantity={coffee.quantity} // Aqui você pode passar a quantidade do café
            incrementQuantity={() => {incrementQuantity}} // Aqui você pode passar a função de incrementar
            decrementQuantity={() => {decrementQuantity}} // Aqui você pode passar a função de decrementar
          />

          <button onClick={handleAddItem}>
            <ShoppingCart size={22} color={theme.colors['base-card']} />
          </button>
        </Order>
      </Control>
    </Container>
  )
}
