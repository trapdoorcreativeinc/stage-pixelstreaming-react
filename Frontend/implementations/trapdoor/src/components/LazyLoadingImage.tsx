import React from "react";

export interface LazyLoadingImageProperties {
  src?: string,
  alt: string,
  className?: string,
  sizes?: string,
  srcset?: string | SrcSetObject[],
  loading?: 'lazy' | 'eager',
  width?: number,
  height?: number,
  style?: React.CSSProperties,
  onClick?: Function,
  onLoad?: Function,
  onError?: Function,
  ref?: React.RefObject<HTMLImageElement>,
}

export interface SrcSetObject {
  src: string,
  width: number,
}

const LazyLoadingImage = ({
  src,
  alt,
  className,
  sizes,
  srcset,
  loading = 'lazy',
  width,
  height,
  style,
  onClick,
  onLoad,
  onError,
  ref,
}: LazyLoadingImageProperties) => {
  
    const [currentImage, setCurrentImage] = React.useState('');
  
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        sizes={typeof srcset === 'object' ?
          srcset.map((srcsetObject: SrcSetObject) => `(max-width: ${srcsetObject.width}px) ${srcsetObject.width}px`).join(', ')
          : sizes}
        srcSet={ typeof srcset === 'object' ? 
          srcset.map((srcsetObject: SrcSetObject) => `${srcsetObject.src} ${srcsetObject.width}w`).join(', ') 
          : srcset}
        loading={loading}
        width={width}
        height={height}
        style={style}
        onClick={() => {onClick && onClick()}}
        onLoad={() => onLoad && onLoad()}
        onError={() => onError && onError()}
        ref={ref}
      />
    )
  }

export default LazyLoadingImage;