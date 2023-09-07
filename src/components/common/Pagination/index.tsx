import { useTranslation } from 'next-i18next'
import { memo } from 'react'

interface PaginationProps {
  currentPage: number
  totalCount: number
  paginate: (v: number) => void
  limit?: number
  siblingCount?: number
}

const Pagination = ({
  limit = 15,
  totalCount,
  paginate,
  currentPage,
  siblingCount = 3,
}: PaginationProps) => {
  const pageNumbers: (number | string)[] = []
  const { t } = useTranslation('common')
  for (let i = 1; i <= Math.ceil(totalCount / limit); i++) {
    if (i === 1) {
      pageNumbers.push(i)

      if (Math.ceil(totalCount / limit) === 1) break

      i += 1
    }

    if (i === Math.ceil(totalCount / limit)) {
      pageNumbers.push(i)
      break
    }

    if (i > Number(currentPage) - siblingCount && i < Number(currentPage) + siblingCount) {
      pageNumbers.push(i)
    }

    if (i === Number(currentPage) - siblingCount) {
      pageNumbers.push('...')
    }

    if (i === Number(currentPage) + siblingCount) {
      pageNumbers.push('...')
    }
  }

  return (
    <div className="text-center">
      <nav className="flex justify-center [&>*:first-child]:rounded-is-lg [&>*:last-child]:rounded-ie-lg [&>*+*]:border-is-0">
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof number === 'string' || Number(currentPage) === number) return

              paginate(number)
            }}
            className={`cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium text-slate-500  border-slate-300  ${
              currentPage === number
                ? ' bg-slate-300  hover:bg-slate-200 '
                : 'bg-slate-50  hover:bg-slate-200 '
            }`}
          >
            {number}
          </button>
        ))}
      </nav>
      <div className="py-2">
        <p className="text-sm text-slate-600 ">
          <>
            {t('pagination.results')}
            <span className="font-medium"> {Number(currentPage) * limit - limit + 1} </span>
            {t('pagination.to')}
            <span className="font-medium">
              {' '}
              {Number(currentPage) * limit > totalCount
                ? totalCount
                : Number(currentPage) * limit}{' '}
            </span>
            {t('pagination.of')}
            <span className="font-medium"> {totalCount} </span>
          </>
        </p>
      </div>
    </div>
  )
}

const memoizedPagination = memo(Pagination)

export default memoizedPagination
