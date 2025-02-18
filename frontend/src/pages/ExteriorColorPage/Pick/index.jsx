import { EXTERIOR_COLOR, PICK } from '../constants';
import * as S from './style';
import PickTitle from '../../../components/PickTitle';
import ColorCard from '../../../components/ColorCard';
import ColorChip from '../../../components/ColorChip';
import NextColor from '../../../components/NextColor';

function Pick({ setTrimState, exteriorColor }) {
  const pickTitleProps = { mainTitle: PICK.TITLE };
  const colorProps = { $position: exteriorColor.position };

  const handleColorCardClick = (exterior) => {
    if (exterior.code === exteriorColor.code) return;
    setTrimState((prevState) => ({
      ...prevState,
      exteriorColor: {
        ...prevState.exteriorColor,
        code: exterior.code,
        name: exterior.name,
        carImageDirectory: exterior.carImageDirectory,
        carImageList: Array.from({ length: 60 }, (_, index) => {
          const imageNumber = (index + 1).toString().padStart(3, '0');
          return `${exterior.carImageDirectory}${imageNumber}.webp`;
        }),
      },
      interiorColor: {
        ...prevState.interiorColor,
        isFetch: false,
      },
      optionPicker: {
        ...prevState.optionPicker,
        isFetch: false,
      },
      estimation: {
        ...prevState.estimation,
        isFetch: false,
      },
      price: {
        ...prevState.price,
        exteriorColorPrice: exterior.price,
        interiorColorPrice: 0,
        optionPrice: 0,
      },
    }));
  };

  return (
    <S.Pick>
      <S.Header>
        <PickTitle {...pickTitleProps} />
        <NextColor />
      </S.Header>

      <S.ColorSet>
        <S.Color {...colorProps}>
          {exteriorColor.fetchData.map((exterior) => (
            <ColorCard
              key={exterior.code}
              pickRatio={exterior.chosen}
              name={exterior.name}
              price={exterior.price}
              selected={exteriorColor.code === exterior.code}
              onClick={() => handleColorCardClick(exterior)}
            >
              <ColorChip
                selected={exteriorColor.code === exterior.code}
                src={exterior.colorImageUrl}
                type={EXTERIOR_COLOR.TYPE}
              />
            </ColorCard>
          ))}
        </S.Color>
      </S.ColorSet>
    </S.Pick>
  );
}

export default Pick;
