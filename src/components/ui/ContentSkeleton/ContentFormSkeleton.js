import React from "react";
import styled from "styled-components";
import { Skeleton } from "@material-ui/lab";
import MainLayout from "../../../layouts/MainLayout";
import { MainContainer } from "../../../styles/common";
import SearchBlock from "../../../components/blocks/SearchBlock";
import { laptopBreakpoint } from "../../../../styles/variables";

const Wrapper = styled.div`
  padding: 0 140px;
  margin-top: 75px;
  margin-bottom: 75px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 34px;
  }
`;

const LinesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 45px;
`;

const SkeletonRectBig = styled(Skeleton)`
  margin-top: 20px;
`;

const ContentFormSkeleton = ({ me, loading }) => {
  return (
    <MainLayout me={me} loading={loading}>
      <SearchBlock />
      <MainContainer>
        <Wrapper>
          <LinesWrapper>
            <SkeletonRectBig variant="rect" width={1160} height={150} />
            <SkeletonRectBig variant="rect" width={1160} height={150} />
            <SkeletonRectBig variant="rect" width={1160} height={150} />
          </LinesWrapper>
        </Wrapper>
      </MainContainer>
    </MainLayout>
  );
};

export default ContentFormSkeleton;
