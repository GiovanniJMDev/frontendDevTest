import {
  useState,
  type ImgHTMLAttributes,
  type ReactEventHandler,
} from "react";

interface ImgProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "onError" | "onLoad"
> {
  src: string;
  onError?: ReactEventHandler<HTMLImageElement>;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  fallbackText?: string;
}

export const Img = ({
  src,
  alt = "",
  onError,
  onLoad,
  fallbackText = "Imagen no disponible",
  ...imageProps
}: ImgProps) => {
  const [hasError, setHasError] = useState(false);

  const handleLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    setHasError(false);
    onLoad?.(event);
  };

  const handleError: ReactEventHandler<HTMLImageElement> = (event) => {
    setHasError(true);
    onError?.(event);
  };

  if (hasError) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-surface-muted dark:bg-surface-muted-dark p-4 text-center text-sm text-content-muted dark:text-content-muted-dark"
        role="img"
        aria-label={alt}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <img
      {...imageProps}
      src={src}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};
