export interface ICatalog {
  groups: unknown[]
}
type ICatalogOrDefault = (catalog: ICatalog) => ICatalog

const catalogDefault = { groups: [] }
const catalogOrDefault: ICatalogOrDefault = catalog =>
  catalog ? catalog : catalogDefault
export default catalogOrDefault
