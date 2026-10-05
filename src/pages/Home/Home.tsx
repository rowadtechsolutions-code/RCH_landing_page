import { About } from '@/sections/About/About'
import { FinalCta } from '@/sections/FinalCta/FinalCta'
import { FleetControl } from '@/sections/FleetControl/FleetControl'
import { Hero } from '@/sections/Hero/Hero'
import { Problem } from '@/sections/Problem/Problem'
import { ProductStory } from '@/sections/ProductStory/ProductStory'

/** Story order: the stage → the problem → the product walk-through → control → who builds it → the closing stage. */
export function Home() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Hero />
      <Problem />
      <ProductStory />
      <FleetControl />
      <About />
      <FinalCta />
    </main>
  )
}
