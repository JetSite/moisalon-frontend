import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import {
  laptopBreakpoint,
  tabletBreakpoint,
  mobileBreakpoint,
} from "../../../../styles/variables";

export const ShareWrap = styled.div`
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 0;
`;

export const MasterShareWrap = styled(ShareWrap)`
  top: 14.2rem;
  right: 0.4rem;
  @media (max-width: ${laptopBreakpoint}) {
    top: 10.2rem;
    right: 0.4rem;
  }

  @media (max-width: ${tabletBreakpoint}) {
    top: 9.2rem;
    right: -0.4rem;
  }

  @media (max-width: ${mobileBreakpoint}) {
  }
`;

export const Item = styled.div`
  width: ${({ type }) => (type === "slider" ? "21.6rem" : "100%")};
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  min-height: 100%;
  position: relative;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: ${({ type }) => (type === "slider" ? "17.5rem" : "100%")};
    /* height: 266px; */
    padding: 2.1rem 3rem 2rem 3rem;
    justify-content: flex-start;
  }

  @media (max-width: ${tabletBreakpoint}) {
    padding: 1.1rem 1.5rem 1rem 1.5rem;
  }

  @media (max-width: ${mobileBreakpoint}) {
  }
`;

export const MasterInfo = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: 7.5rem 5.6rem 5rem;
  gap: 0px 0px;
  @media (max-width: ${laptopBreakpoint}) {
    grid-template-rows: 4.5rem 5rem 4.1rem;
  }
`;

export const Image = styled(Avatar)`
  width: 14rem;
  height: 14rem;
  margin-bottom: 3rem;

  @media (max-width: ${laptopBreakpoint}) {
    width: 11rem;
    height: 11rem;
    margin-bottom: 2.6rem;
  }
`;

export const Name = styled.p`
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.5rem;
  text-align: center;
  color: #000;
  margin-bottom: 2rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;

  @media (max-width: ${laptopBreakpoint}) {
    grid-row: 1/4;
    margin-bottom: 0;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.8rem;
  }
`;

export const Specializations = styled.p`
  color: #727272;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.8rem;

  @media (max-width: ${laptopBreakpoint}) {
    /* grid-row: 4/6; */
    margin-top: 0.5rem;
    margin-bottom: 0;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.8rem;
  }
`;

export const Favorite = styled.div`
  position: absolute;
  width: 1.6rem;
  height: 1.6rem;
  padding: 2rem;
  cursor: pointer;
  right: 1.7rem;
  top: -0.8rem;

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const FavoriteMaster = styled(Favorite)`
  @media (max-width: ${laptopBreakpoint}) {
    right: 1.2rem;
    top: -1rem;
  }

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${mobileBreakpoint}) {
  }
`;

export const City = styled.p`
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 1rem;
    white-space: nowrap;
  }
`;

export const SkeletonMasterItem = styled(Skeleton)`
  width: 21.7rem;
  height: 43.6rem;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    height: 31.3rem;
  }
`;

export const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
