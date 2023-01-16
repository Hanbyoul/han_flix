import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import SliderSearch from "../Componenst/Search/SliderSearch";
import { getSearchMovie, getSearchTv, IGetDataResult } from "./api";
import { searchKeyword } from "./utils";

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [searchKey, setSearchKey] = useRecoilState(searchKeyword);

  useEffect(() => {
    if (location.search !== "" || null || undefined) {
      setSearchKey(keyword!);
    }
  }, [location, keyword]);

  const { data: searchMovieData, isLoading: searchMovieLoading } =
    useQuery<IGetDataResult>(["searchMovie", searchKey], () =>
      getSearchMovie(searchKey!)
    );
  const { data: searchTvData, isLoading: searchTvLoading } =
    useQuery<IGetDataResult>(["searchTv", searchKey], () =>
      getSearchTv(searchKey!)
    );

  const isLoading = searchMovieLoading || searchTvLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>..loading</Loader>
      ) : (
        <>
          <Slides>
            <SlideTitle>Movies</SlideTitle>
            {searchMovieData?.results.length === 0 ? (
              <NoData>검색된 결과가 없습니다.</NoData>
            ) : (
              <SliderSearch data={searchMovieData} slidIndex={5} />
            )}
            <SlideTitle>TV</SlideTitle>
            {searchTvData?.results.length === 0 ? (
              <NoData>검색된 결과가 없습니다.</NoData>
            ) : (
              <SliderSearch data={searchTvData} slidIndex={10} />
            )}
          </Slides>
        </>
      )}
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Slides = styled.div`
  margin-top: 200px;
`;
const SlideTitle = styled.div`
  font-size: 44px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  padding-left: 50px;
  top: -120px;
  margin-top: 200px;
`;

const NoData = styled.div`
  text-align: center;
  color: ${(props) => props.theme.white.lighter};
  font-size: 32px;
`;
