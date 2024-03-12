const SalonId = () => {};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: `/moskva/salon/${ctx.query.id}`,
      permanent: true,
    },
  };
}

export default SalonId;
