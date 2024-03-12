import React from "react";
import styled from "styled-components";
import { Skeleton } from "@material-ui/lab";
import { laptopBreakpoint } from "../../../../styles/variables";

const Wrapper = styled.div`
  display: flex;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 70px;
  }
`;

const SkeletonRect = styled(Skeleton)`
  margin-right: 22px;
  border-radius: 5px;
`;

const CabinetBrandsSkeleton = () => {
  return (
    <Wrapper>
      <SkeletonRect variant="rect" width={176} height={176} />
      <SkeletonRect variant="rect" width={176} height={176} />
      <SkeletonRect variant="rect" width={176} height={176} />
    </Wrapper>
  );
};

export default CabinetBrandsSkeleton;
