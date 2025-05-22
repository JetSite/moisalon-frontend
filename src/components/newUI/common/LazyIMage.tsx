import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

export const LazyImage: FC<ImageProps> = ({
  width = 56,
  height = 56,
  alt = '',
  loading = 'lazy',
  ...rest
}) => {
  return (
    <Image
      width={width}
      height={height}
      alt={alt}
      loading={loading}
      {...rest}
    />
  )
}
