import { FC, useState, useRef } from 'react'
import Header from '../../pages/Brand/ViewBrand/components/Header'
import {
  IUseFiltredProductsProps,
  useFiltredProducts,
} from './useFiltredProducts'
import {
  FiltersContainer,
  SelectWrapper,
  SearchInputWrapper,
  MenuListWrapper,
  ChipLabel,
} from './styles'
import {
  MenuItem,
  Typography,
  Chip,
  InputBase,
  Paper,
  ClickAwayListener,
  Popper,
  Grow,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { IBrand } from 'src/types/brands'
import { useQuery } from '@apollo/client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IProductCategories } from 'src/types/product'
import { PRODUCT_CATEGORIES_FOR_SHOP_FILTER } from '@/api/graphql/product/queries/getProductCategoriesForShopFilter'
import { BRANDS_FOR_SHOP_FILTER } from '@/api/graphql/brand/queries/getBrandsForShopFilter'

type Props = IUseFiltredProductsProps

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  select: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '53px',
    padding: '10px 14px',
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#000',
    },
  },
  selectText: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#333',
    flex: 1,
  },
  placeholder: {
    color: '#757575',
  },
  chip: {
    flexShrink: 0,
    backgroundColor: '#FF0033',
    borderRadius: '16px',
    height: '32px',
    padding: '0 4px',
  },
  deleteIcon: {
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: '#fff',
    },
  },
  menuPaper: {
    borderRadius: '4px',
    marginTop: '4px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  menuItem: {
    padding: '10px 16px',
    fontSize: '14px',
    '&.Mui-selected': {
      backgroundColor: 'rgba(255, 0, 51, 0.08)',
      fontWeight: 500,
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'rgba(255, 0, 51, 0.12)',
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  searchInput: {
    width: '100%',
    '& .MuiInputBase-input': {
      padding: '8px 12px',
      fontSize: '14px',
    },
  },
  arrowIcon: {
    width: '14px',
    height: '14px',
    marginLeft: '8px',
    transition: 'transform 0.2s ease',
  },
  arrowIconOpen: {
    transform: 'rotate(180deg)',
  },
  noOptions: {
    padding: '12px 16px',
    color: '#757575',
    fontSize: '14px',
    textAlign: 'center',
  },
}))

const CustomSelect: FC<{
  options: Array<{ id: string; label: string; value: string }>
  value: string | null
  placeholder: string
  onChange: (value: string | null) => void
  label: string
}> = ({ options, value, placeholder, onChange, label }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const anchorRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase()),
  )

  const selectedOption = options.find(option => option.value === value)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }
    setOpen(false)
  }

  const handleSelect = (value: string | null) => {
    onChange(value)
    setSearch('')
    setOpen(false)
  }

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation()
    onChange(null)
  }

  return (
    <SelectWrapper>
      <Typography
        variant="subtitle2"
        style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}
      >
        {label}
      </Typography>
      <div ref={anchorRef} className={classes.select} onClick={handleToggle}>
        {selectedOption ? (
          <Chip
            className={classes.chip}
            label={<ChipLabel>{selectedOption.label}</ChipLabel>}
            onDelete={handleClear}
            classes={{ deleteIcon: classes.deleteIcon }}
          />
        ) : (
          <div className={`${classes.selectText} ${classes.placeholder}`}>
            {placeholder}
          </div>
        )}
        <img
          src="/filter-arrow.png"
          alt="arrow"
          className={`${classes.arrowIcon} ${
            open ? classes.arrowIconOpen : ''
          }`}
        />
      </div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
        style={{ width: anchorRef.current?.clientWidth, zIndex: 10 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'top left' }}>
            <Paper className={classes.menuPaper}>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  <SearchInputWrapper>
                    <InputBase
                      className={classes.searchInput}
                      placeholder="Поиск..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      autoFocus
                      onClick={e => e.stopPropagation()}
                    />
                  </SearchInputWrapper>

                  <MenuListWrapper>
                    <MenuItem
                      value=""
                      className={classes.menuItem}
                      selected={!value}
                      onClick={() => handleSelect(null)}
                    >
                      <em>Все</em>
                    </MenuItem>

                    {filteredOptions.length > 0 ? (
                      filteredOptions.map(option => (
                        <MenuItem
                          key={option.id}
                          value={option.value}
                          className={classes.menuItem}
                          selected={option.value === value}
                          onClick={() => handleSelect(option.value)}
                        >
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <div className={classes.noOptions}>Ничего не найдено</div>
                    )}
                  </MenuListWrapper>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </SelectWrapper>
  )
}

const FilterCatalog: FC<Props> = ({
  setProductsData,
  pageSize,
  setLoading,
  nextPage,
  setPagination,
  setNextPage,
  noBrands,
  brand,
}) => {
  const { selectCategory, selectBrand, setSelectCategory, setSelectBrand } =
    useFiltredProducts({
      setProductsData,
      nextPage,
      pageSize,
      setLoading,
      setPagination,
      setNextPage,
      noBrands,
      brand,
    })

  const { data: categoriesData } = useQuery(
    PRODUCT_CATEGORIES_FOR_SHOP_FILTER,
    {
      variables: { itemsCount: 100, isAvailableInStock: 0 },
      onError: error => {
        console.error('Failed to fetch product categories:', error)
      },
    },
  )

  const { data: brandsData } = useQuery(BRANDS_FOR_SHOP_FILTER, {
    variables: { itemsCount: 100, isAvailableInStock: 0 },
    onError: error => {
      console.error('Failed to fetch brands:', error)
    },
  })

  const categories: IProductCategories[] = categoriesData
    ? flattenStrapiResponse(categoriesData.productCategories)
    : []

  const brands: IBrand[] = brandsData
    ? flattenStrapiResponse(brandsData.brands)
    : []

  const categoryOptions = categories.map(category => ({
    id: category.id,
    label: category.title,
    value: category.title,
  }))

  const brandOptions = brands.map(brand => ({
    id: brand.id,
    label: brand.name,
    value: brand.id,
  }))

  const handleCategoryChange = (value: string | null) => {
    setSelectCategory(value)
  }

  const handleBrandChange = (value: string | null) => {
    if (!value) {
      setSelectBrand(null)
      return
    }

    const selectedBrand = brands.find(b => b.id === value)
    if (selectedBrand) {
      setSelectBrand(selectedBrand)
    }
  }

  return (
    <FiltersContainer>
      <CustomSelect
        options={categoryOptions}
        value={selectCategory}
        placeholder="Все категории"
        onChange={handleCategoryChange}
        label="Категории продукции"
      />

      {!noBrands && (
        <CustomSelect
          options={brandOptions}
          value={selectBrand?.id || null}
          placeholder="Все бренды"
          onChange={handleBrandChange}
          label="Бренды"
        />
      )}

      {!noBrands && selectBrand && (
        <Header brand={selectBrand} isOwner={false} noBackButton />
      )}
    </FiltersContainer>
  )
}

export default FilterCatalog
