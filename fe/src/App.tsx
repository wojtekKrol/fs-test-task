import { Filters } from './components/filters'
import { Products } from './components/products'
import { FiltersProvider } from './contexts/filters'

function App() {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='container mx-auto max-w-5xl'>
        <FiltersProvider>
          <Filters />
          <Products />
        </FiltersProvider>
      </div>
    </div>
  )
}

export default App
