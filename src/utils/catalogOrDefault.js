const catalogDefault = { groups: [] };
const catalogOrDefault = (catalog) => (catalog ? catalog : catalogDefault);
export default catalogOrDefault;
