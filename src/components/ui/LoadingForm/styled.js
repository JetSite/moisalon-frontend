import Skeleton from "@material-ui/lab/Skeleton";
import styled from "styled-components";

export const Button = styled(Skeleton)`
  height: 34px !important;
  display: inline-block !important;
  margin: 5px !important;
  width: ${(props) => `${props.width}px`};
`;

export const SkeletonWrap = styled(Skeleton)`
  width: ${(props) => props.width};
  height: ${(props) => `${props.height}px`};
`;

export const Group = styled.div`
  flex: 1 1 auto;
  &:not(:last-child) {
    border-bottom: 1px solid #d8d8d8;
  }
`;

export const InputSmall = styled(Skeleton)`
  height: 34px !important;
  width: 30% !important;
  min-width: 130px !important;
  display: inline-block !important;
  margin: 5px !important;
`;

export const InputFull = styled(Skeleton)`
  height: 34px !important;
  width: 100% !important;
  min-width: 130px !important;
  display: inline-block !important;
  margin: 5px !important;
`;