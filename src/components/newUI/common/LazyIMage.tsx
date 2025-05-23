import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

export const LazyImage: FC<ImageProps> = ({
  width = 56,
  height = 56,
  alt = '',
  priority,
  ...rest
}) => {
  return (
    <Image
      width={width}
      height={height}
      alt={alt}
      loading={priority ? undefined : 'lazy'}
      priority={priority}
      {...rest}
    />
  )
}
