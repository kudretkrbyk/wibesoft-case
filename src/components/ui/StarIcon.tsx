type StarType = 'full' | 'half' | 'empty'

type StarIconProps = {
  type: StarType
  className?: string
}

export default function StarIcon({ type, className = '' }: StarIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`
        w-[18px] h-[18px]
        md:w-[24px] md:h-[24px]
        ${className}
      `}
    >
      {/* Empty star */}
      {type === 'empty' && (
        <path
          d="M10 1.5l2.588 5.244 5.79.842-4.189 4.084.989 5.766L10 14.77l-5.178 2.666.989-5.766L1.622 7.586l5.79-.842L10 1.5z"
          stroke="#00000033"
          strokeWidth="1"
          fill="none"
        />
      )}

      {/* Full star */}
      {type === 'full' && (
        <path
          d="M10 1.5l2.588 5.244 5.79.842-4.189 4.084.989 5.766L10 14.77l-5.178 2.666.989-5.766L1.622 7.586l5.79-.842L10 1.5z"
          fill="#FFC633"
        />
      )}

      {/* Half star */}
      {type === 'half' && (
        <>
          <defs>
            <linearGradient id="half-grad">
              <stop offset="50%" stopColor="#FFC633" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M10 1.5l2.588 5.244 5.79.842-4.189 4.084.989 5.766L10 14.77l-5.178 2.666.989-5.766L1.622 7.586l5.79-.842L10 1.5z"
            fill="url(#half-grad)"
            stroke="#FFC633"
            strokeWidth="1"
          />
        </>
      )}
    </svg>
  )
}
