import StarRatings from "react-star-ratings";
import styled from "styled-components";

interface IVoteCountProps {
  rating: number;
}

const StarAverage = ({ rating }: IVoteCountProps) => {
  rating = rating / 2;

  return (
    <Wrapper>
      <StarRatings
        rating={rating}
        starRatedColor="Yellow"
        numberOfStars={5}
        name="rating"
        starDimension="30px"
        starSpacing="0px"
      />
    </Wrapper>
  );
};

export default StarAverage;

const Wrapper = styled.div`
  margin-left: 10px;
`;
