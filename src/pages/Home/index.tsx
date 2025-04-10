import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'
import { api } from '../../axios'

import { CoffeeCard } from '../../components/CoffeeCard'
import { Loading } from '../../components/Loading'
import { CoffeeList, Heading, Hero, HeroContent, Info } from './styles'
import { useEffect, useState } from 'react';

interface Coffee {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
};

export function Home() {
  const theme = useTheme();
  const [coffees, setCoffees] = useState <Coffee[]>([]);
  const [loading, setLoading] = useState(false)

  async function apiDados() {
    try {
    setLoading(true)
    const response = await api.get('/coffees')

    console.log(response.data)
    setCoffees(response.data)
      
    } catch (error) {
      console.log('erro', error)
    } finally {
      setLoading(false)
    }


  }

  useEffect(() => {
    apiDados()
  }, []);


  useEffect(() => {
    console.log({loading})
  }, [loading])

  
  function incrementQuantity(id: string) {
    console.log('aqui')
    const filtro = coffees.filter(coffee => coffee.id === id ? coffee.quantity + 1 : coffee.quantity)
    setCoffees(filtro)
  }

  function decrementQuantity(id: string) {
    const filtro = coffees.filter(coffee => coffee.id === id ? coffee.quantity - 1 : coffee.quantity)
    setCoffees(filtro)  
  }

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>

              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow-dark'] }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text'] }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>
          </div>

          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>

        <img src="/images/hero-bg.svg" id="hero-bg" alt="" />
      </Hero>


    
      <CoffeeList>
        <h2>Nossos cafés</h2>

        <div>
          loading ? <Loading/>
        </div>

        <div>
        {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee}
            incrementQuantity={() => incrementQuantity}
            decrementQuantity={() => decrementQuantity}
            />
          ))}
        </div>
      </CoffeeList>
    </div>
  )
}
