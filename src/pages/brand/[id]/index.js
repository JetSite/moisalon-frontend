const BrandId = () => {};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: `/moskva/brand/${ctx.query.id}`,
      permanent: true,
    },
  };
}

export default BrandId;
