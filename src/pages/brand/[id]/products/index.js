const BrandProducts = () => {};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: `/moskva/brand/${ctx.query.id}/products`,
      permanent: true,
    },
  };
}

export default BrandProducts;
