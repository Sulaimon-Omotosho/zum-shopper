import ProductInteraction from '@/src/components/ProductInteraction'
import { ProductType } from '@/src/types'
import Image from 'next/image'
import { describe } from 'node:test'

// TEMPORARY
const product: ProductType = {
  id: 1,
  name: 'Adidas CoreFit T-Shirt',
  shortDescription:
    'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
  description:
    'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
  price: 39.9,
  sizes: ['s', 'm', 'l', 'xl', 'xxl'],
  colors: ['gray', 'purple', 'green'],
  images: {
    gray: '/products/1g.png',
    purple: '/products/1p.png',
    green: '/products/1gr.png',
  },
}

export const generateMetadata = async ({
  params,
}: {
  params: { id: string }
}) => {
  return {
    title: product.name,
    describe: product.description,
  }
}

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ color: string; size: string }>
}) => {
  const { size, color } = await searchParams

  const selectedColor = color || (product.colors[0] as string)
  const selectedSize = size || (product.sizes[0] as string)

  return (
    <div className='flex flex-col gap-4 lg:flex-row md:gap-12 mt-12'>
      {/* IMAGE  */}
      <div className='w-full lg:w-5/12 relative aspect-2/3'>
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className='object-contain rounded-md'
        />
      </div>
      {/* DETAILS  */}
      <div className='w-full lg:w-7/12 flex flex-col gap-4'>
        <h1
          className='text2xl
       font-medium'
        >
          {product.name}{' '}
        </h1>
        <p className=' text-gray-500'>{product.description} </p>
        <h2 className='text-2xl font-semibold'>${product.price.toFixed(2)}</h2>
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
        {/* Card Info  */}
        <div className='flex items-center gap-2 mt-4'>
          <Image
            src='/klarna.png'
            alt='klarna'
            width={50}
            height={50}
            className='rounded-md hover:scale-110 cursor-pointer transition-all duration-300'
          />
          <Image
            src='/cards.png'
            alt='cards'
            width={50}
            height={50}
            className='rounded-md hover:scale-110 cursor-pointer transition-all duration-300'
          />
          <Image
            src='/stripe.png'
            alt='stripe'
            width={50}
            height={50}
            className='rounded-md hover:scale-110 cursor-pointer transition-all duration-300'
          />
        </div>
        <p className='text-gray-500 text-xs'>
          By clicking Pay Now, you agree to our{' '}
          <span className='underline hover:text-black cursor-pointer'>
            Terms & Conditions
          </span>{' '}
          and{' '}
          <span className='underline hover:text-black cursor-pointer'>
            Privacy Policy
          </span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{' '}
          <span className='underline hover:text-black cursor-pointer'>
            Refund Policy
          </span>
        </p>
      </div>
    </div>
  )
}

export default ProductPage
