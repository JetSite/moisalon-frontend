const MasterId = () => {};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: `/moskva/master/${ctx.query.id}`,
      permanent: true,
    },
  };
}

export default MasterId;
